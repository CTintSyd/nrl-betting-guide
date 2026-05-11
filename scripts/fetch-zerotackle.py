#!/usr/bin/env python3
"""
fetch-zerotackle.py
Fetches the Zero Tackle RSS feed, tags articles by NRL team name,
and saves relevant articles to src/zerotackle-articles.json.

Runs as a step in .github/workflows/update-nrl-data.yml alongside
the other data-update scripts.
"""

import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

RSS_URL = 'https://www.zerotackle.com/feed/'

# Keywords → full team name (must match team names in live-odds.json / teamData.js)
TEAM_KEYWORDS = {
    'Brisbane Broncos':             ['Broncos', 'Brisbane Broncos'],
    'Canterbury Bulldogs':          ['Bulldogs', 'Canterbury Bulldogs', 'Canterbury-Bankstown'],
    'North Queensland Cowboys':     ['Cowboys', 'North Queensland'],
    'Dolphins':                     ['Dolphins', 'Redcliffe Dolphins'],
    'St George Illawarra Dragons':  ['Dragons', 'St George', 'Illawarra'],
    'Parramatta Eels':              ['Eels', 'Parramatta'],
    'Newcastle Knights':            ['Knights', 'Newcastle Knights'],
    'Penrith Panthers':             ['Panthers', 'Penrith'],
    'South Sydney Rabbitohs':       ['Rabbitohs', 'South Sydney'],
    'Canberra Raiders':             ['Raiders', 'Canberra'],
    'Sydney Roosters':              ['Roosters', 'Sydney Roosters'],
    'Manly Warringah Sea Eagles':   ['Sea Eagles', 'Manly'],
    'Cronulla Sutherland Sharks':   ['Sharks', 'Cronulla'],
    'Melbourne Storm':              ['Storm', 'Melbourne Storm'],
    'Gold Coast Titans':            ['Titans', 'Gold Coast'],
    'New Zealand Warriors':         ['Warriors', 'New Zealand Warriors'],
    'Wests Tigers':                 ['Wests Tigers', 'Western Sydney'],
}

# Patterns that indicate a general round preview / tips article
ROUND_PATTERNS = re.compile(
    r'round\s+\d+|magic round|nrl tips|nrl preview|nrl round|'
    r'nrl\s+\d{4}\s+tips|this week.{0,10}nrl|nrl.{0,10}this week|'
    r'thoughts from nrl|nrl round \d+ wrap',
    re.IGNORECASE
)


def fetch_rss() -> bytes:
    req = urllib.request.Request(
        RSS_URL,
        headers={
            'User-Agent': 'Mozilla/5.0 (compatible; NRLBettingGuide/1.0)',
            'Accept': 'application/rss+xml, application/xml, text/xml',
        }
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read()


def strip_html(text: str) -> str:
    """Remove HTML tags and normalise whitespace."""
    text = re.sub(r'<[^>]+>', '', text or '')
    return re.sub(r'\s+', ' ', text).strip()


def parse_articles(xml_bytes: bytes) -> list:
    root = ET.fromstring(xml_bytes)
    channel = root.find('channel') or root
    articles = []
    for item in channel.findall('item'):
        title = strip_html(item.findtext('title') or '')
        url   = (item.findtext('link') or '').strip()
        desc  = strip_html(item.findtext('description') or '')
        date  = (item.findtext('pubDate') or '').strip()
        if title and url:
            articles.append({'title': title, 'url': url, 'description': desc, 'date': date})
    return articles


def tag_articles(articles: list) -> list:
    tagged = []
    for art in articles:
        text = f"{art['title']} {art['description']}"
        teams = [
            team for team, kws in TEAM_KEYWORDS.items()
            if any(re.search(r'\b' + re.escape(kw) + r'\b', text, re.IGNORECASE) for kw in kws)
        ]
        is_round = bool(ROUND_PATTERNS.search(text))
        tagged.append({**art, 'teams': teams, 'isRound': is_round})
    return tagged


def main():
    print('Fetching Zero Tackle RSS feed...')
    try:
        xml_bytes = fetch_rss()
    except Exception as exc:
        print(f'WARNING: Could not fetch RSS — {exc}')
        # Write an empty stub so the analysis page still loads cleanly
        stub = {
            'updated': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
            'articles': [],
        }
        out_path = Path(__file__).parent.parent / 'src' / 'zerotackle-articles.json'
        out_path.write_text(json.dumps(stub, indent=2))
        return

    articles = parse_articles(xml_bytes)
    tagged   = tag_articles(articles)

    # Keep only articles that mention at least one team OR look like a round preview
    relevant = [a for a in tagged if a['teams'] or a['isRound']]

    out = {
        'updated':  datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'articles': relevant[:60],   # RSS feeds typically have ~25 items anyway
    }

    out_path = Path(__file__).parent.parent / 'src' / 'zerotackle-articles.json'
    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f'Done — {len(relevant)} relevant articles saved to {out_path}')


if __name__ == '__main__':
    main()
