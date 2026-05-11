#!/usr/bin/env python3
"""
update-team-data-players.py
Reads src/player-stats.json (real season stats) and rewrites the `players`
array inside each team block in src/teamData.js.

Selection logic per team:
  1. Must include ≥1 Winger, ≥1 Fullback (or substitute), ≥1 Halfback/Five-Eighth
  2. Fill remaining slots (up to MAX_PLAYERS) with highest try-rate players
     from any position, capped at 2 per position.

Run after update-player-stats.py, then commit src/teamData.js.
Usage: python3 scripts/update-team-data-players.py
"""

import json, re
from pathlib import Path

POS_MAP = {
    'Winger':      'wing',
    'Fullback':    'fullback',
    'Centre':      'centre',
    'Five-Eighth': 'five-eighth',
    'Halfback':    'halfback',
    'Lock':        'lock',
    '2nd Row':     'lock',
    'Prop':        'prop',
    'Hooker':      'hooker',
}
MIN_GAMES  = 3
MAX_PLAYERS = 6
# Minimum try rate to include props/hookers (they score rarely)
FORWARD_MIN_RATE = 0.20

TEAMS = [
    'Brisbane Broncos', 'Canberra Raiders', 'Canterbury Bulldogs',
    'Cronulla Sutherland Sharks', 'Dolphins', 'Gold Coast Titans',
    'Manly Warringah Sea Eagles', 'Melbourne Storm', 'Newcastle Knights',
    'New Zealand Warriors', 'North Queensland Cowboys', 'Parramatta Eels',
    'Penrith Panthers', 'South Sydney Rabbitohs', 'St George Illawarra Dragons',
    'Sydney Roosters', 'Wests Tigers',
]

def pick_players(team_name, all_players):
    # Filter: correct team, enough games, known position
    pool = [
        {'name': name, 'pos': POS_MAP[info['position']], 'tryRate': info['tryRate'],
         'tries': info['tries'], 'games': info['games'], 'rawPos': info['position']}
        for name, info in all_players.items()
        if info['team'] == team_name
        and info['games'] >= MIN_GAMES
        and info['position'] in POS_MAP
    ]
    # Exclude low-scoring forwards (prop/hooker/lock scoring 0 tries)
    pool = [p for p in pool if p['rawPos'] not in ('Prop', 'Hooker', '2nd Row', 'Lock')
            or p['tryRate'] >= FORWARD_MIN_RATE]
    # Sort: tries desc, then games desc (prefer consistent scorers)
    pool.sort(key=lambda p: (-p['tries'], -p['games']))

    selected = []
    pos_counts = {}

    def try_add(player):
        pos = player['pos']
        if player in selected:
            return False
        if pos_counts.get(pos, 0) >= 2:
            return False
        selected.append(player)
        pos_counts[pos] = pos_counts.get(pos, 0) + 1
        return True

    # Phase 1: guaranteed positions
    # ── At least one winger
    for p in pool:
        if p['pos'] == 'wing':
            try_add(p)
            break
    # ── At least one fullback
    for p in pool:
        if p['pos'] == 'fullback':
            try_add(p)
            break
    # ── At least one playmaker (halfback or five-eighth)
    for p in pool:
        if p['pos'] in ('halfback', 'five-eighth'):
            try_add(p)
            break

    # Phase 2: fill remaining slots greedily by try rate
    for p in pool:
        if len(selected) >= MAX_PLAYERS:
            break
        try_add(p)

    return selected


def generate_players_js(players):
    lines = []
    for p in players:
        name_str  = json.dumps(p['name'])
        pos_str   = json.dumps(p['pos'])
        rate_str  = str(round(p['tryRate'], 4))
        lines.append(f"      {{ name: {name_str+',':<36} pos: {pos_str+',':<17} tryRate: {rate_str} }},")
    return '[\n' + '\n'.join(lines) + '\n    ]'


def main():
    root = Path(__file__).parent.parent
    stats_path = root / 'src' / 'player-stats.json'
    td_path    = root / 'src' / 'teamData.js'

    stats = json.loads(stats_path.read_text())
    all_players = stats['players']
    td_src = td_path.read_text()

    print(f'📊 player-stats.json: Round {stats["round"]}, {len(all_players)} players')
    print()

    for team in TEAMS:
        players = pick_players(team, all_players)
        if not players:
            print(f'  ⚠  {team}: no players found — skipping')
            continue

        # Replace `players: [...],` block for this team in teamData.js
        # Match from `players: [` to the closing `],`
        # We anchor on the team name appearing just before the players block.
        # Strategy: find the team's section, then replace its players array.
        new_block = 'players: ' + generate_players_js(players) + ','

        # Pattern: find "players: [\n...\n    ]," inside the team's block
        # We do a two-step replace: first mark the team's section, then replace.
        # Simpler: replace the first occurrence of `players: [...]` after the team key.
        team_key = json.dumps(team)  # e.g. "'Brisbane Broncos'"
        # Use single quotes (as used in JS)
        team_key_sq = f"'{team}'"

        # Find position of team key in source
        pos = td_src.find(team_key_sq)
        if pos == -1:
            print(f'  ⚠  {team}: key not found in teamData.js — skipping')
            continue

        # Find `players: [` after this position
        players_start = td_src.find('players: [', pos)
        if players_start == -1:
            print(f'  ⚠  {team}: players block not found — skipping')
            continue

        # Find the closing `],` — count bracket depth
        depth = 0
        i = players_start + len('players: ')
        while i < len(td_src):
            if td_src[i] == '[':
                depth += 1
            elif td_src[i] == ']':
                depth -= 1
                if depth == 0:
                    # include the trailing `,` if present
                    end = i + 1
                    if end < len(td_src) and td_src[end] == ',':
                        end += 1
                    break
            i += 1

        old_block = td_src[players_start:end]
        td_src = td_src[:players_start] + new_block + td_src[end:]

        top = players[0]
        print(f'  ✅  {team:<35} {len(players)} players  |  top: {top["name"]} ({top["tries"]}T, {top["tryRate"]}/g)')

    td_path.write_text(td_src)
    print(f'\n📁  Written to {td_path}')
    print('✅  Done. Commit src/teamData.js and push to Vercel.')


if __name__ == '__main__':
    main()
