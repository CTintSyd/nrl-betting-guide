#!/usr/bin/env python3
"""
fetch-h2h.py
For each upcoming fixture, fetches the NRL.com match centre data endpoint
and extracts:
  - Head-to-head history (overall record + last 5 meetings with scores)
  - Recent form for both teams (last 5 results with scores)

Saves to src/h2h-data.json, keyed by "HomeTeam vs AwayTeam".
Runs as part of .github/workflows/update-nrl-data.yml.
"""

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = 'https://www.nrl.com'

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


def format_form(entries):
    """Convert recentForm list from NRL API to structured objects."""
    out = []
    for e in (entries or [])[:5]:
        out.append({
            'result':  e.get('result', ''),       # 'Won' / 'Lost' / 'Draw'
            'summary': e.get('summary', ''),       # 'vs Bulldogs'
            'score':   e.get('score', ''),         # '24-6'
            'url':     e.get('url', ''),
        })
    return out


def format_h2h_matches(matches):
    """Convert recentMatches list from stats.history to structured objects."""
    out = []
    for m in (matches or [])[:5]:
        ht = m.get('homeTeam', {})
        at = m.get('awayTeam', {})
        home_nick = ht.get('nickName', '')
        away_nick = at.get('nickName', '')
        home_name = NICK_TO_FULL.get(home_nick, home_nick)
        away_name = NICK_TO_FULL.get(away_nick, away_nick)
        home_score = ht.get('score', 0)
        away_score = at.get('score', 0)
        winner = home_name if home_score > away_score else away_name if away_score > home_score else 'Draw'
        out.append({
            'round':     m.get('roundName', ''),
            'homeTeam':  home_name,
            'awayTeam':  away_name,
            'homeScore': home_score,
            'awayScore': away_score,
            'winner':    winner,
            'url':       m.get('url', ''),
        })
    return out


def main():
    # Read upcoming fixtures from team-lists.json (already fetched by update-team-lists.py)
    tl_path = Path(__file__).parent.parent / 'src' / 'team-lists.json'
    if not tl_path.exists():
        print('ERROR: src/team-lists.json not found — run update-team-lists.py first')
        return

    team_lists = json.loads(tl_path.read_text())
    games = team_lists.get('games', [])
    if not games:
        print('No upcoming games found in team-lists.json')
        return

    print(f'Fetching H2H data for {len(games)} fixtures...')
    results = {}

    for game in games:
        mc_url = game.get('matchCentreUrl', '')
        home   = game.get('homeTeam', '')
        away   = game.get('awayTeam', '')
        key    = f'{home} vs {away}'

        if not mc_url:
            print(f'  ⚠  No matchCentreUrl for {key}')
            continue

        data_url = BASE + mc_url.rstrip('/') + '/data'
        print(f'  Fetching {key}...')

        try:
            data = fetch(data_url)
        except Exception as exc:
            print(f'  ⚠  Failed: {exc}')
            continue

        history    = data.get('stats', {}).get('history', {})
        home_form  = format_form(data.get('homeTeam', {}).get('recentForm', []))
        away_form  = format_form(data.get('awayTeam', {}).get('recentForm', []))
        h2h_recent = format_h2h_matches(history.get('recentMatches', []))

        played    = history.get('played', 0)
        home_wins = history.get('homeWins', 0)   # wins as home team overall
        away_wins = history.get('awayWins', 0)   # wins as away team overall
        draws     = history.get('draws', 0)

        # Count wins for each named team in the recent matches
        team1_wins = sum(1 for m in h2h_recent if m['winner'] == home)
        team2_wins = sum(1 for m in h2h_recent if m['winner'] == away)

        results[key] = {
            'homeTeam': home,
            'awayTeam': away,
            'overall': {
                'played':   played,
                'homeWins': home_wins,
                'awayWins': away_wins,
                'draws':    draws,
            },
            'recent': {
                'matches':    h2h_recent,
                'team1Wins':  team1_wins,   # home team wins in last 5
                'team2Wins':  team2_wins,   # away team wins in last 5
            },
            'homeForm': home_form,
            'awayForm': away_form,
        }
        print(f'    ✅  H2H: {played} played | Last {len(h2h_recent)} meetings fetched')

    out = {
        'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'matches': results,
    }

    out_path = Path(__file__).parent.parent / 'src' / 'h2h-data.json'
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f'\nDone — {len(results)} fixtures saved to {out_path}')


if __name__ == '__main__':
    main()
