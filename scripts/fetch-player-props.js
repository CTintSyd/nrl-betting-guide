// fetch-player-props.js
// Fetches real try scorer odds from The Odds API (player props endpoint)
// for all upcoming NRL fixtures and saves to src/player-props.json.
//
// Runs via update-player-props.yml (once per day) to keep within
// the 500 calls/month free-tier quota (8 games × ~30 days = ~240 calls).
//
// Market keys tried (Odds API NRL player props):
//   player_first_try_scorer    — First try scorer
//   player_anytime_try_scorer  — Anytime try scorer

const fs   = require('fs');
const path = require('path');

const API_KEY = process.env.ODDS_API_KEY;
if (!API_KEY) { console.error('ODDS_API_KEY not set'); process.exit(1); }

const SPORT    = 'rugbyleague_nrl';
const REGIONS  = 'au';
const MARKETS  = 'player_first_try_scorer,player_anytime_try_scorer';
const PREFERRED = ['sportsbet', 'tab', 'betright', 'ladbrokes_au', 'pointsbetau'];

// Load current live-odds.json to get event IDs
const liveOddsPath = path.join(__dirname, '../src/live-odds.json');
if (!fs.existsSync(liveOddsPath)) {
  console.error('src/live-odds.json not found — run fetch-odds.js first');
  process.exit(1);
}
const liveOdds = JSON.parse(fs.readFileSync(liveOddsPath, 'utf8'));
const games    = liveOdds.games || [];

if (!games.length) {
  console.log('No upcoming games found in live-odds.json — nothing to fetch.');
  // Write empty stub so analysis page loads cleanly
  const stub = { updated: new Date().toISOString(), games: {} };
  fs.writeFileSync(path.join(__dirname, '../src/player-props.json'), JSON.stringify(stub, null, 2));
  process.exit(0);
}

async function fetchProps(eventId) {
  const url = `https://api.the-odds-api.com/v4/sports/${SPORT}/events/${eventId}/odds` +
    `?apiKey=${API_KEY}&regions=${REGIONS}&markets=${MARKETS}&oddsFormat=decimal`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return { data: await res.json(), remaining: res.headers.get('x-requests-remaining') };
}

function pickBestBookmaker(bookmakers) {
  // Return the first preferred bookmaker that has player prop data
  for (const key of PREFERRED) {
    const bk = bookmakers.find(b => b.key === key);
    if (bk?.markets?.length) return bk;
  }
  return bookmakers[0] ?? null;
}

function extractPlayers(bk, market) {
  const m = bk?.markets?.find(m => m.key === market);
  if (!m) return [];
  return m.outcomes
    .map(o => ({ name: o.name, odd: o.price }))
    .sort((a, b) => a.odd - b.odd); // lowest odd = most likely
}

async function main() {
  console.log(`Fetching player props for ${games.length} games...`);
  const result = {};
  let remaining = null;

  for (const game of games) {
    const key = `${game.homeTeam} vs ${game.awayTeam}`;
    console.log(`  ${key}...`);

    try {
      const { data, remaining: rem } = await fetchProps(game.id);
      remaining = rem;

      const bk = pickBestBookmaker(data.bookmakers || []);
      if (!bk) {
        console.log(`    ⚠  No bookmaker data`);
        result[key] = { homeTeam: game.homeTeam, awayTeam: game.awayTeam, available: false };
        continue;
      }

      const firstTry    = extractPlayers(bk, 'player_first_try_scorer');
      const anytimeTry  = extractPlayers(bk, 'player_anytime_try_scorer');

      if (!firstTry.length && !anytimeTry.length) {
        console.log(`    ⚠  No try scorer markets from ${bk.key}`);
        result[key] = { homeTeam: game.homeTeam, awayTeam: game.awayTeam, available: false };
        continue;
      }

      // Build unified player list with both markets merged
      const playerMap = {};
      anytimeTry.forEach(p => { playerMap[p.name] = { name: p.name, anytime: p.odd, first: null }; });
      firstTry.forEach(p => {
        if (playerMap[p.name]) playerMap[p.name].first = p.odd;
        else playerMap[p.name] = { name: p.name, anytime: null, first: p.odd };
      });

      result[key] = {
        homeTeam:  game.homeTeam,
        awayTeam:  game.awayTeam,
        available: true,
        bookmaker: bk.key,
        players:   Object.values(playerMap).sort((a, b) => (a.anytime ?? 99) - (b.anytime ?? 99)),
      };

      console.log(`    ✅  ${bk.key}: ${firstTry.length} FTS, ${anytimeTry.length} anytime`);
    } catch (err) {
      console.log(`    ⚠  Error: ${err.message}`);
      result[key] = { homeTeam: game.homeTeam, awayTeam: game.awayTeam, available: false, error: err.message };
    }

    // Small delay to be polite to the API
    await new Promise(r => setTimeout(r, 300));
  }

  const out = {
    updated:         new Date().toISOString(),
    quotaRemaining:  remaining ? Number(remaining) : null,
    games:           result,
  };

  const dest = path.join(__dirname, '../src/player-props.json');
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log(`\nSaved player props → src/player-props.json`);
  if (remaining) console.log(`Quota remaining: ${remaining}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
