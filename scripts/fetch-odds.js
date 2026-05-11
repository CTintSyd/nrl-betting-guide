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

  // ── Opening odds tracking ─────────────────────────────────────────────────
  const openingPath = path.join(__dirname, '../src/odds-opening.json');
  let opening = {};
  if (fs.existsSync(openingPath)) {
    try { opening = JSON.parse(fs.readFileSync(openingPath, 'utf8')); } catch (_) {}
  }

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  // Remove stale entries (game finished >30 days ago)
  for (const [id, entry] of Object.entries(opening)) {
    if (now - new Date(entry.firstSeen).getTime() > THIRTY_DAYS) {
      delete opening[id];
    }
  }

  // Record opening odds for games we haven't seen before
  for (const g of transformed) {
    if (!opening[g.id]) {
      opening[g.id] = {
        homeTeam:  g.homeTeam,
        awayTeam:  g.awayTeam,
        firstSeen: new Date().toISOString(),
        h2h:  { home: g.h2h.home,  away: g.h2h.away },
        line: {
          home: { odd: g.line.home.odd, point: g.line.home.point },
          away: { odd: g.line.away.odd, point: g.line.away.point },
        },
        ou: { total: g.ou.total, overOdd: g.ou.overOdd, underOdd: g.ou.underOdd },
      };
      console.log(`Opening odds recorded: ${g.homeTeam} vs ${g.awayTeam}`);
    }
  }

  fs.writeFileSync(openingPath, JSON.stringify(opening, null, 2));
  console.log(`Opening odds: ${Object.keys(opening).length} games tracked → src/odds-opening.json`);
  // ─────────────────────────────────────────────────────────────────────────

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
