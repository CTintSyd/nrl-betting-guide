#!/usr/bin/env python3
"""
update-team-lists.py
Fetches two data sources from NRL.com and writes src/team-lists.json:
  1. Official named squads (1–17) from each upcoming fixture's match centre
  2. Real injury/casualty data from the NRL Casualty Ward

Teams are announced Thursday night / Friday before each round.
Run once after team announcements.

Usage:  python3 scripts/update-team-lists.py
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


def find_upcoming_round(max_round=27, season=2026):
    """Return the lowest round number that has at least one upcoming fixture."""
    print('🔍  Detecting upcoming round…')
    for r in range(1, max_round + 1):
        url = f'{BASE}/draw/data?competition=111&season={season}&round={r}'
        try:
            data = fetch(url)
            fixtures = data.get('fixtures', [])
            upcoming = [f for f in fixtures if f.get('matchState') in ('Upcoming', 'Pre', 'Live')]
            if upcoming:
                print(f'✅  Upcoming round: Round {r} ({len(upcoming)} game(s) to play)')
                return r, upcoming
        except Exception as e:
            print(f'  ⚠  Round {r}: {e}')
    return None, []


def fetch_squad(match_centre_url):
    """Fetch named squad from match centre data endpoint."""
    data_url = BASE + match_centre_url.rstrip('/') + '/data'
    try:
        data = fetch(data_url)
        return data.get('homeTeam', {}), data.get('awayTeam', {})
    except Exception as e:
        print(f'  ⚠  Squad fetch failed ({match_centre_url}): {e}')
        return {}, {}


def extract_players(team_data):
    """Extract and format players from team data."""
    players = team_data.get('players', [])
    if not players:
        return None  # Teams not yet named

    result = []
    for p in sorted(players, key=lambda x: x.get('number', 99)):
        num = p.get('number', 0)
        pos = p.get('position', '')
        category = (
            'starting' if num <= 13 else
            'interchange' if num <= 17 else
            'reserve'
        )
        result.append({
            'number':    num,
            'name':      f"{p.get('firstName', '')} {p.get('lastName', '')}".strip(),
            'position':  pos,
            'category':  category,
        })
    return result


def fetch_casualties():
    """Fetch the NRL Casualty Ward and return injuries keyed by full team name."""
    url = f'{BASE}/casualty-ward/data?competition=111'
    try:
        data = fetch(url)
        by_team = {}
        for c in data.get('casualties', []):
            nick = c.get('teamNickname', '')
            full = NICK_TO_FULL.get(nick, nick)
            by_team.setdefault(full, []).append({
                'name':           f"{c.get('firstName', '')} {c.get('lastName', '')}".strip(),
                'injury':         c.get('injury', ''),
                'expectedReturn': c.get('expectedReturn', 'TBC'),
                'imageUrl':       c.get('imageUrl', ''),
                'profileUrl':     c.get('url', ''),
            })
        print(f'🏥  Casualty Ward: {sum(len(v) for v in by_team.values())} injuries across {len(by_team)} teams')
        return by_team
    except Exception as e:
        print(f'  ⚠  Casualty Ward fetch failed: {e}')
        return {}


def main(season=2026):
    round_num, upcoming = find_upcoming_round(season=season)
    if not round_num:
        print('❌  No upcoming fixtures found.')
        return

    print(f'\n📥  Fetching Casualty Ward…')
    casualties = fetch_casualties()

    team_lists = {}
    games_out = []
    named_count = 0

    for f in upcoming:
        mc_url = f.get('matchCentreUrl', '')
        home_nick = f.get('homeTeam', {}).get('nickName', '')
        away_nick = f.get('awayTeam', {}).get('nickName', '')
        home_name = NICK_TO_FULL.get(home_nick, home_nick)
        away_name = NICK_TO_FULL.get(away_nick, away_nick)
        kickoff   = f.get('clock', {}).get('kickOffTimeLong', '')

        print(f'\n📋  {home_nick} vs {away_nick}  ({kickoff[:10]})')

        if not mc_url:
            print('     ⚠  No matchCentreUrl — skipping')
            continue

        home_data, away_data = fetch_squad(mc_url)
        home_players = extract_players(home_data)
        away_players = extract_players(away_data)

        if home_players:
            team_lists[home_name] = home_players
            named_count += 1
            print(f'     ✅  {home_name}: {len(home_players)} players')
        else:
            print(f'     ⏳  {home_name}: not yet named')

        if away_players:
            team_lists[away_name] = away_players
            named_count += 1
            print(f'     ✅  {away_name}: {len(away_players)} players')
        else:
            print(f'     ⏳  {away_name}: not yet named')

        games_out.append({
            'matchCentreUrl': mc_url,
            'kickoff': kickoff,
            'homeTeam': home_name,
            'awayTeam': away_name,
        })

    out = {
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'round': round_num,
        'games': games_out,
        'teams': team_lists,
        'casualties': casualties,
    }

    out_path = Path(__file__).parent.parent / 'src' / 'team-lists.json'
    out_path.write_text(json.dumps(out, indent=2))

    total_injuries = sum(len(v) for v in casualties.values())
    print(f'\n📁  Written to {out_path}')
    print(f'    Round:         {round_num}')
    print(f'    Fixtures:      {len(games_out)}')
    print(f'    Named squads:  {named_count}')
    print(f'    Casualties:    {total_injuries} players across {len(casualties)} teams')
    print('\n✅  Done. Commit src/team-lists.json and push to Vercel.')


if __name__ == '__main__':
    main()
