#!/usr/bin/env python3
"""
update-results.py
Scans the last 5 completed NRL rounds from the draw API, determines
the market favourite for each game (using stored opening odds where
available, falling back to ladder position), and records whether the
favourite won and covered the line.

Saves to src/results-history.json.
Runs as part of update-nrl-data.yml.
"""

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE   = 'https://www.nrl.com'
SEASON = 2026

NICK_TO_FULL = {
    'Broncos':      'Brisbane Broncos',
    'Bulldogs':     'Canterbury Bulldogs',
    'Cowboys':      'North Queensland Cowboys',
    'Dolphins':     'Dolphins',
    'Dragons':      'St George Illawarra Dragons',
    'Eels':         'Parramatta Eels',
    'Knights':      'Newcastle Knights',
    'Panthers':     'Penrith Panthers',
    'Rabbitohs':    'South Sydney Rabbitohs',
    'Raiders':      'Canberra Raiders',
    'Roosters':     'Sydney Roosters',
    'Sea Eagles':   'Manly Warringah Sea Eagles',
    'Sharks':       'Cronulla Sutherland Sharks',
    'Storm':        'Melbourne Storm',
    'Titans':       'Gold Coast Titans',
    'Warriors':     'New Zealand Warriors',
    'Wests Tigers': 'Wests Tigers',
}


def fetch(url):
    req = urllib.request.Request(
        url, headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=12) as r:
        return json.loads(r.read())


def load_opening_odds():
    p = Path(__file__).parent.parent / 'src' / 'odds-opening.json'
    if not p.exists():
        return {}
    return json.loads(p.read_text())


def find_opening_odds(home_name, away_name, opening):
    """Find stored opening odds entry matching home/away team names."""
    for entry in opening.values():
        if entry.get('homeTeam') == home_name and entry.get('awayTeam') == away_name:
            return entry
        if entry.get('homeTeam') == away_name and entry.get('awayTeam') == home_name:
            return entry  # reversed fixture
    return None


def process_round(round_num, opening):
    """Fetch completed fixtures for a round and return game result records."""
    url = f'{BASE}/draw/data?competition=111&season={SEASON}&round={round_num}'
    try:
        data = fetch(url)
    except Exception as e:
        print(f'  ⚠  Round {round_num}: {e}')
        return []

    fixtures = data.get('fixtures', [])
    completed = [f for f in fixtures if f.get('matchState') == 'FullTime']
    if not completed:
        return []

    games = []
    for f in completed:
        ht = f.get('homeTeam', {})
        at = f.get('awayTeam', {})
        home_nick  = ht.get('nickName', '')
        away_nick  = at.get('nickName', '')
        home_name  = NICK_TO_FULL.get(home_nick, home_nick)
        away_name  = NICK_TO_FULL.get(away_nick, away_nick)
        home_score = ht.get('score')
        away_score = at.get('score')

        if home_score is None or away_score is None:
            continue

        home_score = int(home_score)
        away_score = int(away_score)
        margin     = abs(home_score - away_score)
        winner     = home_name if home_score > away_score else (
                     away_name if away_score > home_score else 'Draw')

        # Determine favourite from opening odds, else from teamPosition
        op = find_opening_odds(home_name, away_name, opening)
        line_point    = None
        line_covered  = None
        favourite     = None
        odds_sourced  = False

        if op:
            home_h2h = op.get('h2h', {}).get('home')
            away_h2h = op.get('h2h', {}).get('away')
            if home_h2h and away_h2h:
                # If fixture was stored in same direction
                if op.get('homeTeam') == home_name:
                    favourite = home_name if home_h2h < away_h2h else away_name
                    line_point = op.get('line', {}).get('home', {}).get('point')
                else:
                    # reversed
                    favourite = away_name if home_h2h < away_h2h else home_name
                    line_point = op.get('line', {}).get('away', {}).get('point')
                odds_sourced = True

        if not favourite:
            # Fall back: use ladder position (teamPosition string like "4th")
            def pos_num(pos_str):
                try:
                    return int(''.join(filter(str.isdigit, pos_str or '99')))
                except:
                    return 99
            home_pos = pos_num(ht.get('teamPosition'))
            away_pos = pos_num(at.get('teamPosition'))
            favourite = home_name if home_pos <= away_pos else away_name

        fav_won = winner == favourite

        # Line coverage: did the favourite win by more than the handicap?
        if line_point is not None:
            # line_point is from the favourite's perspective
            # Positive line_point = underdog (getting points), Negative = favourite (giving)
            fav_margin = home_score - away_score if favourite == home_name else away_score - home_score
            # If favourite gives -X.5, they need to win by X+1
            line_abs = abs(line_point)
            line_covered = fav_margin > line_abs

        games.append({
            'homeTeam':    home_name,
            'awayTeam':    away_name,
            'homeScore':   home_score,
            'awayScore':   away_score,
            'winner':      winner,
            'margin':      margin,
            'favourite':   favourite,
            'favouriteWon': fav_won,
            'linePoint':   line_point,
            'lineCovered': line_covered,
            'oddsSourced': odds_sourced,
        })

    return games


def main():
    print('Updating results history...')
    opening = load_opening_odds()
    print(f'  Opening odds entries: {len(opening)}')

    rounds_data = []
    total_fav_w = total_fav_l = 0
    total_line_w = total_line_l = 0

    # Scan the last 10 rounds (script will skip rounds with no FullTime games)
    for r in range(1, 28):
        games = process_round(r, opening)
        if not games:
            continue

        fav_w  = sum(1 for g in games if g['favouriteWon'])
        fav_l  = len(games) - fav_w
        line_w = sum(1 for g in games if g.get('lineCovered') is True)
        line_l = sum(1 for g in games if g.get('lineCovered') is False)

        total_fav_w  += fav_w
        total_fav_l  += fav_l
        total_line_w += line_w
        total_line_l += line_l

        rounds_data.append({
            'round':      r,
            'games':      games,
            'favRecord':  f'{fav_w}-{fav_l}',
            'lineRecord': f'{line_w}-{line_l}' if (line_w + line_l) > 0 else None,
        })
        print(f'  Round {r:2d}: {len(games)} games | Fav {fav_w}-{fav_l} | Line {line_w}-{line_l}')

    out = {
        'updatedAt':       datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'season':          SEASON,
        'totalFavRecord':  f'{total_fav_w}-{total_fav_l}',
        'totalLineRecord': f'{total_line_w}-{total_line_l}' if (total_line_w + total_line_l) > 0 else None,
        'rounds':          rounds_data,
    }

    out_path = Path(__file__).parent.parent / 'src' / 'results-history.json'
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f'\nSaved {len(rounds_data)} rounds → {out_path}')
    print(f'Season fav record: {total_fav_w}-{total_fav_l}')


if __name__ == '__main__':
    main()
