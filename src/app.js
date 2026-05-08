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
function renderGames(filter) {
  const grid = document.getElementById('gamesGrid');
  grid.innerHTML = NRL_GAMES.map(game => {
    const a = game.analysis;
    return `
    <div class="game-card">
      <div class="game-header">
        <div class="game-header-left">
          <span class="game-time">⏰ ${game.time}</span>
          <span class="game-broadcaster">📍 ${game.venue} · ${game.broadcaster ?? '📺 Fox League'}</span>
        </div>
        ${game.isLive
          ? '<span class="game-live-badge">● LIVE</span>'
          : '<span class="game-upcoming-badge">UPCOMING</span>'}
      </div>
      <div class="game-teams">
        <div class="team-matchup">
          <div class="team-info">
            <div class="team-emoji">${game.homeTeam.emoji}</div>
            <div class="team-name">${game.homeTeam.name}</div>
            <div class="team-record">${game.homeTeam.record}</div>
          </div>
          <div class="match-vs">VS</div>
          <div class="team-info">
            <div class="team-emoji">${game.awayTeam.emoji}</div>
            <div class="team-name">${game.awayTeam.name}</div>
            <div class="team-record">${game.awayTeam.record}</div>
          </div>
        </div>
        <div class="game-odds">
          ${filter === 'all' || filter === 'h2h' ? `
          <div class="odds-type-row">
            <span class="odds-type-label">H2H</span>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-h2h-home"
              data-game="${game.id}" data-type="H2H" data-team="${game.homeTeam.name}" data-odd="${game.h2h.home}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">${game.homeTeam.name.split(' ').pop()}</span>
              <span class="game-odd-val">$${game.h2h.home.toFixed(2)}</span>
            </button>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-h2h-away"
              data-game="${game.id}" data-type="H2H" data-team="${game.awayTeam.name}" data-odd="${game.h2h.away}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">${game.awayTeam.name.split(' ').pop()}</span>
              <span class="game-odd-val">$${game.h2h.away.toFixed(2)}</span>
            </button>
          </div>` : ''}
          ${filter === 'all' || filter === 'line' ? `
          <div class="odds-type-row">
            <span class="odds-type-label">Line</span>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-line-home"
              data-game="${game.id}" data-type="Line" data-team="${game.homeTeam.name} ${game.line.home.label}" data-odd="${game.line.home.odd}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">${game.line.home.label}</span>
              <span class="game-odd-val">$${game.line.home.odd.toFixed(2)}</span>
            </button>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-line-away"
              data-game="${game.id}" data-type="Line" data-team="${game.awayTeam.name} ${game.line.away.label}" data-odd="${game.line.away.odd}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">${game.line.away.label}</span>
              <span class="game-odd-val">$${game.line.away.odd.toFixed(2)}</span>
            </button>
          </div>` : ''}
          ${filter === 'all' || filter === 'ou' ? `
          <div class="odds-type-row">
            <span class="odds-type-label">O/U</span>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-ou-over"
              data-game="${game.id}" data-type="Over/Under" data-team="Over ${game.ou.over.label}" data-odd="${game.ou.over.odd}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">Ovr ${game.ou.over.label}</span>
              <span class="game-odd-val">$${game.ou.over.odd.toFixed(2)}</span>
            </button>
            <button class="game-odd-btn"
              data-selection-id="g${game.id}-ou-under"
              data-game="${game.id}" data-type="Over/Under" data-team="Under ${game.ou.under.label}" data-odd="${game.ou.under.odd}"
              onclick="handleOddClick(this)">
              <span class="game-odd-label">Und ${game.ou.under.label}</span>
              <span class="game-odd-val">$${game.ou.under.odd.toFixed(2)}</span>
            </button>
          </div>` : ''}
        </div>
      </div>
      <button class="game-analysis-toggle" onclick="toggleAnalysis(${game.id})">
        📊 Show Analysis ▾
      </button>
      <div class="game-analysis-panel" id="analysis-${game.id}">
        <div class="analysis-row">
          <span>Favourite</span>
          <strong>${a.favourite} (${a.confidenceLevel} confidence)</strong>
        </div>
        <div class="analysis-row">
          <span>${game.homeTeam.name} last 5</span>
          <strong>${a.homeFormLast5}</strong>
        </div>
        <div class="analysis-row">
          <span>${game.awayTeam.name} last 5</span>
          <strong>${a.awayFormLast5}</strong>
        </div>
        <div class="analysis-row">
          <span>Weather</span>
          <strong>${a.weatherForecast}</strong>
        </div>
        <div class="analysis-row">
          <span>Margins</span>
          <strong>${a.avgMargin}</strong>
        </div>
        <div class="analysis-row">
          <span>Key Factor</span>
          <strong style="text-align:right;max-width:60%">${a.keyFactor}</strong>
        </div>
        <div class="analysis-rec">💡 ${a.recommendation}</div>
      </div>
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

function toggleAnalysis(gameId) {
  const panel = document.getElementById('analysis-' + gameId);
  const btn = panel.previousElementSibling;
  panel.classList.toggle('open');
  btn.textContent = panel.classList.contains('open')
    ? '📊 Hide Analysis ▴'
    : '📊 Show Analysis ▾';
}

/* ── Odds Filter ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGames(btn.dataset.filter);
  });
});

/* ── Analysis Tool ── */
document.getElementById('analyseBtn').addEventListener('click', runAnalysis);

function runAnalysis() {
  const odds = parseFloat(document.getElementById('anaOdds').value);
  const stake = parseFloat(document.getElementById('anaStake').value);
  const yourProb = parseFloat(document.getElementById('anaProb').value) / 100;

  if (isNaN(odds) || isNaN(stake) || isNaN(yourProb) || odds < 1.01) return;

  const impliedProb = 1 / odds;
  const potReturn = odds * stake;
  const profit = potReturn - stake;
  const ev = (yourProb * profit) - ((1 - yourProb) * stake);

  document.getElementById('anaImplied').textContent = (impliedProb * 100).toFixed(1) + '%';
  document.getElementById('anaYours').textContent = (yourProb * 100).toFixed(0) + '%';
  document.getElementById('anaReturn').textContent = '$' + potReturn.toFixed(2);
  document.getElementById('anaEV').textContent = (ev >= 0 ? '+' : '') + '$' + ev.toFixed(2);

  const evBox = document.getElementById('anaEVBox');
  const verdict = document.getElementById('anaVerdict');

  if (ev > 0) {
    evBox.querySelector('.result-val').style.color = 'var(--nrl-green-dark)';
    verdict.className = 'verdict-box positive';
    verdict.innerHTML = `✅ <strong>Positive Expected Value (+EV).</strong> Your estimated probability (${(yourProb*100).toFixed(0)}%) is higher than the bookmaker's implied probability (${(impliedProb*100).toFixed(1)}%). This bet has mathematical edge — it's a value bet. Still doesn't guarantee winning any single bet, but this is the type of thinking professional bettors use.`;
  } else if (ev < -stake * 0.1) {
    evBox.querySelector('.result-val').style.color = 'var(--nrl-red)';
    verdict.className = 'verdict-box negative';
    verdict.innerHTML = `⚠️ <strong>Negative Expected Value (–EV).</strong> The bookmaker's implied probability (${(impliedProb*100).toFixed(1)}%) is significantly higher than your estimate (${(yourProb*100).toFixed(0)}%). Over many bets like this, you'd expect to lose money. Consider whether your estimate is realistic — or look for a better price.`;
  } else {
    evBox.querySelector('.result-val').style.color = '#854d0e';
    verdict.className = 'verdict-box neutral';
    verdict.innerHTML = `⚖️ <strong>Near break-even.</strong> Your estimate (${(yourProb*100).toFixed(0)}%) is close to the bookmaker's implied probability (${(impliedProb*100).toFixed(1)}%). This isn't a strong edge either way. This bet is roughly fair-priced — whether it's worth placing depends on your confidence in your estimate.`;
  }
}

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

    // Transform API games → NRL_GAMES format using oddsEngine
    const liveGames = data.games.map((g, i) => buildGameEntry(g, i + 1));

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

/* ── Player Strip — seamless marquee loop ── */
(function initPlayerStrip() {
  const strip = document.querySelector('.players-strip');
  if (!strip) return;
  // Clone all children and append so strip is 2× wide for infinite scroll
  const origCards = Array.from(strip.children);
  origCards.forEach(card => strip.appendChild(card.cloneNode(true)));
})();

/* ── Init ── */
renderGames('all');
renderScenarios();
updateCalc();
updateMultiBuilder();
loadLiveOdds();
