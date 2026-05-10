#!/usr/bin/env python3
"""
update-player-stats.py
Aggregates real season try-scoring rates for every NRL player by scanning
all completed rounds on NRL.com and tallying try events from match timelines.

Output: src/player-stats.json
  {
    "generatedAt": "...",
    "round": 10,
    "players": {
      "Xavier Coates": { "tries": 5, "games": 8, "tryRate": 0.625,
                         "team": "Melbourne Storm", "position": "Winger" }
    }
  }

Usage: python3 scripts/update-player-stats.py
Run weekly (or after each round) before pushing to Vercel.
"""

import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE    = 'https://www.nrl.com'
SEASON  = 2026

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


def get_completed_fixtures(max_round=27):
    """Return list of (round, matchCentreUrl) for all completed fixtures."""
    fixtures = []
    latest = 0
    for r in range(1, max_round + 1):
        try:
            data = fetch(f'{BASE}/draw/data?competition=111&season={SEASON}&round={r}')
            done = [f for f in data.get('fixtures', []) if f.get('matchState') == 'FullTime']
            if not done:
                break
            latest = r
            for f in done:
                mc = f.get('matchCentreUrl', '')
                if mc:
                    fixtures.append((r, mc))
        except Exception as e:
            print(f'  ⚠  Round {r}: {e}')
            break
    return latest, fixtures


def fetch_match_data(match_centre_url):
    """Fetch match centre data, return (players_by_id, try_events)."""
    url = BASE + match_centre_url.rstrip('/') + '/data'
    try:
        data = fetch(url)
    except Exception as e:
        print(f'  ⚠  {match_centre_url}: {e}')
        return {}, []

    # Build playerId → {name, position, team} map
    players_by_id = {}
    for side in ('homeTeam', 'awayTeam'):
        team_data = data.get(side, {})
        team_nick = team_data.get('nickName', '')
        team_name = NICK_TO_FULL.get(team_nick, team_nick)
        for p in team_data.get('players', []):
            pid = p.get('playerId')
            if pid:
                players_by_id[pid] = {
                    'name':     f"{p.get('firstName', '')} {p.get('lastName', '')}".strip(),
                    'position': p.get('position', ''),
                    'team':     team_name,
                }

    # Extract try events from timeline
    try_events = [
        e for e in data.get('timeline', [])
        if e.get('type') == 'Try' and e.get('playerId')
    ]

    return players_by_id, try_events


def main():
    print('🔍  Scanning completed rounds…')
    latest_round, fixtures = get_completed_fixtures()
    print(f'✅  Latest completed round: {latest_round} ({len(fixtures)} fixtures)')

    # Accumulate tries + appearances per player
    tries_count  = {}   # playerId → int
    games_count  = {}   # playerId → int
    player_meta  = {}   # playerId → {name, position, team}

    for i, (rnd, mc_url) in enumerate(fixtures, 1):
        print(f'  [{i}/{len(fixtures)}] Round {rnd}: {mc_url.split("/")[-2]}')
        players_by_id, try_events = fetch_match_data(mc_url)

        # Record appearances (both teams' 1–17)
        for pid, meta in players_by_id.items():
            games_count[pid] = games_count.get(pid, 0) + 1
            player_meta[pid] = meta  # keep latest (name/pos shouldn't change)

        # Tally tries
        for ev in try_events:
            pid = ev['playerId']
            tries_count[pid] = tries_count.get(pid, 0) + 1
            # Ensure they're in meta even if not in the 17 (e.g. late inclusion)
            if pid not in player_meta and pid in players_by_id:
                player_meta[pid] = players_by_id[pid]

    # Build output keyed by player name (for easy lookup in app.js)
    out_players = {}
    for pid, meta in player_meta.items():
        name   = meta['name']
        games  = games_count.get(pid, 1)
        tries  = tries_count.get(pid, 0)
        rate   = round(tries / games, 4)
        out_players[name] = {
            'tries':    tries,
            'games':    games,
            'tryRate':  rate,
            'team':     meta['team'],
            'position': meta['position'],
        }

    out = {
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'round': latest_round,
        'players': out_players,
    }

    out_path = Path(__file__).parent.parent / 'src' / 'player-stats.json'
    out_path.write_text(json.dumps(out, indent=2))

    # Summary
    scorers = {n: d for n, d in out_players.items() if d['tries'] > 0}
    print(f'\n📁  Written to {out_path}')
    print(f'    Total players tracked: {len(out_players)}')
    print(f'    Players with tries:    {len(scorers)}')
    print(f'\n  Top 15 try scorers:')
    for name, d in sorted(scorers.items(), key=lambda x: -x[1]['tries'])[:15]:
        print(f'    {d["team"]:<30} {name:<25} {d["tries"]}T / {d["games"]}G = {d["tryRate"]:.3f}/game')
    print('\n✅  Done. Commit src/player-stats.json and push to Vercel.')


if __name__ == '__main__':
    main()
