// Fetches live NRL odds from The Odds API and saves to src/live-odds.json
// Run via GitHub Action or: ODDS_API_KEY=xxx node scripts/fetch-odds.js

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ODDS_API_KEY;
if (!API_KEY) { console.error('ODDS_API_KEY not set'); process.exit(1); }

const API_URL = `https://api.the-odds-api.com/v4/sports/rugbyleague_nrl/odds/?apiKey=${API_KEY}&regions=au&markets=h2h,spreads,totals`;
const PREFERRED = ['sportsbet', 'tab', 'betright', 'ladbrokes_au', 'pointsbetau'];

async function main() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);

  const games = await res.json();
  const remaining = res.headers.get('x-requests-remaining');
  console.log(`Fetched ${games.length} games. Quota remaining: ${remaining}`);

  const transformed = games.map(transformGame).filter(Boolean);

  const out = {
    updated: new Date().toISOString(),
    quotaRemaining: Number(remaining),
    games: transformed,
  };

  const dest = path.join(__dirname, '../src/live-odds.json');
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log(`Saved ${transformed.length} games → src/live-odds.json`);
}

function transformGame(game) {
  // Pick preferred bookmaker, fall back to first available
  const bk = PREFERRED.map(k => game.bookmakers.find(b => b.key === k)).find(Boolean)
    ?? game.bookmakers[0];
  if (!bk) return null;

  const h2h    = bk.markets.find(m => m.key === 'h2h');
  const spread = bk.markets.find(m => m.key === 'spreads');
  const total  = bk.markets.find(m => m.key === 'totals');
  if (!h2h) return null;

  const get = (market, name) => market?.outcomes.find(o => o.name === name);

  return {
    id: game.id,
    homeTeam: game.home_team,
    awayTeam: game.away_team,
    commenceTime: game.commence_time,
    bookmaker: bk.key,
    h2h: {
      home: get(h2h, game.home_team)?.price ?? null,
      away: get(h2h, game.away_team)?.price ?? null,
    },
    line: {
      home: { odd: get(spread, game.home_team)?.price ?? null, point: get(spread, game.home_team)?.point ?? null },
      away: { odd: get(spread, game.away_team)?.price ?? null, point: get(spread, game.away_team)?.point ?? null },
    },
    ou: {
      total:    get(total, 'Over')?.point ?? null,
      overOdd:  get(total, 'Over')?.price ?? null,
      underOdd: get(total, 'Under')?.price ?? null,
    },
  };
}

main().catch(e => { console.error(e.message); process.exit(1); });
