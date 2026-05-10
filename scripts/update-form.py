#!/usr/bin/env python3
"""
update-form.py
Fetches the last 5 completed rounds from NRL.com and writes real
last-5 form strings for every team into src/form-data.json.

Usage:  python3 scripts/update-form.py
Run once a week before pushing to Vercel each round.
"""

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# ── NRL.com nickName → live-odds.json team name ──────────────────────────────
NICK_TO_FULL = {
    'Broncos':    'Brisbane Broncos',
    'Bulldogs':   'Canterbury Bulldogs',
    'Cowboys':    'North Queensland Cowboys',
    'Dolphins':   'Dolphins',
    'Dragons':    'St George Illawarra Dragons',
    'Eels':       'Parramatta Eels',
    'Knights':    'Newcastle Knights',
    'Panthers':   'Penrith Panthers',
    'Rabbitohs':  'South Sydney Rabbitohs',
    'Raiders':    'Canberra Raiders',
    'Roosters':   'Sydney Roosters',
    'Sea Eagles': 'Manly Warringah Sea Eagles',
    'Sharks':     'Cronulla Sutherland Sharks',
    'Storm':      'Melbourne Storm',
    'Titans':     'Gold Coast Titans',
    'Warriors':   'New Zealand Warriors',
    'Wests Tigers': 'Wests Tigers',
}


def fetch_ladder(round_num, season=2026):
    url = f"https://www.nrl.com/ladder/data?competition=111&season={season}&round={round_num}"
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        ladder = []
        for pos, entry in enumerate(data.get('positions', []), 1):
            s = entry.get('stats', {})
            nick = entry.get('teamNickname', '')
            ladder.append({
                'pos':     pos,
                'nick':    nick,
                'name':    NICK_TO_FULL.get(nick, nick),
                'played':  s.get('played', 0),
                'wins':    s.get('wins', 0),
                'losses':  s.get('lost', 0),
                'drawn':   s.get('drawn', 0),
                'ptsFor':  s.get('points for', 0),
                'ptsAgainst': s.get('points against', 0),
                'diff':    s.get('points difference', 0),
                'pts':     s.get('points', 0),
                'streak':  s.get('streak', ''),
            })
        return ladder
    except Exception as e:
        print(f"  ⚠  Ladder fetch failed: {e}")
        return []


def fetch_round(r, season=2026):
    url = f"https://www.nrl.com/draw/data?competition=111&season={season}&round={r}"
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        return [f for f in data.get('fixtures', []) if f.get('matchState') == 'FullTime']
    except Exception as e:
        print(f"  ⚠  Round {r} failed: {e}")
        return []


def main(season=2026, max_round=27, rounds_back=6):
    # Find most recently completed round
    print("🔍  Detecting current round…")
    latest = 1
    for r in range(max_round, 0, -1):
        fixtures = fetch_round(r, season)
        if fixtures:
            latest = r
            print(f"✅  Latest completed round: Round {r} ({len(fixtures)} completed games)")
            break

    # Fetch last `rounds_back` rounds
    start = max(1, latest - rounds_back + 1)
    print(f"📥  Fetching rounds {start}–{latest}…")

    all_fixtures = []  # list of (round, fixture)
    for r in range(start, latest + 1):
        for f in fetch_round(r, season):
            all_fixtures.append((r, f))

    # Build per-team game history
    team_games = {}
    for r, f in all_fixtures:
        hn = f.get('homeTeam', {}).get('nickName', '')
        an = f.get('awayTeam', {}).get('nickName', '')
        hs = f.get('homeTeam', {}).get('score')
        as_ = f.get('awayTeam', {}).get('score')
        if not hn or not an or hs is None or as_ is None:
            continue

        hf = NICK_TO_FULL.get(hn, hn)
        af = NICK_TO_FULL.get(an, an)

        if hs > as_:    hr, ar = 'W', 'L'
        elif hs < as_:  hr, ar = 'L', 'W'
        else:           hr, ar = 'D', 'D'

        for team, result, opp, home in [(hf, hr, af, True), (af, ar, hf, False)]:
            team_games.setdefault(team, []).append({
                'round': r, 'result': result,
                'opponent': opp, 'home': home,
                'score': f"{hs}–{as_}"
            })

    # Fetch ladder for the latest completed round
    print(f"🏆  Fetching ladder for Round {latest}…")
    ladder = fetch_ladder(latest, season)

    # Build output (last 5 per team, oldest → newest)
    form_data = {
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'round': latest,
        'ladder': ladder,
        'teams': {}
    }
    for team, games in sorted(team_games.items()):
        last5 = games[-5:]
        form_data['teams'][team] = {
            'last5': ' '.join(g['result'] for g in last5),
            'games': last5
        }

    out_path = Path(__file__).parent.parent / 'src' / 'form-data.json'
    out_path.write_text(json.dumps(form_data, indent=2))

    print(f"\n📋  Written to {out_path}")
    print(f"    Ladder entries: {len(ladder)}")
    print(f"    Teams updated:  {len(form_data['teams'])}")
    for team, d in form_data['teams'].items():
        print(f"    {team:<34} {d['last5']}")
    print("\n✅  Done. Commit src/form-data.json and push to Vercel.")


if __name__ == '__main__':
    main()
