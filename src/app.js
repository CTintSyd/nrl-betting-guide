/* ── form-data.json — fetched once, shared by round badge + ladder ── */
const formDataPromise = fetch('src/form-data.json').then(r => r.json()).catch(() => null);

/* ── player-stats.json — real season try rates from NRL.com ── */
const playerStatsPromise = fetch('src/player-stats.json').then(r => r.json()).catch(() => null);

/* ── Inject real try rates into NRL_TEAM_DATA once stats are loaded ── */
playerStatsPromise.then(stats => {
  if (!stats?.players) return;
  Object.values(NRL_TEAM_DATA).forEach(team => {
    (team.players || []).forEach(p => {
      const real = stats.players[p.name];
      if (real) p.tryRate = real.tryRate;
    });
  });
});

/* ── Team Logo Cache ── */
const TEAM_LOGOS = {}; // teamName → image URL

async function loadTeamLogos() {
  const teams = Object.entries(NRL_TEAM_DATA).filter(([, v]) => v.wikiPage);
  await Promise.allSettled(teams.map(async ([name, data]) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(data.wikiPage)}`,
        { headers: { Accept: 'application/json' } }
      );
      if (!res.ok) return;
      const json = await res.json();
      if (json.thumbnail?.source) TEAM_LOGOS[name] = json.thumbnail.source;
    } catch (_) {}
  }));
}

function teamLogoHtml(name, size = 52) {
  const src = TEAM_LOGOS[name];
  const emoji = NRL_TEAM_DATA[name]?.emoji ?? '🏉';
  if (src) {
    return `<img class="team-logo" src="${src}" alt="${name}" width="${size}" height="${size}" style="object-fit:contain">`;
  }
  return `<span class="team-emoji">${emoji}</span>`;
}

/* ── Bet Type Card Grid ── */
let activeTab = null;

document.querySelectorAll('.bt-card').forEach(card => {
  card.addEventListener('click', () => {
    const tab = card.dataset.tab;
    const detail = document.getElementById('panelDetail');

    if (activeTab === tab) {
      // toggle off
      card.classList.remove('active');
      detail.classList.add('hidden');
      detail.innerHTML = '';
      activeTab = null;
      return;
    }

    document.querySelectorAll('.bt-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeTab = tab;

    detail.innerHTML = renderPanel(tab);
    detail.classList.remove('hidden');
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

/* ── Category Filter ── */
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.bt-card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
    // close panel if active card is now hidden
    if (activeTab) {
      const activeCard = document.querySelector(`.bt-card[data-tab="${activeTab}"]`);
      if (activeCard && activeCard.style.display === 'none') {
        activeCard.classList.remove('active');
        document.getElementById('panelDetail').classList.add('hidden');
        activeTab = null;
      }
    }
  });
});

/* ── Multi Builder State ── */
const multiSelections = [];

function updateMultiBuilder() {
  const floating = document.getElementById('multiFloating');
  const countEls = document.querySelectorAll('#multiCount');
  const legsEl = document.getElementById('multiLegs');
  const oddsEl = document.getElementById('multiOdds');
  const returnEl = document.getElementById('multiReturn');
  const chanceEl = document.getElementById('multiChance');

  countEls.forEach(el => el.textContent = multiSelections.length + ' leg' + (multiSelections.length !== 1 ? 's' : ''));

  if (multiSelections.length === 0) {
    if (floating) floating.style.display = 'none';
    if (legsEl) legsEl.innerHTML = '<div class="multi-empty">Click any odds button to add a leg.</div>';
    if (oddsEl) oddsEl.textContent = '—';
    if (returnEl) returnEl.textContent = '—';
    if (chanceEl) chanceEl.textContent = '—';
    return;
  }

  if (floating) floating.style.display = 'block';

  if (legsEl) legsEl.innerHTML = multiSelections.map((s, i) =>
    `<div class="multi-leg-item">
      <span><strong>${s.team}</strong> <span style="color:var(--nrl-green);font-weight:800">$${s.odd}</span></span>
      <button class="remove-leg" data-idx="${i}">✕</button>
    </div>`
  ).join('');

  document.querySelectorAll('.remove-leg').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const removed = multiSelections.splice(idx, 1)[0];
      document.querySelectorAll(`[data-selection-id="${removed.id}"]`).forEach(el => el.classList.remove('selected'));
      updateMultiBuilder();
    });
  });

  const combined = multiSelections.reduce((acc, s) => acc * s.odd, 1);
  const estChance = multiSelections.reduce((acc, s) => acc * (1 / s.odd), 1) * 100;

  if (oddsEl) oddsEl.textContent = '$' + combined.toFixed(2);
  if (returnEl) returnEl.textContent = '$' + (combined * 10).toFixed(2);
  if (chanceEl) chanceEl.textContent = estChance.toFixed(1) + '%';
}

/* ── Games Grid ── */
/* ── Estimated odds helpers ─────────────────────────────────────────────── */
function estOdd(p) { return Math.max(1.05, +(1.06 / Math.min(p, 0.97)).toFixed(2)); }

function derivedMarkets(game) {
  const hProb = 1 / game.h2h.home;
  const aProb = 1 / game.h2h.away;
  const normH = hProb / (hProb + aProb);
  const fav      = normH >= 0.5 ? game.homeTeam.name : game.awayTeam.name;
  const dog      = normH >= 0.5 ? game.awayTeam.name : game.homeTeam.name;
  const favShort = fav.split(' ').pop();
  const dogShort = dog.split(' ').pop();
  const homeShort = game.homeTeam.name.split(' ').pop();
  const awayShort = game.awayTeam.name.split(' ').pop();
  const pFav = Math.max(normH, 1 - normH);
  const pDog = 1 - pFav;
  const pHome = normH, pAway = 1 - normH;
  const totalPts = game.ou?.over?.label ? parseFloat(game.ou.over.label) : 42;
  const totalTries = Math.round(totalPts / 6);
  const id = game.id;

  function topN(teamName, n = 4) {
    return (NRL_TEAM_DATA[teamName]?.players || [])
      .slice().sort((a, b) => b.tryRate - a.tryRate).slice(0, n);
  }
  function ftsOdd(r)     { return Math.max(3.0,  +(1.06 / (r * 0.42)).toFixed(2)); }
  function anytimeOdd(r) { return Math.max(1.3,  +(1.06 / Math.min(0.92, r)).toFixed(2)); }
  function mk(label, sublabel, odd, sfx, type, team) {
    return { label, sublabel, odd: +Number(odd).toFixed(2), selId: `g${id}-${sfx}`, type, team: team || label };
  }

  const hPlayers = topN(game.homeTeam.name, 4);
  const aPlayers = topN(game.awayTeam.name, 4);
  const favPlayers = normH >= 0.5 ? hPlayers : aPlayers;
  const dogPlayers = normH >= 0.5 ? aPlayers : hPlayers;
  const allSorted  = [
    ...hPlayers.map(p => ({...p, tShort: homeShort})),
    ...aPlayers.map(p => ({...p, tShort: awayShort})),
  ].sort((a, b) => b.tryRate - a.tryRate);
  const favStar = favPlayers[0];
  const dogStar = dogPlayers[0];

  // Line values for this game
  const favLineLabel = normH >= 0.5 ? game.line.home.label : game.line.away.label;
  const favLineOdd   = normH >= 0.5 ? game.line.home.odd   : game.line.away.odd;
  const dogLineLabel = normH >= 0.5 ? game.line.away.label : game.line.home.label;
  const dogLineOdd   = normH >= 0.5 ? game.line.away.odd   : game.line.home.odd;

  return {
    /* Win Markets */
    win: [
      mk(homeShort, 'Win', game.h2h.home, 'wn-h', 'H2H', game.homeTeam.name),
      mk(awayShort, 'Win', game.h2h.away, 'wn-a', 'H2H', game.awayTeam.name),
      mk(`${homeShort} ${game.line.home.label}`, 'Line', game.line.home.odd, 'wn-lh', 'Line', `${game.homeTeam.name} ${game.line.home.label}`),
      mk(`${awayShort} ${game.line.away.label}`, 'Line', game.line.away.odd, 'wn-la', 'Line', `${game.awayTeam.name} ${game.line.away.label}`),
    ],

    /* Handicap Markets */
    handicap: [
      mk(`${homeShort} ${game.line.home.label}`, 'Hcap', game.line.home.odd, 'hc-h', 'Handicap', `${game.homeTeam.name} ${game.line.home.label}`),
      mk(`${awayShort} ${game.line.away.label}`, 'Hcap', game.line.away.odd, 'hc-a', 'Handicap', `${game.awayTeam.name} ${game.line.away.label}`),
      mk(`${favShort} ${parseFloat(favLineLabel)-6}`, 'Alt Line', +(favLineOdd * 0.78).toFixed(2), 'hc-falt', 'Alt. Handicap', `${fav} alt line`),
      mk(`${dogShort} ${parseFloat(dogLineLabel)+6}`, 'Alt Line', +(dogLineOdd * 0.78).toFixed(2), 'hc-dalt', 'Alt. Handicap', `${dog} alt line`),
    ],

    /* Match Markets (HT/FT, BTTS, etc.) */
    match: [
      mk(`${favShort}/${favShort}`, 'HT/FT', (2.1 + pDog * 1.5).toFixed(2), 'mc-ff', 'HT/FT', `${fav}/${fav}`),
      mk(`${dogShort}/${favShort}`, 'HT/FT', (5.5 + pFav * 2).toFixed(2),   'mc-df', 'HT/FT', `${dog}/${fav}`),
      mk(`${favShort}/${dogShort}`, 'HT/FT', (8.5 + pFav * 3).toFixed(2),   'mc-fd', 'HT/FT', `${fav}/${dog}`),
      mk(`${dogShort}/${dogShort}`, 'HT/FT', (4.5 + pFav * 4).toFixed(2),   'mc-dd', 'HT/FT', `${dog}/${dog}`),
      mk('BTTS Yes',       'Match', 1.28, 'mc-btts', 'Both Teams to Score', 'Both Teams to Score'),
      mk(`${favShort} HT`, 'Lead HT', estOdd(pFav * 0.56 + 0.08), 'mc-ht', 'Leading at HT', `${fav} leading at HT`),
    ],

    /* Margin Markets */
    margin: [
      mk(`${favShort} 1–6`,   'Margin', (5.5  - pFav * 0.5).toFixed(2),  'mg-6',   'Win Margin', `${fav} 1–6`),
      mk(`${favShort} 7–12`,  'Margin', (4.2  - pFav * 0.4).toFixed(2),  'mg-12',  'Win Margin', `${fav} 7–12`),
      mk(`${favShort} 13–18`, 'Margin', (4.8  - pFav * 0.35).toFixed(2), 'mg-18',  'Win Margin', `${fav} 13–18`),
      mk(`${favShort} 19–24`, 'Margin', (5.2  - pFav * 0.3).toFixed(2),  'mg-24',  'Win Margin', `${fav} 19–24`),
      mk(`${favShort} 25–30`, 'Margin', (6.5  - pFav * 0.25).toFixed(2), 'mg-30',  'Win Margin', `${fav} 25–30`),
      mk(`${favShort} 31+`,   'Margin', (9.0  - pFav * 0.2).toFixed(2),  'mg-31p', 'Win Margin', `${fav} 31+`),
      mk(`${dogShort} 1–12`,  'Upset',  (8.0  - pDog * 0.5).toFixed(2),  'mg-d1',  'Win Margin', `${dog} 1–12`),
      mk(`${dogShort} 13+`,   'Upset',  (14.0 - pDog).toFixed(2),        'mg-d2',  'Win Margin', `${dog} 13+`),
    ],

    /* Total Points Markets */
    totalPoints: [
      mk(`Ovr ${game.ou.over.label}`,         'Pts', game.ou.over.odd,                           'tp-ov',  'Total Points Over',  `Over ${game.ou.over.label}`),
      mk(`Und ${game.ou.under.label}`,        'Pts', game.ou.under.odd,                          'tp-un',  'Total Points Under', `Under ${game.ou.under.label}`),
      mk(`Ovr ${+game.ou.over.label + 6}`,   'Pts', (game.ou.over.odd  * 1.38).toFixed(2),       'tp-ov2', 'Total Points Over',  `Over ${+game.ou.over.label + 6}`),
      mk(`Und ${+game.ou.under.label - 6}`,  'Pts', (game.ou.under.odd * 1.38).toFixed(2),       'tp-un2', 'Total Points Under', `Under ${+game.ou.under.label - 6}`),
      mk(`${Math.round(totalPts-8)}–${Math.round(totalPts)}`,     'Exact Pts', 5.50, 'tp-ex1', 'Exact Total Points', `${Math.round(totalPts-8)}–${Math.round(totalPts)} pts`),
      mk(`${Math.round(totalPts+1)}–${Math.round(totalPts+12)}`,  'Exact Pts', 4.80, 'tp-ex2', 'Exact Total Points', `${Math.round(totalPts+1)}–${Math.round(totalPts+12)} pts`),
    ],

    /* Total Tries Markets */
    totalTries: [
      mk(`Ovr ${totalTries - 0.5}`, 'Tries', 1.88, 'tt-ov',  'Total Tries Over',  `Over ${totalTries - 0.5} tries`),
      mk(`Und ${totalTries - 0.5}`, 'Tries', 1.92, 'tt-un',  'Total Tries Under', `Under ${totalTries - 0.5} tries`),
      mk(`Ovr ${totalTries + 0.5}`, 'Tries', 2.80, 'tt-ov2', 'Total Tries Over',  `Over ${totalTries + 0.5} tries`),
      mk(`Und ${totalTries + 0.5}`, 'Tries', 2.50, 'tt-un2', 'Total Tries Under', `Under ${totalTries + 0.5} tries`),
      mk(`Exactly ${totalTries}`,   'Tries', 5.50, 'tt-ex',  'Exact Tries',       `Exactly ${totalTries} tries`),
      mk(`${totalTries - 1} or less`, 'Tries', 3.20, 'tt-les', 'Total Tries Under', `${totalTries-1} or fewer tries`),
    ],

    /* Tryscorer Markets */
    tryscorer: [
      ...favPlayers.slice(0, 2).map((p, i) => mk(p.name, 'Anytime', anytimeOdd(p.tryRate), `ts-fa${i}`, 'Anytime Try Scorer', p.name)),
      ...dogPlayers.slice(0, 2).map((p, i) => mk(p.name, 'Anytime', anytimeOdd(p.tryRate), `ts-da${i}`, 'Anytime Try Scorer', p.name)),
      mk(favStar?.name ?? favShort, 'FTS',      favStar ? ftsOdd(favStar.tryRate)              : 6,   'ts-fts1', 'First Try Scorer', favStar?.name ?? fav),
      mk(dogStar?.name ?? dogShort, 'FTS',      dogStar ? ftsOdd(dogStar.tryRate)              : 9,   'ts-fts2', 'First Try Scorer', dogStar?.name ?? dog),
      mk(favStar?.name ?? favShort, 'Last Try', favStar ? (ftsOdd(favStar.tryRate)*1.1).toFixed(2) : 7,'ts-lst1', 'Last Try Scorer',  favStar?.name ?? fav),
      mk(dogStar?.name ?? dogShort, 'Last Try', dogStar ? (ftsOdd(dogStar.tryRate)*1.1).toFixed(2) : 10,'ts-lst2','Last Try Scorer',  dogStar?.name ?? dog),
    ],

    /* Player Markets */
    player: [
      ...allSorted.slice(0, 4).map((p, i) => mk(p.name, `${p.tShort} Any`, anytimeOdd(p.tryRate), `pl-a${i}`, 'Anytime Try Scorer', p.name)),
      ...allSorted.slice(0, 3).map((p, i) => mk(p.name, '2+ Tries', (anytimeOdd(p.tryRate)*2.6).toFixed(2), `pl-2t${i}`, '2+ Tries', p.name)),
      ...allSorted.slice(0, 2).map((p, i) => mk(p.name, '3+ Tries', (anytimeOdd(p.tryRate)*7.5).toFixed(2), `pl-3t${i}`, '3+ Tries', p.name)),
    ],

    /* Player Combo Markets */
    playerCombo: [
      ...(hPlayers[0] && aPlayers[0] ? [mk(
        `${hPlayers[0].name.split(' ').pop()} + ${aPlayers[0].name.split(' ').pop()}`,
        'Both Score', (anytimeOdd(hPlayers[0].tryRate) * anytimeOdd(aPlayers[0].tryRate) * 0.8).toFixed(2),
        'pc-ba', 'Player Combo Both Score', `${hPlayers[0].name} & ${aPlayers[0].name} both score`)] : []),
      ...(favPlayers[0] && favPlayers[1] ? [mk(
        `${favPlayers[0].name.split(' ').pop()} + ${favPlayers[1].name.split(' ').pop()}`,
        `${favShort} Duo`, (anytimeOdd(favPlayers[0].tryRate) * anytimeOdd(favPlayers[1].tryRate) * 0.8).toFixed(2),
        'pc-fd', 'Player Combo Duo', `${favPlayers[0].name} & ${favPlayers[1].name} both score`)] : []),
      ...(allSorted[0] && allSorted[1] ? [mk(
        `${allSorted[0].name.split(' ').pop()} + ${allSorted[1].name.split(' ').pop()}`,
        'Top 2 Score', (anytimeOdd(allSorted[0].tryRate) * anytimeOdd(allSorted[1].tryRate) * 0.8).toFixed(2),
        'pc-t2', 'Player Combo Top 2', `${allSorted[0].name} & ${allSorted[1].name} both score`)] : []),
      ...(favStar ? [mk(favStar.name, 'Any + Win', (anytimeOdd(favStar.tryRate) * (normH >= 0.5 ? game.h2h.home : game.h2h.away) * 0.85).toFixed(2),
        'pc-aw', 'Player + Team Win', `${favStar.name} score & ${fav} win`)] : []),
    ],

    /* Player Points Scored */
    playerPoints: allSorted.slice(0, 4).flatMap((p, i) => {
      const expPts = p.tryRate * 4 + (['halfback','five-eighth'].includes(p.pos) ? 2 : 0);
      const line   = Math.max(0.5, Math.round(expPts * 2) / 2);
      return [
        mk(p.name, `Ovr ${line}pts`, (1.06 / Math.min(0.75, p.tryRate + 0.1)).toFixed(2), `pp-ov${i}`, 'Player Points Over',  `${p.name} Over ${line}pts`),
        mk(p.name, `Und ${line}pts`, (1.06 / Math.min(0.75, 1 - p.tryRate)).toFixed(2),   `pp-un${i}`, 'Player Points Under', `${p.name} Under ${line}pts`),
      ];
    }),

    /* Player Exact Tries Scored */
    playerExact: allSorted.slice(0, 4).flatMap((p, i) => [
      mk(p.name, '0 Tries', (1.06 / Math.min(0.8, 1 - p.tryRate * 0.9)).toFixed(2), `pe-0t${i}`, 'Exact Tries: 0',  `${p.name} 0 tries`),
      mk(p.name, '1 Try',   (anytimeOdd(p.tryRate) * 0.7).toFixed(2),               `pe-1t${i}`, 'Exact Tries: 1',  `${p.name} 1 try`),
      mk(p.name, '2 Tries', (anytimeOdd(p.tryRate) * 2.2).toFixed(2),               `pe-2t${i}`, 'Exact Tries: 2',  `${p.name} 2 tries`),
    ]),

    /* Most Tries Head to Head */
    mostTries: hPlayers.slice(0, 3).flatMap((hp, i) => {
      const ap = aPlayers[i]; if (!ap) return [];
      const tot = hp.tryRate + ap.tryRate;
      return [
        mk(hp.name, `vs ${ap.name.split(' ').pop()}`, (1.06 * tot / hp.tryRate / 0.95).toFixed(2), `mt-h${i}`, 'Most Tries H2H', `${hp.name} over ${ap.name}`),
        mk(ap.name, `vs ${hp.name.split(' ').pop()}`, (1.06 * tot / ap.tryRate / 0.95).toFixed(2), `mt-a${i}`, 'Most Tries H2H', `${ap.name} over ${hp.name}`),
      ];
    }),

    /* 1st Half Markets */
    firstHalf: [
      mk(homeShort,  '1H Win', estOdd(pHome * 0.62 + 0.1), 'fh-hw',  '1H H2H', `${game.homeTeam.name} 1H win`),
      mk(awayShort,  '1H Win', estOdd(pAway * 0.62 + 0.1), 'fh-aw',  '1H H2H', `${game.awayTeam.name} 1H win`),
      mk('Draw',     '1H H2H', 2.90,                        'fh-dr',  '1H Draw', '1H Draw'),
      mk(`Ovr ${Math.round(totalPts*0.47/6)-0.5}`, '1H Tries', 1.90, 'fh-ov', '1H Tries Over',  `1H Over ${Math.round(totalPts*0.47/6)-0.5}`),
      mk(`Und ${Math.round(totalPts*0.47/6)-0.5}`, '1H Tries', 1.90, 'fh-un', '1H Tries Under', `1H Under ${Math.round(totalPts*0.47/6)-0.5}`),
      mk(favStar?.name ?? favShort, '1H FTS', favStar ? (ftsOdd(favStar.tryRate)*0.9).toFixed(2) : 7, 'fh-fts', '1H First Try Scorer', favStar?.name ?? fav),
    ],

    /* 2nd Half Markets */
    secondHalf: [
      mk(homeShort, '2H Win', estOdd(pHome * 0.60 + 0.12), 'sh-hw', '2H H2H', `${game.homeTeam.name} 2H win`),
      mk(awayShort, '2H Win', estOdd(pAway * 0.60 + 0.12), 'sh-aw', '2H H2H', `${game.awayTeam.name} 2H win`),
      mk('Draw',    '2H H2H', 3.10,                         'sh-dr', '2H Draw', '2H Draw'),
      mk(`Ovr ${Math.round(totalPts*0.53/6)-0.5}`, '2H Tries', 1.90, 'sh-ov', '2H Tries Over',  `2H Over ${Math.round(totalPts*0.53/6)-0.5}`),
      mk(`Und ${Math.round(totalPts*0.53/6)-0.5}`, '2H Tries', 1.90, 'sh-un', '2H Tries Under', `2H Under ${Math.round(totalPts*0.53/6)-0.5}`),
      mk(dogStar?.name ?? dogShort, '2H FTS', dogStar ? (ftsOdd(dogStar.tryRate)*0.88).toFixed(2) : 8, 'sh-fts', '2H First Try Scorer', dogStar?.name ?? dog),
    ],

    /* 1st & Last to Score */
    firstLast: [
      mk(favStar?.name ?? favShort, 'First',     favStar ? ftsOdd(favStar.tryRate)              : 6,    'fl-f1', 'First Try Scorer', favStar?.name ?? fav),
      mk(dogStar?.name ?? dogShort, 'First',     dogStar ? ftsOdd(dogStar.tryRate)              : 9,    'fl-f2', 'First Try Scorer', dogStar?.name ?? dog),
      mk(favStar?.name ?? favShort, 'Last',      favStar ? (ftsOdd(favStar.tryRate)*1.05).toFixed(2) : 7, 'fl-l1', 'Last Try Scorer', favStar?.name ?? fav),
      mk(dogStar?.name ?? dogShort, 'Last',      dogStar ? (ftsOdd(dogStar.tryRate)*1.05).toFixed(2) : 10,'fl-l2', 'Last Try Scorer', dogStar?.name ?? dog),
      ...(favPlayers[0] && favPlayers[1] ? [mk(
        `${favPlayers[0].name.split(' ').pop()} 1st`,
        `${favPlayers[1].name.split(' ').pop()} Last`,
        (ftsOdd(favPlayers[0].tryRate) * ftsOdd(favPlayers[1].tryRate) * 0.75).toFixed(2),
        'fl-c1', '1st & Last Combo', `${favPlayers[0].name} 1st & ${favPlayers[1].name} last`)] : []),
    ],

    /* Time Of Markets — 10-min bands */
    timeOf: [
      mk('0–10 min',  '1st Try', 4.50, 'to-0', 'Time of First Try', 'First try 0–10 min'),
      mk('11–20 min', '1st Try', 4.00, 'to-1', 'Time of First Try', 'First try 11–20 min'),
      mk('21–30 min', '1st Try', 5.00, 'to-2', 'Time of First Try', 'First try 21–30 min'),
      mk('31–40 min', '1st Try', 5.50, 'to-3', 'Time of First Try', 'First try 31–40 min'),
      mk('41–50 min', '1st Try', 5.50, 'to-4', 'Time of First Try', 'First try 41–50 min'),
      mk('51–60 min', '1st Try', 5.00, 'to-5', 'Time of First Try', 'First try 51–60 min'),
      mk('61–70 min', '1st Try', 6.00, 'to-6', 'Time of First Try', 'First try 61–70 min'),
      mk('71–80 min', '1st Try', 7.00, 'to-7', 'Time of First Try', 'First try 71–80 min'),
    ],

    /* Exact Minute of 1st Try — individual minute 1–40, then 40+ catchall */
    exactMinute: (() => {
      // Per-minute probability % (index 0 = minute 1). Peak around mins 6–10, ~70% total in 1–40.
      const probs = [
        1.6, 2.2, 2.7, 3.3, 3.8,  // mins  1–5
        4.4, 4.9, 4.9, 4.4, 3.8,  // mins  6–10
        3.3, 2.7, 2.4, 2.2, 2.0,  // mins 11–15
        1.8, 1.6, 1.5, 1.4, 1.3,  // mins 16–20
        1.2, 1.1, 1.0, 1.0, 0.9,  // mins 21–25
        0.9, 0.8, 0.8, 0.7, 0.7,  // mins 26–30
        0.6, 0.55,0.55,0.5, 0.5,  // mins 31–35
        0.4, 0.4, 0.4, 0.4, 0.35, // mins 36–40
      ];
      const items = probs.map((prob, i) =>
        mk(`Min ${i + 1}`, 'Exact Min',
          Math.round(1.06 / (prob / 100)),
          `em-${i}`, 'Exact Minute 1st Try', `First try exact minute ${i + 1}`)
      );
      const remainP = Math.max(0.01, 1 - probs.reduce((a, b) => a + b, 0) / 100);
      items.push(mk('40+ min', 'Catchall',
        +(1.06 / remainP).toFixed(2),
        'em-40', 'Exact Minute 1st Try', 'First try minute 40 or later'));
      return items;
    })(),

    /* Doubles Markets */
    doubles: [
      mk(`${favShort} Win`,             'Leg 1', (normH >= 0.5 ? game.h2h.home   : game.h2h.away).toFixed(2),   'db-l1', 'Doubles', `${fav} Win`),
      mk(`Over ${game.ou.over.label}`,  'Leg 2', game.ou.over.odd.toFixed(2),                                   'db-l2', 'Doubles', `Over ${game.ou.over.label}`),
      mk(favStar?.name ?? favShort,     'Leg 3', favStar ? anytimeOdd(favStar.tryRate).toFixed(2) : 2.5,        'db-l3', 'Doubles', `${favStar?.name ?? fav} Anytime`),
      mk(`${favShort} ${favLineLabel}`, 'Leg 4', favLineOdd.toFixed(2),                                         'db-l4', 'Doubles', `${fav} Line`),
    ],

    /* Early Payout Markets */
    earlyPayout: [
      mk(`${favShort} 24+`,   'Payout Trig.', (5.0 - pFav * 0.4).toFixed(2),          'ep-1', 'Early Payout', `${fav} by 24+ (payout trigger)`),
      mk(`${favShort} 12+`,   'Cash Out',     (2.3 - pFav * 0.25).toFixed(2),         'ep-2', 'Early Payout', `${fav} by 12+ (early cash out)`),
      mk('HT Leader Wins',    'Insurance',    estOdd(0.68),                            'ep-3', 'Early Payout', 'Half-time leader wins match'),
      mk(`${favShort} HT`,    'Ins. Win',     estOdd(pFav * 0.72 + 0.05).toFixed(2),  'ep-4', 'Early Payout', `${fav} lead at HT insurance`),
    ],

    /* BYO Sportsbet */
    byo: [
      mk(`${favShort} Win`,            'BYO H2H',  (normH >= 0.5 ? game.h2h.home : game.h2h.away).toFixed(2), 'by-1', 'BYO H2H',         `${fav} Win`),
      mk(favStar?.name ?? favShort,    'BYO Try',  favStar ? anytimeOdd(favStar.tryRate).toFixed(2) : 2.5,     'by-2', 'BYO Try Scorer',  `${favStar?.name ?? fav} Anytime`),
      mk(`Over ${game.ou.over.label}`, 'BYO O/U',  game.ou.over.odd.toFixed(2),                               'by-3', 'BYO O/U',         `Over ${game.ou.over.label}`),
      mk(`${favShort} ${favLineLabel}`, 'BYO Line', favLineOdd.toFixed(2),                                     'by-4', 'BYO Line',        `${fav} Line`),
    ],

    /* Exact Minute of Last Try — individual minute 1–40, then 40+ catchall */
    /* Last tries cluster heavily in 2nd half; 40+ catchall ≈ 65% probability */
    exactMinuteLast: (() => {
      const probs = [
        0.05,0.06,0.07,0.09,0.11, // mins  1– 5
        0.13,0.15,0.17,0.18,0.20, // mins  6–10
        0.22,0.25,0.28,0.31,0.35, // mins 11–15
        0.39,0.43,0.47,0.52,0.57, // mins 16–20
        0.63,0.69,0.75,0.82,0.89, // mins 21–25
        0.97,1.05,1.14,1.23,1.33, // mins 26–30
        1.44,1.55,1.67,1.80,1.94, // mins 31–35
        2.09,2.25,2.43,2.62,2.82, // mins 36–40
      ];
      const items = probs.map((prob, i) =>
        mk(`Min ${i + 1}`, 'Last Try',
          Math.min(501, Math.round(1.06 / (prob / 100))),
          `el-${i}`, 'Exact Minute Last Try', `Last try exact minute ${i + 1}`)
      );
      const remainP = Math.max(0.01, 1 - probs.reduce((a, b) => a + b, 0) / 100);
      items.push(mk('40+ min', 'Catchall',
        +(1.06 / remainP).toFixed(2),
        'el-40', 'Exact Minute Last Try', 'Last try minute 40 or later'));
      return items;
    })(),

    /* Time of 1st Try — Team-Specific (Home & Away) */
    timeOfHome: (() => {
      const bands = ['0–10 min','11–20 min','21–30 min','31–40 min','41–50 min','51–60 min','61–70 min','71–80 min'];
      const base  = [4.50, 4.00, 5.00, 5.50, 5.50, 5.00, 6.00, 7.00];
      const f     = Math.min(3.0, 1 / Math.max(0.35, pHome));
      const noTryP = Math.min(0.35, 0.04 + (1 - pHome) * 0.25);
      return [
        ...bands.map((lbl, i) => mk(lbl, `${homeShort} 1st Try`, +(base[i] * f).toFixed(2), `toh-${i}`, 'Time of 1st Home Try', `${game.homeTeam.name} 1st try ${lbl}`)),
        mk('No Try', homeShort, +(1.06 / noTryP).toFixed(2), 'toh-nt', 'Time of 1st Home Try', `${game.homeTeam.name} no try scored`),
      ];
    })(),

    timeOfAway: (() => {
      const bands = ['0–10 min','11–20 min','21–30 min','31–40 min','41–50 min','51–60 min','61–70 min','71–80 min'];
      const base  = [4.50, 4.00, 5.00, 5.50, 5.50, 5.00, 6.00, 7.00];
      const f     = Math.min(3.0, 1 / Math.max(0.35, pAway));
      const noTryP = Math.min(0.35, 0.04 + (1 - pAway) * 0.25);
      return [
        ...bands.map((lbl, i) => mk(lbl, `${awayShort} 1st Try`, +(base[i] * f).toFixed(2), `toa-${i}`, 'Time of 1st Away Try', `${game.awayTeam.name} 1st try ${lbl}`)),
        mk('No Try', awayShort, +(1.06 / noTryP).toFixed(2), 'toa-nt', 'Time of 1st Away Try', `${game.awayTeam.name} no try scored`),
      ];
    })(),

    /* Team name hints for use in getEstRows row labels */
    _homeShort: homeShort,
    _awayShort: awayShort,
  };
}

// Map each filter to one or more {rowLabel, items[]} groups
const EST_FILTERS = new Set(['win','handicap','match','margin','totalPoints','totalTries',
  'tryscorer','player','playerCombo','playerPoints','playerExact','mostTries',
  'firstHalf','secondHalf','firstLast','timeOf','exactMinute','exactMinuteLast',
  'timeOfTeam','doubles','earlyPayout','byo']);

function getEstRows(filter, est) {
  const E = est;
  const cfg = {
    win:          [['Win / Line', E.win]],
    handicap:     [['Handicap', E.handicap]],
    match:        [['HT/FT + Match', E.match]],
    margin:       [['Fav Margins', E.margin.slice(0,6)], ['Upset / Draw', E.margin.slice(6)]],
    totalPoints:  [['Total Points', E.totalPoints]],
    totalTries:   [['Total Tries', E.totalTries]],
    tryscorer:    [['Anytime', E.tryscorer.slice(0,4)], ['FTS / Last Try', E.tryscorer.slice(4)]],
    player:       [['Anytime', E.player.slice(0,4)], ['2+ / 3+ Tries', E.player.slice(4)]],
    playerCombo:  [['Player Combos', E.playerCombo]],
    playerPoints: [['Points O/U', E.playerPoints.slice(0,4)], ['More', E.playerPoints.slice(4,8)]],
    playerExact:  [['Exact Tries', E.playerExact.slice(0,6)], ['More', E.playerExact.slice(6)]],
    mostTries:    [['Most Tries H2H', E.mostTries]],
    firstHalf:    [['1st Half', E.firstHalf]],
    secondHalf:   [['2nd Half', E.secondHalf]],
    firstLast:    [['1st & Last to Score', E.firstLast]],
    timeOf:       [['0–40 min', E.timeOf.slice(0,4)], ['41–80 min', E.timeOf.slice(4)]],
    exactMinute:     [['Mins 1–10', E.exactMinute.slice(0,10)], ['Mins 11–20', E.exactMinute.slice(10,20)], ['Mins 21–40 + 40+', E.exactMinute.slice(20)]],
    exactMinuteLast: [['Mins 1–10', E.exactMinuteLast.slice(0,10)], ['Mins 11–20', E.exactMinuteLast.slice(10,20)], ['Mins 21–40 + 40+', E.exactMinuteLast.slice(20)]],
    timeOfTeam:      [[`${E._homeShort ?? 'Home'} 1st Try`, E.timeOfHome], [`${E._awayShort ?? 'Away'} 1st Try`, E.timeOfAway]],
    doubles:         [['Doubles Options', E.doubles]],
    earlyPayout:  [['Early Payouts', E.earlyPayout]],
    byo:          [['BYO Sportsbet', E.byo]],
  };
  return (cfg[filter] || []).filter(([, items]) => items?.length);
}

function renderGames(filter) {
  const grid = document.getElementById('gamesGrid');
  const estNotice = document.getElementById('est-notice');
  const isEst = EST_FILTERS.has(filter);
  if (estNotice) estNotice.style.display = isEst ? 'block' : 'none';

  grid.innerHTML = NRL_GAMES.map(game => {
    const est = derivedMarkets(game);

    function realOddBtn(selId, dataGame, dataType, dataTeam, dataOdd, labelHtml) {
      return `<button class="game-odd-btn"
        data-selection-id="${selId}" data-game="${dataGame}"
        data-type="${dataType}" data-team="${dataTeam}" data-odd="${dataOdd}"
        onclick="handleOddClick(this)">${labelHtml}</button>`;
    }
    function estOddBtn(r) {
      return `<button class="game-odd-btn est-btn"
        data-selection-id="${r.selId}" data-game="${game.id}"
        data-type="${r.type}" data-team="${r.team}" data-odd="${r.odd}"
        onclick="handleOddClick(this)">
        <span class="game-odd-label">${r.label}</span>
        <span class="game-odd-sublabel">${r.sublabel}</span>
        <span class="game-odd-val">$${Number(r.odd).toFixed(2)}</span>
      </button>`;
    }
    function oddRow(label, rows, isEstRow = false) {
      if (!rows?.length) return '';
      return `<div class="odds-type-row">
        <span class="odds-type-label">${label}</span>
        ${rows.map(r => isEstRow ? estOddBtn(r) : r).join('')}
      </div>`;
    }

    // Real market rows (always shown in 'all')
    const realH2H = filter === 'all' ? oddRow('H2H', [
      realOddBtn(`g${game.id}-h2h-home`, game.id, 'H2H', game.homeTeam.name, game.h2h.home,
        `<span class="game-odd-label">${game.homeTeam.name.split(' ').pop()}</span><span class="game-odd-val">$${game.h2h.home.toFixed(2)}</span>`),
      realOddBtn(`g${game.id}-h2h-away`, game.id, 'H2H', game.awayTeam.name, game.h2h.away,
        `<span class="game-odd-label">${game.awayTeam.name.split(' ').pop()}</span><span class="game-odd-val">$${game.h2h.away.toFixed(2)}</span>`),
    ]) : '';
    const realLine = filter === 'all' ? oddRow('Line', [
      realOddBtn(`g${game.id}-line-home`, game.id, 'Line', `${game.homeTeam.name} ${game.line.home.label}`, game.line.home.odd,
        `<span class="game-odd-label">${game.line.home.label}</span><span class="game-odd-val">$${game.line.home.odd.toFixed(2)}</span>`),
      realOddBtn(`g${game.id}-line-away`, game.id, 'Line', `${game.awayTeam.name} ${game.line.away.label}`, game.line.away.odd,
        `<span class="game-odd-label">${game.line.away.label}</span><span class="game-odd-val">$${game.line.away.odd.toFixed(2)}</span>`),
    ]) : '';
    const realOU = filter === 'all' ? oddRow('O/U', [
      realOddBtn(`g${game.id}-ou-over`, game.id, 'Over/Under', `Over ${game.ou.over.label}`, game.ou.over.odd,
        `<span class="game-odd-label">Ovr ${game.ou.over.label}</span><span class="game-odd-val">$${game.ou.over.odd.toFixed(2)}</span>`),
      realOddBtn(`g${game.id}-ou-under`, game.id, 'Over/Under', `Under ${game.ou.under.label}`, game.ou.under.odd,
        `<span class="game-odd-label">Und ${game.ou.under.label}</span><span class="game-odd-val">$${game.ou.under.odd.toFixed(2)}</span>`),
    ]) : '';

    // Estimated market rows
    const estRows = isEst
      ? getEstRows(filter, est).map(([label, items]) => oddRow(label, items, true)).join('')
      : '';

    // In 'all' mode, also show a sample of the top tryscorers
    const allExtra = filter === 'all' ? getEstRows('tryscorer', est).slice(0,1).map(([label, items]) => oddRow(label, items.slice(0,4), true)).join('') : '';

    return `
    <div class="game-card">
      <div class="game-header">
        <div class="game-header-left">
          <span class="game-time">⏰ ${game.time}</span>
          <span class="game-broadcaster">📍 ${game.venue} · ${game.broadcaster ?? '📺 Fox League'}</span>
        </div>
        ${game.isLive ? '<span class="game-live-badge">● LIVE</span>' : '<span class="game-upcoming-badge">UPCOMING</span>'}
      </div>
      <div class="game-teams">
        <div class="team-matchup">
          <div class="team-info">
            <div class="team-logo-wrap">${teamLogoHtml(game.homeTeam.name)}</div>
            <div class="team-name">${game.homeTeam.name}</div>
            <div class="team-record">${game.homeTeam.record}</div>
            <div class="team-meta">
              ${LADDER_POS[game.homeTeam.name] ? `<span class="team-ladder-pos">${LADDER_POS[game.homeTeam.name]}${['st','nd','rd'][LADDER_POS[game.homeTeam.name]-1]||'th'}</span>` : ''}
              <span class="team-ha team-ha--home">Home</span>
            </div>
          </div>
          <div class="match-vs">VS</div>
          <div class="team-info">
            <div class="team-logo-wrap">${teamLogoHtml(game.awayTeam.name)}</div>
            <div class="team-name">${game.awayTeam.name}</div>
            <div class="team-record">${game.awayTeam.record}</div>
            <div class="team-meta">
              ${LADDER_POS[game.awayTeam.name] ? `<span class="team-ladder-pos">${LADDER_POS[game.awayTeam.name]}${['st','nd','rd'][LADDER_POS[game.awayTeam.name]-1]||'th'}</span>` : ''}
              <span class="team-ha team-ha--away">Away</span>
            </div>
          </div>
        </div>
        <div class="game-odds">
          ${realH2H}${realLine}${realOU}${estRows}${allExtra}
        </div>
      </div>
      <a class="game-analysis-toggle" href="analysis.html?id=${game.id}" target="_blank">
        📊 Full Match Analysis ↗
      </a>
    </div>`;
  }).join('');
}

function handleOddClick(btn) {
  const selId = btn.dataset.selectionId;
  const isSelected = btn.classList.contains('selected');

  if (isSelected) {
    btn.classList.remove('selected');
    const idx = multiSelections.findIndex(s => s.id === selId);
    if (idx > -1) multiSelections.splice(idx, 1);
  } else {
    if (multiSelections.find(s => s.id === selId)) return;
    btn.classList.add('selected');
    multiSelections.push({
      id: selId,
      team: btn.dataset.team,
      type: btn.dataset.type,
      odd: parseFloat(btn.dataset.odd),
    });
    // Jump to multi tab if not already there
    const multiTab = document.querySelector('[data-tab="multi"]');
    if (!multiTab.classList.contains('active')) {
      // Briefly flash to indicate selection added
    }
  }
  updateMultiBuilder();
}


/* ── Odds Filter ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGames(btn.dataset.filter);
  });
});


/* ── Calculator ── */
function updateCalc() {
  const odds = parseFloat(document.getElementById('calcOdds').value) || 1;
  const stake = parseFloat(document.getElementById('calcStake').value) || 0;
  const ret = odds * stake;
  const profit = ret - stake;
  document.getElementById('calcReturn').textContent = '$' + ret.toFixed(2);
  document.getElementById('calcProfit').textContent = '$' + profit.toFixed(2);
  document.getElementById('calcProfit').style.color = profit > 0 ? 'var(--nrl-green-dark)' : 'var(--nrl-red)';
}

document.getElementById('calcOdds').addEventListener('input', updateCalc);
document.getElementById('calcStake').addEventListener('input', updateCalc);

function renderScenarios() {
  const el = document.getElementById('scenarios');
  el.innerHTML = SCENARIOS.map(s => `
    <div class="scenario-item">
      <div>
        <div class="scenario-odds">${s.odds.toFixed(2)}</div>
        <div class="scenario-label">${s.label}</div>
      </div>
      <div>
        <div class="scenario-return" style="text-align:right">$${(s.odds * s.stake).toFixed(2)}</div>
        <div class="scenario-label" style="text-align:right">return on $${s.stake}</div>
      </div>
    </div>
  `).join('');
}

/* ── Live Odds Loader ── */
async function loadLiveOdds() {
  try {
    const res = await fetch(`src/live-odds.json?v=${Date.now()}`);
    if (!res.ok) throw new Error('No live-odds.json');
    const data = await res.json();

    if (!data.games || !data.games.length) throw new Error('Empty games array');

    // Filter out games that kicked off more than 3 hours ago (already completed)
    const cutoff = Date.now() - 3 * 60 * 60 * 1000;
    const upcomingGames = data.games.filter(g => new Date(g.commenceTime).getTime() > cutoff);
    if (!upcomingGames.length) throw new Error('No upcoming games in odds file');

    // Transform API games → NRL_GAMES format using oddsEngine
    const liveGames = upcomingGames.map((g, i) => buildGameEntry(g, i + 1));

    // Replace global NRL_GAMES and re-render
    NRL_GAMES.length = 0;
    liveGames.forEach(g => NRL_GAMES.push(g));

    renderGames(document.querySelector('.filter-btn.active')?.dataset.filter ?? 'all');

    // Update the "last updated" badge if present
    const badge = document.getElementById('oddsUpdated');
    if (badge && data.updated) {
      const d = new Date(data.updated);
      badge.textContent = `Odds updated: ${d.toLocaleString('en-AU', { timeZone: 'Australia/Sydney', dateStyle: 'short', timeStyle: 'short' })}`;
      badge.style.display = 'inline';
    }
  } catch (e) {
    console.info('Live odds unavailable, using static data:', e.message);
  }
}

/* ── Player Photos — fetch from Wikipedia API ── */
async function loadPlayerPhotos() {
  const strip = document.querySelector('.players-strip');
  if (!strip) return;

  const cards = strip.querySelectorAll('.player-card[data-wiki]');
  const fetches = Array.from(cards).map(async card => {
    const wiki = card.dataset.wiki;
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (!res.ok) return;
      const data = await res.json();
      const url = data.thumbnail?.source;
      if (!url) return;
      const img  = card.querySelector('.player-avatar img');
      const init = card.querySelector('.avatar-init');
      if (img && init) {
        img.src = url;
        img.style.display = 'block';
        init.style.display = 'none';
      }
    } catch (_) { /* keep initials */ }
  });

  await Promise.allSettled(fetches);
}

/* ── Player Strip — seamless marquee loop ── */
function initPlayerStrip() {
  const strip = document.querySelector('.players-strip');
  if (!strip) return;
  const origCards = Array.from(strip.children);
  origCards.forEach(card => strip.appendChild(card.cloneNode(true)));
}

/* ── Player strip team logo badges ── */
function applyStripTeamLogos() {
  document.querySelectorAll('.player-card[data-team]').forEach(card => {
    const teamName = card.dataset.team;
    const logo = TEAM_LOGOS[teamName];
    const span = card.querySelector('.player-team');
    if (logo && span) {
      const shortName = span.textContent.replace(/^\S+\s/, ''); // strip emoji
      span.innerHTML = `<img src="${logo}" alt="${teamName}" class="team-logo-xs"> ${shortName}`;
    }
  });
}

/* ── Init ── */
renderScenarios();
updateCalc();
updateMultiBuilder();

// Build ladder position lookup: teamName → position (1-based)
// Populated once form data loads; used by renderGames for card display.
const LADDER_POS = {};  // e.g. { 'Penrith Panthers': 1, 'Sydney Roosters': 2, … }

// Load team logos + form data in parallel, then render everything
Promise.all([loadTeamLogos(), formDataPromise]).then(([, formData]) => {
  // Populate ladder position lookup from form data
  (formData?.ladder || []).forEach(row => { LADDER_POS[row.name] = row.pos; });

  renderGames('all');
  loadLiveOdds();
  applyStripTeamLogos();
  loadPlayerPhotos().finally(initPlayerStrip);

  /* ── Round badge ── */
  if (formData?.round) {
    const el = document.getElementById('roundBadgeLabel');
    if (el) {
      // formData.round = latest *completed* round.
      // NRL_GAMES is populated by loadLiveOdds with upcoming fixtures.
      // If there are upcoming games they belong to the next round (formData.round + 1).
      const updateBadge = () => {
        const hasUpcoming = NRL_GAMES.length > 0;
        el.textContent = hasUpcoming
          ? `Round ${formData.round + 1} — Upcoming`
          : `Round ${formData.round} — Complete`;
      };
      // Run now (live odds may already be loaded) and again after a short delay
      // to catch the case where loadLiveOdds resolves after formDataPromise.
      updateBadge();
      setTimeout(updateBadge, 1500);
    }
  }

  /* ── Ladder ── */
  const ladder = formData?.ladder;
  const round  = formData?.round;
  const body   = document.getElementById('ladderBody');
  const sub    = document.getElementById('ladderSub');

  if (!ladder?.length || !body) return;

  if (sub) sub.textContent = `Standings after Round ${round} — sourced from NRL.com`;

  body.innerHTML = ladder.map(row => {
    const pos         = row.pos;
    const zoneClass   = pos <= 4 ? 'ladder-row--top4' : pos <= 8 ? 'ladder-row--top8' : 'ladder-row--out';
    const cutoff      = pos === 8 ? 'ladder-row--cutoff' : '';
    const logoHtml    = teamLogoHtml(row.name, 28);
    const diff        = row.diff >= 0 ? `+${row.diff}` : `${row.diff}`;
    const diffClass   = row.diff >= 0 ? 'ladder-diff--pos' : 'ladder-diff--neg';
    const streakClass = row.streak.includes('W') ? 'ladder-streak--w' : 'ladder-streak--l';

    return `<tr class="ladder-row ${zoneClass} ${cutoff}">
      <td class="col-pos ladder-pos">${pos}</td>
      <td class="col-team">
        <div class="ladder-team">
          <span class="ladder-logo">${logoHtml}</span>
          <span class="ladder-name">${row.name}</span>
        </div>
      </td>
      <td class="col-num">${row.played}</td>
      <td class="col-num">${row.wins}</td>
      <td class="col-num">${row.losses}</td>
      <td class="col-num ${diffClass}">${diff}</td>
      <td class="col-pts">${row.pts}</td>
      <td class="col-streak"><span class="${streakClass}">${row.streak}</span></td>
    </tr>`;
  }).join('');
});
