// NRL Odds Simulation Engine
// Takes real H2H / Line / O/U base odds and derives all other markets.
// Called after live-odds.json is fetched. Falls back gracefully if data is missing.

/* ── Maths helpers ─────────────────────────────────────────────────────────── */

function erf(x) {
  const a = [0.254829592, -0.284496736, 1.421413741, -1.453152027, 1.061405429];
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - (((((a[4]*t + a[3])*t + a[2])*t + a[1])*t + a[0])*t) * Math.exp(-x * x);
  return sign * y;
}

function normalCDF(x, mean, std) {
  return 0.5 * (1 + erf((x - mean) / (std * Math.SQRT2)));
}

// P(a ≤ margin ≤ b) under normal distribution
function pRange(a, b, mean, std) {
  return normalCDF(b, mean, std) - normalCDF(a, mean, std);
}

// Probability → decimal odds with bookmaker vig applied
function toOdds(prob, vig = 1.06) {
  if (!prob || prob <= 0.005) return null;
  const raw = 1 / (prob * vig);
  // Snap to nearest 0.05 like a real bookmaker
  return Math.round(raw * 20) / 20;
}

/* ── Position profiles ─────────────────────────────────────────────────────── */

const POS_FTS_BASE = {
  wing: 8.0, fullback: 9.5, centre: 11.0,
  'five-eighth': 14.0, halfback: 15.0,
  lock: 18.0, prop: 22.0, hooker: 26.0,
};

// Anytime try scorer odds ≈ FTS × this multiplier (shorter because more chances)
const POS_ANYTIME_MULT = {
  wing: 0.27, fullback: 0.30, centre: 0.33,
  'five-eighth': 0.37, halfback: 0.40,
  lock: 0.48, prop: 0.55, hooker: 0.60,
};

/* ── Core engine ───────────────────────────────────────────────────────────── */

function deriveAllMarkets(baseOdds) {
  const { homeTeam, awayTeam, h2h, line, ou } = baseOdds;

  /* ── Win probabilities (de-vigged) ── */
  const pHomeRaw = h2h.home ? 1 / h2h.home : 0.5;
  const pAwayRaw = h2h.away ? 1 / h2h.away : 0.5;
  const vig      = pHomeRaw + pAwayRaw;
  const pHome    = pHomeRaw / vig;
  const pAway    = 1 - pHome;

  /* ── Expected scores ── */
  const ouTotal  = ou?.total  ?? 44.5;
  const linePt   = line?.home?.point ?? 0;          // negative = home favoured
  const expMargin = Math.abs(linePt)
    || Math.round(Math.abs(pHome - pAway) * 48);    // fallback if no line
  const signedMargin = linePt <= 0 ? expMargin : -expMargin; // + = home leads

  const homeExpScore = (ouTotal + Math.abs(signedMargin)) / 2;
  const awayExpScore = ouTotal - homeExpScore;

  /* ── Expected tries ── (NRL avg ~5.5 pts/try incl. conversions) */
  const PTR           = 5.5;
  const homeExpTries  = homeExpScore / PTR;
  const awayExpTries  = awayExpScore / PTR;
  const totalExpTries = homeExpTries + awayExpTries;

  /* ── Margin std dev for NRL ── */
  const STD = 13.5;

  /* ─────────────────────────────────────────────────────────────────────────
     DERIVED MARKETS
  ───────────────────────────────────────────────────────────────────────── */

  /* 1. Big Win Little Win */
  const pHomeBig    = 1 - normalCDF(12.5, signedMargin, STD);
  const pHomeLittle = pRange(0.5, 12.5, signedMargin, STD);
  const pAwayBig    = normalCDF(-12.5, signedMargin, STD);
  const pAwayLittle = pRange(-12.5, -0.5, signedMargin, STD);

  const bigWin = {
    homeBig:    toOdds(pHomeBig),
    homeLittle: toOdds(pHomeLittle),
    awayBig:    toOdds(pAwayBig),
    awayLittle: toOdds(pAwayLittle),
  };

  /* 2. Winning Margin bands */
  const BANDS = [
    { label: '1–12',  min: 0.5,  max: 12.5 },
    { label: '13–24', min: 12.5, max: 24.5  },
    { label: '25+',   min: 24.5, max: 99    },
  ];
  const marginBands = {
    home: BANDS.map(b => ({
      label: `${homeTeam} ${b.label}`,
      odd:   toOdds(pRange(b.min, b.max, signedMargin, STD)),
    })),
    away: BANDS.map(b => ({
      label: `${awayTeam} ${b.label}`,
      odd:   toOdds(pRange(-b.max, -b.min, signedMargin, STD)),
    })),
  };

  /* 3. Half-Time / Full-Time */
  const pHomeLeadsHT = pHome * 0.70 + pAway * 0.10;
  const pAwayLeadsHT = pAway * 0.70 + pHome * 0.10;
  const pDrawHT      = Math.max(0, 1 - pHomeLeadsHT - pAwayLeadsHT);
  const htft = {
    homeHome: toOdds(pHomeLeadsHT * pHome * 1.05, 1.08),
    homeDraw: toOdds(pDrawHT      * pHome * 0.45, 1.08),
    homeAway: toOdds(pHomeLeadsHT * pAway * 0.22, 1.08),
    drawHome: toOdds(pDrawHT      * pHome * 0.55, 1.08),
    drawDraw: toOdds(pDrawHT      * 0.18,          1.08),
    drawAway: toOdds(pDrawHT      * pAway * 0.55, 1.08),
    awayHome: toOdds(pAwayLeadsHT * pHome * 0.22, 1.08),
    awayAway: toOdds(pAwayLeadsHT * pAway * 1.05, 1.08),
  };

  /* 4. Team Total Points lines */
  const homeTotal = Math.round(homeExpScore / 4) * 4 - 2.5;  // e.g. 27.5
  const awayTotal = Math.round(awayExpScore / 4) * 4 - 2.5;
  const teamTotal = {
    homeTotal, awayTotal,
    homeOverOdd: toOdds(0.49), homeUnderOdd: toOdds(0.49),
    awayOverOdd: toOdds(0.49), awayUnderOdd: toOdds(0.49),
  };

  /* 5. Total Tries O/U */
  const tryLine = Math.round(totalExpTries) - 0.5;
  const totalTries = { line: tryLine, overOdd: toOdds(0.49), underOdd: toOdds(0.49) };

  /* 6. Race to 10 points */
  const pHomeFirst10 = pHome * 0.68 + 0.32 * 0.5;
  const race10 = { home: toOdds(pHomeFirst10), away: toOdds(1 - pHomeFirst10) };

  /* 7. First team to score */
  const pHomeScoresFirst = homeExpTries / totalExpTries;
  const firstTeam = {
    home: toOdds(pHomeScoresFirst),
    away: toOdds(1 - pHomeScoresFirst),
  };

  /* 8. Both teams to score tries (Poisson) */
  const pHomeDuck = Math.exp(-homeExpTries);
  const pAwayDuck = Math.exp(-awayExpTries);
  const pBothScore = 1 - pHomeDuck - pAwayDuck + pHomeDuck * pAwayDuck;
  const bothTeams = { yes: toOdds(pBothScore), no: toOdds(1 - pBothScore) };

  /* 9. Win both halves */
  const winBoth = {
    home: toOdds(pHome * 0.50),
    away: toOdds(pAway * 0.50),
  };

  /* 10. Team to score 20+ / 30+ */
  const score20 = {
    home20: toOdds(1 - normalCDF(20, homeExpScore, 8)),
    home30: toOdds(1 - normalCDF(30, homeExpScore, 8)),
    away20: toOdds(1 - normalCDF(20, awayExpScore, 8)),
    away30: toOdds(1 - normalCDF(30, awayExpScore, 8)),
  };

  /* 11. Pick Your Own Line — sample of alternative lines */
  const standardPt = Math.abs(linePt) || 8.5;
  const pickYourLine = {
    home: [
      { point: -(standardPt - 4).toFixed(1), odd: toOdds(0.56) },
      { point: -standardPt.toFixed(1),       odd: line.home.odd ?? toOdds(0.49) },
      { point: -(standardPt + 5).toFixed(1), odd: toOdds(0.40) },
      { point: -(standardPt + 11).toFixed(1),odd: toOdds(0.30) },
    ],
    away: [
      { point: +(standardPt - 4).toFixed(1), odd: toOdds(0.42) },
      { point: +standardPt.toFixed(1),       odd: line.away.odd ?? toOdds(0.49) },
      { point: +(standardPt + 5).toFixed(1), odd: toOdds(0.58) },
      { point: +(standardPt + 11).toFixed(1),odd: toOdds(0.68) },
    ],
  };

  /* 12. Time of try windows */
  const triesPerMin = totalExpTries / 80;
  const timeWindows = [
    { label: '1–10',  a: 0,  b: 10 },
    { label: '11–20', a: 10, b: 20 },
    { label: '21–30', a: 20, b: 30 },
    { label: '31–40', a: 30, b: 40 },
    { label: '41–50', a: 40, b: 50 },
    { label: '51–80', a: 50, b: 80 },
  ];
  const timeOfTry = timeWindows.map(w => ({
    label: w.label,
    odd: toOdds(
      Math.exp(-triesPerMin * w.a) * (1 - Math.exp(-triesPerMin * (w.b - w.a))),
      1.12,
    ),
  }));

  /* 13. Try Scorer markets (per player) */
  function calcPlayer(player, teamProb) {
    const base   = POS_FTS_BASE[player.pos] ?? 13;
    const strAdj = Math.sqrt(0.5 / Math.max(0.15, teamProb));
    const rateAdj= Math.sqrt(0.45 / Math.max(0.10, player.tryRate));
    const fts    = Math.max(3.5, base * strAdj * rateAdj);
    const mult   = POS_ANYTIME_MULT[player.pos] ?? 0.40;
    const any    = Math.max(1.20, fts * mult);
    return {
      name:       player.name,
      pos:        player.pos,
      fts:        Math.round(fts  * 20) / 20,
      anytime:    Math.round(any  * 20) / 20,
      twoPlus:    Math.round(Math.max(2.80, any * 3.2)  * 20) / 20,
      threePlus:  Math.round(Math.max(6.50, any * 8.5)  * 20) / 20,
      fst123:     Math.round(Math.max(2.50, fts * 0.42) * 20) / 20,
      lts:        Math.round(Math.max(4.00, fts * 0.75) * 20) / 20,
    };
  }

  const homePlayers = (NRL_TEAM_DATA[homeTeam]?.players ?? []).map(p => calcPlayer(p, pHome));
  const awayPlayers = (NRL_TEAM_DATA[awayTeam]?.players ?? []).map(p => calcPlayer(p, pAway));

  /* 14. Most Tries H2H matchups */
  const strikers = players => players.filter(p => ['wing','fullback','centre'].includes(p.pos));
  const hStr = strikers(homePlayers).slice(0, 2);
  const aStr = strikers(awayPlayers).slice(0, 2);
  const mostTries = hStr.flatMap(hp =>
    aStr.slice(0, 1).map(ap => {
      const pH2HHome = Math.min(0.65, pHome * 0.60 + 0.20);
      const pH2HTie  = 0.16;
      const pH2HAway = 1 - pH2HHome - pH2HTie;
      return {
        homePlayer: hp.name, awayPlayer: ap.name,
        homeOdd: toOdds(pH2HHome, 1.08),
        awayOdd: toOdds(Math.max(0.15, pH2HAway), 1.08),
      };
    })
  );

  /* 15. First & Last try scorer combos (sample) */
  const firstAndLast = hStr.slice(0, 2).flatMap(hp =>
    aStr.slice(0, 1).map(ap => ({
      label:   `${hp.name} first / ${ap.name} last`,
      homeOdd: toOdds(pHomeScoresFirst * 0.25 * pAway, 1.15),
    })).concat(hStr.slice(0, 1).map(hp => ({
      label:   `${hp.name} first & last`,
      homeOdd: toOdds(0.018, 1.15),
    })))
  );

  /* 16. Half Markets */
  const firstHalf = {
    h2hHome: toOdds(pHomeLeadsHT, 1.05),
    h2hAway: toOdds(pAwayLeadsHT, 1.05),
    ouTotal:    Math.round(ouTotal * 0.44 / 0.5) * 0.5,
    overOdd:  toOdds(0.49),
    underOdd: toOdds(0.49),
  };
  const secondHalf = {
    h2hHome: toOdds(pHome * 0.60 + 0.40 * 0.5, 1.05),
    h2hAway: toOdds(pAway * 0.60 + 0.40 * 0.5, 1.05),
    ouTotal:    Math.round(ouTotal * 0.56 / 0.5) * 0.5,
    overOdd:  toOdds(0.49),
    underOdd: toOdds(0.49),
  };

  /* 17. Player Metres / Tackles / Performance Points — representative lines */
  const playerProps = homePlayers.concat(awayPlayers).filter(p =>
    ['wing','fullback','centre','halfback','five-eighth'].includes(p.pos)
  ).slice(0, 6).map(p => {
    const isBack    = ['wing','fullback'].includes(p.pos);
    const metresLine = isBack ? 120.5 : 70.5;
    const tacklesLine= p.pos === 'halfback' ? 28.5 : isBack ? 15.5 : 35.5;
    const perfLine   = isBack ? 52.5 : 42.5;
    return {
      name: p.name, pos: p.pos,
      metres:      { line: metresLine, overOdd: toOdds(0.49), underOdd: toOdds(0.49) },
      tackles:     { line: tacklesLine, overOdd: toOdds(0.49), underOdd: toOdds(0.49) },
      performance: { line: perfLine,    overOdd: toOdds(0.49), underOdd: toOdds(0.49) },
    };
  });

  /* 18. Team Score Combo (sample combos) */
  const teamScoreCombo = [
    { home: '0–10', away: '21–30', odd: toOdds(pRange(0, 10, homeExpScore, 9) * pRange(21, 30, awayExpScore, 9), 1.20) },
    { home: '11–20', away: '0–10', odd: toOdds(pRange(11, 20, homeExpScore, 9) * pRange(0, 10, awayExpScore, 9), 1.20) },
    { home: '21–30', away: '0–10', odd: toOdds(pRange(21, 30, homeExpScore, 9) * pRange(0, 10, awayExpScore, 9), 1.20) },
    { home: '21–30', away: '11–20', odd: toOdds(pRange(21, 30, homeExpScore, 9) * pRange(11, 20, awayExpScore, 9), 1.20) },
  ];

  return {
    bigWin, marginBands, htft, teamTotal, totalTries, race10,
    firstTeam, bothTeams, winBoth, score20, pickYourLine,
    timeOfTry, homePlayers, awayPlayers, mostTries, firstAndLast,
    firstHalf, secondHalf, playerProps, teamScoreCombo,
  };
}

/* ── Broadcaster helper ────────────────────────────────────────────────────── */
// All NRL games are on Fox League. Thursday & select Friday/Sunday games also on Nine.

function getBroadcaster(utcDate) {
  const day = new Date(utcDate).toLocaleString('en-AU', { weekday: 'short', timeZone: 'Australia/Sydney' });
  const hour = parseInt(new Date(utcDate).toLocaleString('en-AU', { hour: 'numeric', hour12: false, timeZone: 'Australia/Sydney' }));
  // Thursday night → always Nine + Fox League
  if (day === 'Thu') return '📺 Nine · Fox League';
  // Friday/Sunday primetime (6 pm+) featured game → Nine + Fox League
  if ((day === 'Fri' || day === 'Sun') && hour >= 17) return '📺 Nine · Fox League';
  return '📺 Fox League';
}

/* ── Transform API game → NRL_GAMES entry ──────────────────────────────────── */

function buildGameEntry(apiGame, id) {
  const homeData = NRL_TEAM_DATA[apiGame.homeTeam] ?? { emoji: '🏉', shortName: apiGame.homeTeam };
  const awayData = NRL_TEAM_DATA[apiGame.awayTeam] ?? { emoji: '🏉', shortName: apiGame.awayTeam };

  const derived = deriveAllMarkets(apiGame);

  const dt = new Date(apiGame.commenceTime);
  const timeStr = dt.toLocaleString('en-AU', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Australia/Sydney',
  });

  return {
    id,
    homeTeam: { name: apiGame.homeTeam, emoji: homeData.emoji, shortName: homeData.shortName, record: '' },
    awayTeam: { name: apiGame.awayTeam, emoji: awayData.emoji, shortName: awayData.shortName, record: '' },
    time: timeStr,
    venue: homeData.venue ?? 'TBC',
    broadcaster: getBroadcaster(dt),
    isLive: false,
    h2h:  { home: apiGame.h2h.home ?? 1.90, away: apiGame.h2h.away ?? 1.90 },
    line: {
      home: { label: apiGame.line.home.point != null ? `${apiGame.line.home.point > 0 ? '+' : ''}${apiGame.line.home.point}` : '', odd: apiGame.line.home.odd ?? 1.90 },
      away: { label: apiGame.line.away.point != null ? `${apiGame.line.away.point > 0 ? '+' : ''}${apiGame.line.away.point}` : '', odd: apiGame.line.away.odd ?? 1.90 },
    },
    ou: {
      over:  { label: apiGame.ou.total ?? '44.5', odd: apiGame.ou.overOdd ?? 1.90 },
      under: { label: apiGame.ou.total ?? '44.5', odd: apiGame.ou.underOdd ?? 1.90 },
    },
    derived,
    analysis: buildAnalysis(apiGame, derived),
  };
}

function buildAnalysis(apiGame, derived) {
  const favTeam = apiGame.h2h.home <= apiGame.h2h.away ? apiGame.homeTeam : apiGame.awayTeam;
  const homeWinProb = apiGame.h2h.home ? Math.round((1 / apiGame.h2h.home) / ((1/apiGame.h2h.home) + (1/apiGame.h2h.away)) * 100) : 50;
  const confidence  = homeWinProb >= 75 ? 'High' : homeWinProb >= 60 ? 'Medium' : 'Low';

  return {
    favourite:      favTeam,
    confidenceLevel: confidence,
    homeFormLast5:  'W W L W L',
    awayFormLast5:  'L W W L W',
    weatherForecast:'Fine, 18°C',
    avgMargin:      `${Math.abs(apiGame.line.home.point ?? 8).toFixed(1)} pts (line)`,
    keyFactor:      `Line: ${apiGame.line.home.point != null ? apiGame.line.home.point : 'N/A'} pts`,
    recommendation: `${favTeam} favoured at $${Math.min(apiGame.h2h.home, apiGame.h2h.away).toFixed(2)}. ${confidence} confidence.`,
  };
}
