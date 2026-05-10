#!/usr/bin/env node
/**
 * update-form.js
 * Fetches the last 5 completed rounds from NRL.com and writes real
 * last-5 form strings for every team into src/form-data.json.
 *
 * Usage:  node scripts/update-form.js
 * Run once a week (e.g. before pushing to Vercel each round).
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── NRL.com nickName → our live-odds.json team name ─────────────────────────
const NICK_TO_FULL = {
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
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

async function fetchRound(round, season = 2026) {
  const url = `https://www.nrl.com/draw/data?competition=111&season=${season}&round=${round}`;
  try {
    const data = await fetchJSON(url);
    return (data.fixtures || []).filter(f => f.matchState === 'FullTime');
  } catch (e) {
    console.warn(`  ⚠  Round ${round} fetch failed: ${e.message}`);
    return [];
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const SEASON     = 2026;
  const MAX_ROUND  = 27;   // NRL regular season ends ~round 27
  const ROUNDS_BACK = 6;   // Fetch this many rounds back to ensure 5 games per team (byes)

  // Find the most recently completed round by checking from high to low
  console.log('🔍  Detecting current round…');
  let latestCompletedRound = 1;
  for (let r = MAX_ROUND; r >= 1; r--) {
    const fixtures = await fetchRound(r, SEASON);
    if (fixtures.length > 0) {
      latestCompletedRound = r;
      console.log(`✅  Latest completed round: Round ${r} (${fixtures.length} completed games)`);
      break;
    }
  }

  // Fetch last ROUNDS_BACK rounds (in parallel)
  const startRound = Math.max(1, latestCompletedRound - ROUNDS_BACK + 1);
  console.log(`📥  Fetching rounds ${startRound}–${latestCompletedRound}…`);
  const roundFetches = [];
  for (let r = startRound; r <= latestCompletedRound; r++) {
    roundFetches.push(fetchRound(r, SEASON).then(fixtures => ({ round: r, fixtures })));
  }
  const roundResults = await Promise.all(roundFetches);

  // Build a chronological list of completed games per team
  // Structure: teamName → [ { round, result: 'W'|'L'|'D' }, ... ] (oldest first)
  const teamGames = {};

  for (const { round, fixtures } of roundResults.sort((a, b) => a.round - b.round)) {
    for (const f of fixtures) {
      const hNick = f.homeTeam?.nickName;
      const aNick = f.awayTeam?.nickName;
      const hScore = f.homeTeam?.score;
      const aScore = f.awayTeam?.score;

      if (!hNick || !aNick || hScore == null || aScore == null) continue;

      const hFull = NICK_TO_FULL[hNick] ?? hNick;
      const aFull = NICK_TO_FULL[aNick] ?? aNick;

      let hResult, aResult;
      if (hScore > aScore)      { hResult = 'W'; aResult = 'L'; }
      else if (hScore < aScore) { hResult = 'L'; aResult = 'W'; }
      else                      { hResult = 'D'; aResult = 'D'; }

      if (!teamGames[hFull]) teamGames[hFull] = [];
      if (!teamGames[aFull]) teamGames[aFull] = [];
      teamGames[hFull].push({ round, result: hResult, opponent: aFull, home: true,  score: `${hScore}–${aScore}` });
      teamGames[aFull].push({ round, result: aResult, opponent: hFull, home: false, score: `${hScore}–${aScore}` });
    }
  }

  // Build output: last 5 results per team (oldest → newest for display)
  const formData = { generatedAt: new Date().toISOString(), round: latestCompletedRound, teams: {} };

  for (const [team, games] of Object.entries(teamGames)) {
    const last5 = games.slice(-5); // already oldest-first
    formData.teams[team] = {
      last5: last5.map(g => g.result).join(' '),
      games: last5.map(g => ({
        round:    g.round,
        result:   g.result,
        opponent: g.opponent,
        home:     g.home,
        score:    g.score,
      })),
    };
  }

  // Write output
  const outPath = path.join(__dirname, '..', 'src', 'form-data.json');
  fs.writeFileSync(outPath, JSON.stringify(formData, null, 2));

  console.log('\n📋  Form data written to src/form-data.json');
  console.log(`    Teams updated: ${Object.keys(formData.teams).length}`);
  for (const [team, data] of Object.entries(formData.teams)) {
    console.log(`    ${team.padEnd(32)} ${data.last5}`);
  }
  console.log('\n✅  Done. Commit src/form-data.json and push to Vercel.');
})();
