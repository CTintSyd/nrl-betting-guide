const BET_TYPES = {
  h2h: {
    icon: '🏆', name: 'Head to Head', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Pick who wins. Simple as that.',
    desc: 'A head-to-head (H2H) bet is the most straightforward NRL bet. You simply pick which team will win the match. If your team wins, you win. If they lose or draw, you lose. No margin to worry about — just the result.',
    example: 'You bet <strong>$10 on Brisbane Broncos</strong> at odds of <strong>$2.10</strong>. Brisbane wins 24–18. You collect <strong>$21.00</strong> (profit: $11.00).',
    tips: [
      { icon: '✅', title: 'Best for beginners', body: 'Easy to understand, one decision to make.' },
      { icon: '📊', title: 'Check team form', body: 'Last 5 games, injuries, and home/away record are the key factors.' },
      { icon: '💡', title: 'Value vs favourite', body: 'Favourites win most, but short odds ($1.30–$1.50) barely reward the risk.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Brisbane Broncos</span><span class="vs">vs</span><span>Melbourne Storm</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Broncos</span><span class="odd-val">$2.10</span></div>
          <div class="odd-btn"><span class="odd-team">Storm</span><span class="odd-val">$1.75</span></div>
        </div>
        <div class="odds-note">Storm are favourites. Broncos offer more value as underdogs.</div>
      </div>
      <div class="implied-prob">
        <div class="prob-label">Implied Probability</div>
        <div class="prob-bar-wrap">
          <div class="prob-bar" style="width:48%">Broncos 48%</div>
          <div class="prob-bar prob-bar--alt" style="width:57%">Storm 57%</div>
        </div>
        <div class="prob-note">Bookmakers build in a margin (~5%), so probabilities sum to &gt;100%.</div>
      </div>`,
  },

  line: {
    icon: '📏', name: 'Line Betting (Handicap)', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Level the playing field with a points handicap.',
    desc: 'Line betting gives the underdog a head start in points. The bookmaker sets a "line" — e.g. Melbourne –8.5. To win a bet on Melbourne, they must win by 9+ points. Back the Broncos +8.5 and they can lose by up to 8 and you still win.',
    example: 'Line: <strong>Melbourne –8.5</strong>. Final score: Melbourne 22 – Brisbane 16 (Storm win by 6). Storm win the game but <strong>don\'t cover the line</strong>. Brisbane +8.5 bet wins.',
    tips: [
      { icon: '🎯', title: 'Closer to even odds', body: 'Both sides usually sit around $1.90, making it feel fairer.' },
      { icon: '🔍', title: 'Watch team matchups', body: 'Does the top team consistently win by big margins? Check their average margin of victory.' },
      { icon: '⚠️', title: 'Half-point matters', body: 'Lines like –8.5 mean no "push" — a win by exactly 9 still cashes the bet cleanly.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Brisbane Broncos</span></div>
        <div class="odds-row">
          <div class="odd-btn"><span class="odd-team">Storm –8.5</span><span class="odd-val">$1.90</span></div>
          <div class="odd-btn active-pick"><span class="odd-team">Broncos +8.5</span><span class="odd-val">$1.90</span></div>
        </div>
        <div class="odds-note">Storm must win by 9+ for their line bet to win.</div>
      </div>
      <div class="implied-prob">
        <div class="prob-label">Historical Cover Rate — Storm as Favourites</div>
        <div class="stat-grid">
          <div class="mini-stat"><span>68%</span><small>Win rate</small></div>
          <div class="mini-stat"><span>51%</span><small>Cover –8.5</small></div>
          <div class="mini-stat"><span>14.2</span><small>Avg margin</small></div>
        </div>
      </div>`,
  },

  margin: {
    icon: '🔢', name: 'Winning Margin', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Pick the winning team AND how much they win by.',
    desc: 'Margin bets ask you to predict the winning margin within bands (e.g. 1–12 points, 13–24 points). Because you need to be accurate on two things — the winner <em>and</em> the margin — odds are much higher. Think of it as a step up from H2H.',
    example: 'You bet <strong>Melbourne Storm to win by 1–12 points</strong> at <strong>$3.50</strong>. Storm wins 18–10 (margin: 8). Your bet <strong>wins</strong>.',
    tips: [
      { icon: '📉', title: 'Tighter margins are most common', body: 'Over 55% of NRL games are decided by 12 points or fewer.' },
      { icon: '💪', title: 'Only for confident picks', body: 'Margin betting makes sense when you\'re already very confident in the winner — it just boosts your return.' },
      { icon: '📊', title: 'Check average margin', body: 'Each team has a typical winning margin — compare it against the band you\'re backing.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Warriors</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Storm wins by</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>1–12 pts</span><span>$3.20</span></div>
          <div class="margin-row"><span>13–24 pts</span><span>$4.00</span></div>
          <div class="margin-row"><span>25+ pts</span><span>$5.50</span></div>
          <div class="margin-row separator"><span>Warriors wins by</span></div>
          <div class="margin-row"><span>1–12 pts</span><span>$8.00</span></div>
          <div class="margin-row"><span>13–24 pts</span><span>$15.00</span></div>
          <div class="margin-row"><span>25+ pts</span><span>$25.00</span></div>
        </div>
      </div>`,
  },

  halftime: {
    icon: '⏱️', name: 'Half-Time / Full-Time', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Predict the leader at half-time AND at full-time.',
    desc: 'You pick which team leads at half-time <em>and</em> who wins at full-time. The most common combination is "Team A / Team A" — they lead at the break and go on to win. Value comes from riskier combos like comeback wins.',
    example: 'You bet <strong>Panthers / Panthers</strong> (leads at half, wins match) at <strong>$2.20</strong>. Panthers lead 16–6 at half, win 28–14. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '💡', title: 'Home teams start faster', body: 'Home sides tend to be more motivated early — factor this into your half-time pick.' },
      { icon: '🔄', title: 'Value in comebacks', body: 'If a big team often trails at half but wins — the "Away / Away" combo can be excellent value.' },
      { icon: '📌', title: 'Draw at half is underrated', body: '"Draw / [Winner]" combinations often have inflated odds — check if the game is likely to be tight early.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Canberra Raiders</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Result</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Panthers / Panthers</span><span>$2.20</span></div>
          <div class="margin-row"><span>Raiders / Raiders</span><span>$7.00</span></div>
          <div class="margin-row"><span>Draw / Panthers</span><span>$9.50</span></div>
          <div class="margin-row"><span>Raiders / Panthers</span><span>$15.00</span></div>
          <div class="margin-row"><span>Panthers / Raiders</span><span>$18.00</span></div>
          <div class="margin-row"><span>Draw / Raiders</span><span>$22.00</span></div>
        </div>
      </div>`,
  },

  ou: {
    icon: '📈', name: 'Over / Under (Totals)', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Bet on total points scored — not who wins.',
    desc: 'Instead of picking a winner, you bet on whether the total combined points scored will go <strong>over</strong> or <strong>under</strong> a set number. It doesn\'t matter who wins — you just need the final score to land on the right side of the line.',
    example: 'Total line: <strong>44.5 points</strong>. You bet <strong>Over</strong>. Final score: Roosters 28, Cowboys 22 = <strong>50 total points</strong>. Your Over bet <strong>wins</strong>.',
    tips: [
      { icon: '🌧️', title: 'Weather matters', body: 'Rain and wind suppress scoring — check the forecast when picking Over/Under.' },
      { icon: '🏟️', title: 'Venue history', body: 'Some grounds produce high-scoring games; others favour defence. Check the stats.' },
      { icon: '💊', title: 'Key attackers injured?', body: 'A missing halfback or first-choice centre can significantly reduce a team\'s scoring output.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Sydney Roosters</span><span class="vs">vs</span><span>Cowboys</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Over 44.5</span><span class="odd-val">$1.87</span></div>
          <div class="odd-btn"><span class="odd-team">Under 44.5</span><span class="odd-val">$1.93</span></div>
        </div>
        <div class="odds-note">Under is slightly favoured — bookmaker expects a tighter game.</div>
      </div>
      <div class="implied-prob">
        <div class="prob-label">Scoring Context</div>
        <div class="stat-grid">
          <div class="mini-stat"><span>46.2</span><small>Roosters avg pts/game</small></div>
          <div class="mini-stat"><span>38.4</span><small>Cowboys avg pts/game</small></div>
          <div class="mini-stat"><span>42.3</span><small>NRL season avg</small></div>
        </div>
      </div>`,
  },

  teamtotal: {
    icon: '🎯', name: 'Team Total Points', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Bet on just one team\'s scoring — not the combined total.',
    desc: 'Instead of predicting the combined score, you bet on whether a <em>single team</em> will score over or under a set number of points. This is useful when you have a strong view on one team\'s attack or defence, without needing to predict the whole game.',
    example: 'Line: <strong>Penrith Panthers Over 22.5 points</strong> at <strong>$1.85</strong>. Panthers win 30–16 — they scored 30 points, which is over 22.5. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🔍', title: 'Defence of the opponent', body: 'A weak defensive side facing a strong attack? Back the Over. Tight defence? Consider the Under.' },
      { icon: '🏡', title: 'Home vs away scoring', body: 'Most NRL teams score 20–30% more at home. Check the split before picking.' },
      { icon: '💡', title: 'Combine with H2H', body: 'Backing a team to win AND their Team Total Over adds value without a full multi.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Panthers Team Total</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Over 22.5 pts</span><span>$1.85</span></div>
          <div class="margin-row"><span>Under 22.5 pts</span><span>$1.95</span></div>
          <div class="margin-row separator"><span>Sharks Team Total</span></div>
          <div class="margin-row"><span>Over 16.5 pts</span><span>$1.90</span></div>
          <div class="margin-row"><span>Under 16.5 pts</span><span>$1.90</span></div>
        </div>
      </div>`,
  },

  tries: {
    icon: '✋', name: 'Total Tries Over/Under', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Bet on how many tries are scored — not total points.',
    desc: 'Similar to the points Over/Under but focused on the number of tries crossed in the match. An average NRL game sees 5–6 tries. This is a popular market for punters who follow NRL defence and attack patterns closely — a try is worth 6 points, so a high-scoring game doesn\'t always mean lots of tries (conversions and penalty goals count too).',
    example: 'Line: <strong>Over 5.5 tries</strong> at <strong>$1.88</strong>. The game ends Roosters 28, Cowboys 20 with 7 combined tries. Your Over bet <strong>wins</strong>.',
    tips: [
      { icon: '📊', title: 'NRL average is ~5.5 tries', body: 'Most markets sit between 5.5 and 6.5. Know where the season average sits.' },
      { icon: '🧱', title: 'Strong defences suppress tries', body: 'Matches involving top-4 defensive sides often go under. Check points allowed per game.' },
      { icon: '⚡', title: 'Attacking teams like Broncos, Roosters', body: 'Fast-playing, attack-minded clubs tend to push games over 6 tries.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Brisbane Broncos</span><span class="vs">vs</span><span>Sydney Roosters</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Over 5.5 tries</span><span class="odd-val">$1.88</span></div>
          <div class="odd-btn"><span class="odd-team">Under 5.5 tries</span><span class="odd-val">$1.92</span></div>
        </div>
        <div class="odds-note">Both teams average 3+ tries per game — Over looks solid.</div>
      </div>
      <div class="implied-prob">
        <div class="prob-label">Context</div>
        <div class="stat-grid">
          <div class="mini-stat"><span>3.2</span><small>Broncos tries/game</small></div>
          <div class="mini-stat"><span>3.1</span><small>Roosters tries/game</small></div>
          <div class="mini-stat"><span>5.5</span><small>NRL avg tries/game</small></div>
        </div>
      </div>`,
  },

  race: {
    icon: '🏎️', name: 'Race to 10 Points', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Which team will score 10 points first?',
    desc: 'The Race to 10 Points market asks you to pick which team will be first to reach a points milestone — usually 10 points, though some bookmakers also offer Race to 6, 14, or 20. If neither team reaches 10 (very rare), bets are refunded. This is a popular live betting and pre-game market.',
    example: '<strong>Storm to reach 10 points first</strong> at <strong>$1.65</strong>. Storm score a try + conversion (6 pts) and a penalty goal (2 pts) in the first 15 minutes, then another penalty goal to reach 10. Bet <strong>wins</strong>.',
    tips: [
      { icon: '🚀', title: 'Fast-starting teams dominate', body: 'Some teams consistently score first and fast — check first-half scoring averages.' },
      { icon: '🏠', title: 'Home advantage is huge here', body: 'Home teams score first in roughly 55% of NRL games. Factor that in.' },
      { icon: '⚡', title: 'Great as part of a multi', body: 'Race to 10 at $1.65 combined with an H2H pick can build solid multi odds with good logic.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Brisbane Broncos</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Storm first to 10</span><span class="odd-val">$1.65</span></div>
          <div class="odd-btn"><span class="odd-team">Broncos first to 10</span><span class="odd-val">$2.25</span></div>
        </div>
        <div class="odds-note">Storm are strong early scorers — $1.65 reflects their attacking consistency.</div>
      </div>`,
  },

  fts: {
    icon: '⚡', name: 'First Try Scorer', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Predict who scores the very first try of the match.',
    desc: 'You\'re betting on which player will score the <strong>first try</strong> in the match. With 34+ players eligible, odds are naturally high — wingers and centres often get the best value. Even the "favourite" for first try rarely hits more than 15–20% of the time.',
    example: 'You bet <strong>$10 on Alex Johnston (First Try Scorer)</strong> at <strong>$8.00</strong>. He barrels over in the 12th minute. You collect <strong>$80.00</strong> — a $70 profit.',
    tips: [
      { icon: '🏃', title: 'Back the wingers', body: 'Wingers score the most tries in NRL — target players with high average try-per-game rates.' },
      { icon: '📍', title: 'Team attack patterns', body: 'Does their team tend to set up wide early? A high first-half scoring rate helps your pick.' },
      { icon: '🎲', title: 'Variance is real', body: 'Even the top scorers hit at ~15–20%. Keep stakes small — this is a fun, punting bet.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>South Sydney Rabbitohs</span><span class="vs">vs</span><span>Parramatta Eels</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Alex Johnston <small>Winger</small></span><span class="fts-odd">$6.50</span></div>
          <div class="fts-item"><span class="fts-name">Latrell Mitchell <small>Centre</small></span><span class="fts-odd">$8.00</span></div>
          <div class="fts-item"><span class="fts-name">Waqa Blake <small>Winger</small></span><span class="fts-odd">$8.50</span></div>
          <div class="fts-item"><span class="fts-name">Cody Walker <small>Halfback</small></span><span class="fts-odd">$12.00</span></div>
          <div class="fts-item"><span class="fts-name">Reagan C-Gillard <small>Prop</small></span><span class="fts-odd">$19.00</span></div>
        </div>
        <div class="odds-note">Best value pick highlighted — consider recent try-scoring form.</div>
      </div>`,
  },

  lts: {
    icon: '🔚', name: 'Last Try Scorer', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Predict who scores the very last try of the match.',
    desc: 'The Last Try Scorer market is similar to First Try Scorer, but you\'re predicting who crosses the line last. Late tries often come from interchange forwards, wingers finishing off pressure, or utility players — making this harder to predict, but odds are usually higher as a result.',
    example: 'You bet <strong>$15 on Liam Martin (Last Try Scorer)</strong> at <strong>$11.00</strong>. He barges over in the 76th minute. You collect <strong>$165.00</strong> — a $150 profit.',
    tips: [
      { icon: '🔁', title: 'Interchange players score late', body: 'Prop forwards coming off the bench often get dummy-half tries in the final 15 minutes when teams are chasing.' },
      { icon: '⏰', title: 'In-form finishers', body: 'Wingers with strong late-game involvement and high try-per-game rates are good bets even for LTS.' },
      { icon: '💡', title: 'The winning team scores last more often', body: 'Trailing teams sometimes score late consolation tries, but the winning side scores last ~60% of the time.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Brian To'o <small>Winger — often finishes well</small></span><span class="fts-odd">$7.50</span></div>
          <div class="fts-item"><span class="fts-name">Liam Martin <small>Back Row</small></span><span class="fts-odd">$11.00</span></div>
          <div class="fts-item"><span class="fts-name">Taylan May <small>Centre</small></span><span class="fts-odd">$9.00</span></div>
          <div class="fts-item"><span class="fts-name">Moses Leota <small>Prop (interchange)</small></span><span class="fts-odd">$21.00</span></div>
        </div>
        <div class="odds-note">Last try scorers are harder to predict — keep stakes small.</div>
      </div>`,
  },

  anytime: {
    icon: '🌟', name: '1+ Try Scorer (Anytime)', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Your player just needs to score at any point.',
    desc: 'Unlike First Try Scorer, the <strong>Anytime Try Scorer</strong> bet wins as long as your chosen player scores a try at <em>any point</em> in the match. This significantly boosts your hit rate — a prolific winger who scores 0.8 tries per game has a roughly 80% shot per match.',
    example: 'You back <strong>Brian To\'o (Anytime Try Scorer)</strong> at <strong>$2.40</strong>. He scores in the 68th minute. Your $20 bet returns <strong>$48</strong>.',
    tips: [
      { icon: '📈', title: 'Try-per-game rate is key', body: 'Look for players scoring 0.7+ tries per game — that\'s roughly a 70% hit rate each match.' },
      { icon: '🔄', title: 'Pair with H2H', body: 'Backing a try scorer from the team you think will win gives both bets a higher chance of landing.' },
      { icon: '📋', title: 'Last 5 is everything', body: 'In-form players carry momentum. A winger who\'s scored in 4 of the last 5 is worth backing.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Brian To'o <small>0.82 tries/game</small></span><span class="fts-odd">$2.40</span></div>
          <div class="fts-item"><span class="fts-name">Taylan May <small>0.65 tries/game</small></span><span class="fts-odd">$2.80</span></div>
          <div class="fts-item"><span class="fts-name">Ronaldo Mulitalo <small>0.71 tries/game</small></span><span class="fts-odd">$3.10</span></div>
          <div class="fts-item"><span class="fts-name">Nicho Hynes <small>0.38 tries/game</small></span><span class="fts-odd">$5.00</span></div>
        </div>
        <div class="odds-note">Try rate shown helps estimate true probability vs bookmaker's implied odds.</div>
      </div>`,
  },

  twoplus: {
    icon: '✌️', name: '2+ Tries (Player to Score 2 or More)', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Back a player to score twice or more in the one match.',
    desc: 'This market asks you to predict a player who will score <strong>at least two tries</strong> in a single match. It\'s harder to hit than Anytime Try Scorer, but offers significantly better odds. Prolific wingers in favourable matchups — especially vs weak defensive edges — are the best targets.',
    example: 'You back <strong>Alex Johnston to score 2+ tries</strong> at <strong>$4.50</strong>. Johnston scores in the 18th and 54th minutes. Your $10 bet returns <strong>$45.00</strong>.',
    tips: [
      { icon: '⚔️', title: 'Target weak defensive edges', body: 'If the opposing winger\'s direct defensive matchup is poor or injured, your pick gets more ball.' },
      { icon: '📊', title: 'Check their 2-try game history', body: 'Some wingers score 2+ tries in 20–25% of games they play. That\'s enough to make $4.00+ odds valuable.' },
      { icon: '🔝', title: 'Only in lopsided matchups', body: 'A dominant team playing a weak defensive side is the sweet spot for this bet.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>South Sydney Rabbitohs</span><span class="vs">vs</span><span>Gold Coast Titans</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Alex Johnston <small>2-try game rate: 23%</small></span><span class="fts-odd">$4.50</span></div>
          <div class="fts-item"><span class="fts-name">Latrell Mitchell <small>2-try game rate: 18%</small></span><span class="fts-odd">$5.50</span></div>
          <div class="fts-item"><span class="fts-name">Campbell Graham <small>2-try game rate: 15%</small></span><span class="fts-odd">$6.00</span></div>
        </div>
        <div class="odds-note">Rabbitohs face Titans' porous edge defence — good spot for multi-try scorers.</div>
      </div>`,
  },

  scorecast: {
    icon: '🎪', name: 'Scorecast', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Combine first try scorer + match winner in one bet.',
    desc: 'A Scorecast combines two predictions into a single bet: <strong>which player scores the first try</strong> AND <strong>which team wins the match</strong>. Because both need to be correct, the odds multiply — giving you much bigger potential returns than either bet alone. It\'s a popular "fun" bet for bigger matches.',
    example: 'You bet <strong>Alex Johnston First Try Scorer + Rabbitohs to win</strong> at <strong>$28.00</strong>. Johnston scores first, Rabbitohs win 24–12. Your $5 bet returns <strong>$140.00</strong>.',
    tips: [
      { icon: '🧠', title: 'Back a scorer from the favoured team', body: 'The winning team scores first ~55% of the time — the best scorecast picks combine a top scorer from the favourite.' },
      { icon: '💰', title: 'Small stakes, big returns', body: 'Even $2–$5 on a $25–$40 scorecast is exciting. Don\'t over-invest — variance is very high.' },
      { icon: '🎯', title: 'Better than a multi?', body: 'Scorecasts are often priced more generously than a straight FTS + H2H multi — compare both before picking.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>South Sydney Rabbitohs</span><span class="vs">vs</span><span>Parramatta Eels</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Alex Johnston FTS + Rabbitohs Win</span><span class="fts-odd">$28.00</span></div>
          <div class="fts-item"><span class="fts-name">Latrell Mitchell FTS + Rabbitohs Win</span><span class="fts-odd">$34.00</span></div>
          <div class="fts-item"><span class="fts-name">Waqa Blake FTS + Eels Win</span><span class="fts-odd">$45.00</span></div>
          <div class="fts-item"><span class="fts-name">Bailey Simonsson FTS + Eels Win</span><span class="fts-odd">$55.00</span></div>
        </div>
        <div class="odds-note">Scorecast odds = approx. FTS odds × H2H odds — compare to a manual multi.</div>
      </div>`,
  },

  firsthalf: {
    icon: '1️⃣', name: 'First Half Markets', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on just the first 40 minutes.',
    desc: 'First Half markets let you bet on the outcome of <em>only the first half</em> of the game. This includes First Half H2H (who leads at half-time), First Half Line Betting, and First Half Over/Under. These markets are great when you have a strong read on how a game will start but aren\'t sure how it will finish.',
    example: 'You bet <strong>First Half Over 22.5 points</strong> at <strong>$1.88</strong>. The half-time score is Broncos 18, Storm 8 (total: 26). Your Over bet <strong>wins</strong> — regardless of what happens in the second half.',
    tips: [
      { icon: '⚡', title: 'Fast-starting teams', body: 'Identify teams that score heavily in the first half and back the Over in their games.' },
      { icon: '🏠', title: 'Home advantage is stronger early', body: 'Home sides are more energised in the first 40 — factor this into first half H2H picks.' },
      { icon: '📏', title: 'First Half Line differs from match line', body: 'First half lines are usually smaller than full-game lines — a team might be –4.5 for the half but –8.5 for the full game.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Brisbane Broncos</span><span class="vs">vs</span><span>Melbourne Storm</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>1H H2H: Storm</span><span>$1.80</span></div>
          <div class="margin-row"><span>1H H2H: Broncos</span><span>$2.05</span></div>
          <div class="margin-row separator"><span>First Half Line</span></div>
          <div class="margin-row"><span>Storm –4.5</span><span>$1.90</span></div>
          <div class="margin-row"><span>Broncos +4.5</span><span>$1.90</span></div>
          <div class="margin-row separator"><span>First Half O/U</span></div>
          <div class="margin-row"><span>Over 22.5</span><span>$1.88</span></div>
          <div class="margin-row"><span>Under 22.5</span><span>$1.92</span></div>
        </div>
      </div>`,
  },

  secondhalf: {
    icon: '2️⃣', name: 'Second Half Markets', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on just the final 40 minutes.',
    desc: 'Second Half markets let you bet on outcomes from the second 40 minutes only. This includes Second Half H2H (who outscores the other team in the second half), Second Half Line, and Second Half Over/Under. These markets are popular for live betting adjustments and for punters who watch first halves before deciding.',
    example: 'A game is tied 10–10 at half-time. You bet <strong>Second Half: Panthers</strong> to score more in the second half at <strong>$1.90</strong>. Panthers dominate the second half 20–6. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🔄', title: 'Teams that start slow but finish strong', body: 'Some coaches are known for strong second-half game plans — identify them and use 2H markets.' },
      { icon: '🏋️', title: 'Fitness and bench depth matter', body: 'Teams with superior bench depth often dominate late in games. Watch interchange usage trends.' },
      { icon: '📊', title: 'Second half totals are lower', body: 'Second half O/U lines are typically lower than first half — fatigue and defensive adjustments reduce scoring.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>2H H2H: Panthers</span><span>$1.75</span></div>
          <div class="margin-row"><span>2H H2H: Sharks</span><span>$2.10</span></div>
          <div class="margin-row separator"><span>Second Half O/U</span></div>
          <div class="margin-row"><span>Over 18.5</span><span>$1.90</span></div>
          <div class="margin-row"><span>Under 18.5</span><span>$1.90</span></div>
        </div>
      </div>`,
  },

  multi: {
    icon: '🎰', name: 'Multi Bets (Parlays)', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Combine bets across games for bigger returns — all must win.',
    desc: 'A multi combines 2 or more individual bets. Your odds multiply together — but <strong>every leg must win</strong> for the multi to pay out. One loss and the whole ticket loses. The upside: you can turn small stakes into big payouts with a run of correct picks.',
    example: 'You pick <strong>3 teams to win</strong> (Broncos $2.10, Storm $1.75, Roosters $1.90). Combined odds: <strong>$6.97</strong>. A $10 multi returns <strong>$69.70</strong> — if all three win.',
    tips: [
      { icon: '⚠️', title: 'Risk compounds fast', body: '3 bets at 50% each = just 12.5% chance the multi wins. Fun, but never your main strategy.' },
      { icon: '🎯', title: 'Stick to 2–3 legs', body: 'Beginners should keep multis to 2 or 3 legs max. Every extra leg drastically cuts your win chance.' },
      { icon: '💰', title: 'Small stakes only', body: 'Treat multis as entertainment — allocate a fixed small amount (e.g., $5–$10) per multi.' },
    ],
    oddsHtml: `
      <div class="multi-builder" id="multiBuilder">
        <div class="multi-header">
          <span>🎰 Multi Builder</span>
          <span class="multi-count" id="multiCount">0 legs</span>
        </div>
        <div class="multi-legs" id="multiLegs">
          <div class="multi-empty">Click any odds button in the Live Odds section below to add legs.</div>
        </div>
        <div class="multi-result">
          <div class="multi-row"><span>Combined Odds</span><span id="multiOdds">—</span></div>
          <div class="multi-row"><span>$10 stake returns</span><span id="multiReturn">—</span></div>
          <div class="multi-row"><span>Est. win chance</span><span id="multiChance">—</span></div>
        </div>
      </div>`,
  },

  sgm: {
    icon: '🔗', name: 'Same Game Multi (SGM)', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Combine multiple picks from the one game into a single bet.',
    desc: 'A Same Game Multi (SGM) lets you combine multiple selections from a <em>single NRL game</em> — for example: Panthers to win + Brian To\'o to score anytime + Over 44.5 total points. Because these outcomes are correlated (they come from the same game), the odds are usually adjusted by the bookmaker and may be lower than a standard multi.',
    example: 'You create an SGM: <strong>Panthers Win + To\'o Anytime Try + Over 44.5</strong>. Individual odds: $1.40 × $2.40 × $1.87 = approx $6.28, but the SGM price offered is <strong>$5.50</strong> after correlation adjustment. Your $10 bet returns <strong>$55.00</strong>.',
    tips: [
      { icon: '🔗', title: 'Correlated picks work best', body: 'If you back a dominant team to win AND their winger to score, both outcomes naturally go hand-in-hand.' },
      { icon: '📉', title: 'Odds are usually cut', body: 'Bookmakers reduce SGM odds to account for correlations. Check if the same picks as a regular multi pay more.' },
      { icon: '🎯', title: 'Limit to 2–3 legs', body: 'An SGM with 5+ legs is very unlikely to win. Keep it tight and logical.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Panthers Win + To'o Try + Over 44.5<small>3-leg SGM</small></span><span class="fts-odd">$5.50</span></div>
          <div class="fts-item"><span class="fts-name">Panthers –11.5 + To'o Try<small>2-leg SGM</small></span><span class="fts-odd">$3.80</span></div>
          <div class="fts-item"><span class="fts-name">Panthers Win + Under 50.5<small>2-leg SGM</small></span><span class="fts-odd">$2.40</span></div>
        </div>
        <div class="odds-note">Compare SGM price to equivalent regular multi before placing.</div>
      </div>`,
  },

  props: {
    icon: '📋', name: 'Player Props', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on individual player statistics like metres, tackles, or runs.',
    desc: 'Player Props (or Player Specials) let you bet on specific statistical achievements by individual players — not just try scoring. Markets include metres run, tackles made, number of runs, linebreaks, and more. These require detailed knowledge of player roles and matchup data but can offer great value.',
    example: 'You bet <strong>Tom Dearden Over 40.5 tackles</strong> at <strong>$1.85</strong>. Dearden finishes with 44 tackles in an end-to-end game. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🔍', title: 'Know the player\'s role', body: 'A lock forward makes 30–50 tackles per game; a winger might make 5–10. Match the prop to the position.' },
      { icon: '📊', title: 'Check their last 5 averages', body: 'Player stats are consistent week to week — use form guides to find players trending above or below their lines.' },
      { icon: '🌧️', title: 'Game style affects stats', body: 'High-scoring open games mean more metres and runs. Defence-heavy games inflate tackle counts.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Brisbane Broncos</span><span class="vs">vs</span><span>Melbourne Storm</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Player Prop Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Payne Haas Over 130.5 metres</span><span>$1.88</span></div>
          <div class="margin-row"><span>Adam Reynolds Over 2.5 try assists</span><span>$2.10</span></div>
          <div class="margin-row"><span>Reece Walsh Over 155.5 metres</span><span>$1.92</span></div>
          <div class="margin-row"><span>Harry Grant Over 45.5 tackles</span><span>$1.85</span></div>
          <div class="margin-row"><span>Cameron Munster 1+ linebreaks</span><span>$2.30</span></div>
        </div>
      </div>`,
  },

  threeplus: {
    icon: '3️⃣', name: '3+ Try Scorer', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Back a player to score a hat-trick — three or more tries.',
    desc: 'The 3+ Try Scorer market asks you to predict a player who will score <strong>three or more tries</strong> in a single match. This is rare — it happens in roughly 3–7% of games — but the odds are substantial. Target prolific wingers in heavily mismatched games where one team is expected to dominate.',
    example: 'You back <strong>Alex Johnston to score 3+ tries</strong> at <strong>$12.00</strong>. He bags a hat-trick in a Rabbitohs blowout. Your $5 bet returns <strong>$60.00</strong>.',
    tips: [
      { icon: '📊', title: 'Hat-tricks are rare', body: 'Even the best NRL wingers only score 3+ tries in about 5% of games. Treat this as a "fun" bet with a small stake.' },
      { icon: '🔝', title: 'Only in big mismatches', body: 'A dominant top-4 team hosting the Wooden Spoon side is the ideal scenario for 3+ tries.' },
      { icon: '💸', title: 'Better value in multis', body: 'If you believe in the player, a 2+ Try Scorer ($4–6) often has better expected value than 3+ ($10–20).' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>South Sydney Rabbitohs</span><span class="vs">vs</span><span>Wests Tigers</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Alex Johnston <small>Best 3+ rate: ~6%</small></span><span class="fts-odd">$12.00</span></div>
          <div class="fts-item"><span class="fts-name">Latrell Mitchell <small>Best 3+ rate: ~4%</small></span><span class="fts-odd">$16.00</span></div>
          <div class="fts-item"><span class="fts-name">Campbell Graham <small>Best 3+ rate: ~3%</small></span><span class="fts-odd">$19.00</span></div>
        </div>
        <div class="odds-note">Hat-tricks are rare — small stakes only. Best in blowout matchups.</div>
      </div>`,
  },

  bothhalf: {
    icon: '🔁', name: 'Try Scorer in Both Halves', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Back a player to score at least one try in each half.',
    desc: 'This market requires your chosen player to score a try in <strong>both the first and second half</strong>. It\'s more specific than a 2+ Try Scorer bet — you need at least one try each side of half-time, not just two tries in total. Odds are generally higher than 2+ for the same player.',
    example: 'You back <strong>Brian To\'o to score in both halves</strong> at <strong>$7.00</strong>. He scores in the 23rd and 61st minutes. Your $10 bet returns <strong>$70.00</strong>.',
    tips: [
      { icon: '⚖️', title: 'Harder than 2+ tries', body: 'A player could score twice in one half and zero in the other — that loses this bet but wins a 2+ bet. The odds should reflect this.' },
      { icon: '🔄', title: 'Consistent scorers across halves', body: 'Back players who are evenly involved throughout games rather than players who tend to feast in one period.' },
      { icon: '💡', title: 'Compare to 2+ Try odds', body: 'If the Both Halves odds are similar to 2+ Try odds, the 2+ is usually better value — it gives you more ways to win.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Gold Coast Titans</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Brian To'o — Both Halves</span><span class="fts-odd">$7.00</span></div>
          <div class="fts-item"><span class="fts-name">Brian To'o — 2+ Tries (compare)</span><span class="fts-odd">$4.00</span></div>
          <div class="fts-item"><span class="fts-name">Taylan May — Both Halves</span><span class="fts-odd">$9.50</span></div>
        </div>
        <div class="odds-note">2+ Tries gives more ways to win than Both Halves — compare before betting.</div>
      </div>`,
  },

  firstteam: {
    icon: '🚀', name: 'First Try Scoring Team', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Which team will score the first try of the match?',
    desc: 'Instead of predicting the individual player, you simply pick which <strong>team</strong> will score the first try. With only two options, this is much simpler than the First Try Scorer market. Odds typically sit between $1.65–$2.20 per side depending on how even the matchup is.',
    example: 'You bet <strong>Melbourne Storm to score the first try</strong> at <strong>$1.72</strong>. Storm cross in the 9th minute via Harry Grant. Your $20 bet returns <strong>$34.40</strong>.',
    tips: [
      { icon: '🏠', title: 'Home teams score first more often', body: 'Home sides score the first try in approximately 54–57% of NRL games historically.' },
      { icon: '⚡', title: 'Fast-starting teams', body: 'Some teams consistently score within the first 10 minutes — track "first to score" rates by team.' },
      { icon: '🔗', title: 'Great in a multi or SGM', body: 'Combining First Try Scoring Team with an H2H pick is one of the most logical 2-leg multis in NRL.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Brisbane Broncos</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Storm First Try</span><span class="odd-val">$1.72</span></div>
          <div class="odd-btn"><span class="odd-team">Broncos First Try</span><span class="odd-val">$2.10</span></div>
        </div>
        <div class="odds-note">Storm are home — home teams score first ~55% of the time in NRL.</div>
      </div>
      <div class="implied-prob">
        <div class="prob-label">First Try Team — Season Stats</div>
        <div class="stat-grid">
          <div class="mini-stat"><span>58%</span><small>Storm score first at home</small></div>
          <div class="mini-stat"><span>46%</span><small>Broncos score first away</small></div>
        </div>
      </div>`,
  },

  bothteams: {
    icon: '🤝', name: 'Both Teams to Score a Try', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Will both teams cross the line at least once?',
    desc: 'This market asks whether <strong>both teams will each score at least one try</strong> during the match. In NRL, it\'s rare for a team to be completely shut out — so the "Yes" side is usually priced as a strong favourite. The "No" (one team scores no tries) is less common but can offer value in heavily mismatched games.',
    example: 'You bet <strong>Both Teams to Score — Yes</strong> at <strong>$1.20</strong>. Even in a 34–4 thrashing, the Bulldogs manage one consolation try in the 75th minute. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '📊', title: 'Yes wins about 93% of the time', body: 'In recent NRL seasons, one team being shutout without a try is very rare — the "Yes" is almost always on.' },
      { icon: '⚠️', title: '"No" value in big mismatches', body: 'When a powerhouse hosts a struggling side, the "No" at $5–$8 becomes an interesting long shot if you expect a dominant defensive display.' },
      { icon: '🔗', title: 'Use "Yes" to boost SGMs', body: '"Both Teams to Score" combined with an O/U pick can add a small odds boost to a multi without much extra risk.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Wests Tigers</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Yes — Both Score</span><span class="odd-val">$1.20</span></div>
          <div class="odd-btn"><span class="odd-team">No — One Scoreless</span><span class="odd-val">$5.00</span></div>
        </div>
        <div class="odds-note">"Yes" is heavily favoured — but adds little value in a multi at $1.20.</div>
      </div>`,
  },

  winboth: {
    icon: '🔒', name: 'Team to Win Both Halves', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Back a team to outscore their opponent in BOTH halves.',
    desc: 'The "Win Both Halves" market requires your chosen team to score <strong>more points than their opponent in each half independently</strong>. They could win the first half 14–6 and the second half 10–4 — both conditions met. If they trail at half-time but win overall, this bet loses.',
    example: 'You back <strong>Storm to Win Both Halves</strong> at <strong>$2.80</strong>. Storm lead 12–4 at half-time, then win the second half 10–6. Final: Storm 22–10. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '📈', title: 'Strong teams cover this ~35% of the time', body: 'Even dominant teams don\'t always win both halves — slow starts are common. Around $2.50–$3.50 is the usual range.' },
      { icon: '🏠', title: 'Home advantage boosts early scoring', body: 'Teams that start fast at home are the best candidates for Win Both Halves.' },
      { icon: '⚠️', title: 'Not the same as winning overall', body: 'A team can win 30–16 but lose this bet if they trailed 10–14 at half-time. Always check historical half-time scores.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Warriors</span></div>
        <div class="odds-row">
          <div class="odd-btn active-pick"><span class="odd-team">Storm Win Both</span><span class="odd-val">$2.80</span></div>
          <div class="odd-btn"><span class="odd-team">Warriors Win Both</span><span class="odd-val">$8.50</span></div>
        </div>
        <div class="odds-note">Storm win both halves in ~38% of home games this season.</div>
      </div>`,
  },

  score20: {
    icon: '🔥', name: 'Team to Score 20+/30+ Points', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Will a team reach a points milestone in the match?',
    desc: 'These markets ask whether a specific team will score at least 20, 30, or 40 points in the match. They\'re available for both teams independently. Useful when you\'re confident in a team\'s attacking output but don\'t want to worry about the opponent\'s score at all.',
    example: 'You bet <strong>Panthers to score 30+ points</strong> at <strong>$2.20</strong>. Panthers win 36–12. They cleared 30 points — your bet <strong>wins</strong>.',
    tips: [
      { icon: '🎯', title: '20+ is achievable for most top-8 teams', body: 'Strong NRL sides score 20+ in roughly 65–70% of games. At $1.50–$1.70, the value is often marginal.' },
      { icon: '🏋️', title: '30+ requires a real attacking performance', body: '30+ happens in about 40% of NRL games for top teams — odds around $2.00–$2.50 can offer real value.' },
      { icon: '🌟', title: '40+ is a genuine punt', body: 'Teams score 40+ in only ~15–20% of games. At $4–$6, this is speculative but exciting.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Gold Coast Titans</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Panthers Points Milestone</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>To Score 20+ points</span><span>$1.55</span></div>
          <div class="margin-row"><span>To Score 30+ points</span><span>$2.20</span></div>
          <div class="margin-row"><span>To Score 40+ points</span><span>$4.50</span></div>
          <div class="margin-row separator"><span>Titans Points Milestone</span></div>
          <div class="margin-row"><span>To Score 20+ points</span><span>$2.80</span></div>
          <div class="margin-row"><span>To Score 30+ points</span><span>$6.00</span></div>
        </div>
      </div>`,
  },

  metres: {
    icon: '📏', name: 'Player Metres Run', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on how many metres a player will run with the ball.',
    desc: 'Player Metres Run is a prop bet where you pick whether a specific player will run <strong>over or under</strong> a set number of metres during the match. Run metres include all carry metres from normal runs, offloads, and kicks received but <em>exclude</em> kick metres. Centres and big forwards tend to have the highest line totals.',
    example: 'You bet <strong>Payne Haas Over 130.5 metres</strong> at <strong>$1.88</strong>. Haas finishes with 147 run metres. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🏋️', title: 'Forwards and outside backs run the most', body: 'Props like Haas, Fifita, and Papali\'i regularly rack up 100–180m. Wingers and centres often top 100–130m.' },
      { icon: '📊', title: 'Check their last 5 game average', body: 'Player metres are highly consistent week-to-week. A player averaging 145m with a line of 120.5 is a strong Over pick.' },
      { icon: '🌧️', title: 'Rain games reduce metres', body: 'Wet weather leads to more kicks and fewer runs — consider weather when picking on metres markets.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Brisbane Broncos</span><span class="vs">vs</span><span>Melbourne Storm</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Player Metres Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Payne Haas Over 130.5m</span><span>$1.88</span></div>
          <div class="margin-row"><span>Payne Haas Under 130.5m</span><span>$1.92</span></div>
          <div class="margin-row separator"><span></span></div>
          <div class="margin-row"><span>Reece Walsh Over 155.5m</span><span>$1.92</span></div>
          <div class="margin-row"><span>Reece Walsh Under 155.5m</span><span>$1.88</span></div>
          <div class="margin-row separator"><span></span></div>
          <div class="margin-row"><span>Adam Reynolds Over 65.5m</span><span>$1.90</span></div>
        </div>
      </div>`,
  },

  tackles: {
    icon: '🦺', name: 'Player Tackles Made', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on how many tackles a player will make in the match.',
    desc: 'Player Tackles Made bets let you predict whether a player will make <strong>over or under</strong> a set number of tackles. Defensive workhorses — locks, hookers, and back-rowers — are the best candidates, often making 30–55 tackles in a game. Wingers and halfbacks typically make fewer than 15.',
    example: 'You bet <strong>Harry Grant Over 45.5 tackles</strong> at <strong>$1.85</strong>. Grant finishes with 49 tackles in a tight, defence-dominated game. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🧱', title: 'Hookers and locks make the most', body: 'Dummy-halves like Harry Grant and Api Koroisau regularly hit 40–55 tackles. They\'re the go-to for Over bets.' },
      { icon: '📊', title: 'Tight games = more tackles', body: 'Low-scoring defensive battles see higher tackle counts across the board. Back overs in expected close games.' },
      { icon: '⚠️', title: 'Watch injury/game time risk', body: 'If a player gets injured and leaves early, tackles can fall well short of the line. Bets are voided if they don\'t take the field.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Melbourne Storm</span><span class="vs">vs</span><span>Brisbane Broncos</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Player Tackles Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Harry Grant Over 45.5 tackles</span><span>$1.85</span></div>
          <div class="margin-row"><span>Harry Grant Under 45.5 tackles</span><span>$1.95</span></div>
          <div class="margin-row separator"><span></span></div>
          <div class="margin-row"><span>Cameron Munster Over 28.5 tackles</span><span>$1.88</span></div>
          <div class="margin-row"><span>Tom Dearden Over 38.5 tackles</span><span>$1.90</span></div>
        </div>
      </div>`,
  },

  performance: {
    icon: '⭐', name: 'Player Performance Points', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'A composite score based on tries, tackles, metres and assists.',
    desc: 'Player Performance Points is a <strong>composite betting market</strong> unique to Sportsbet. Each player earns a score based on their stats: <strong>4pts per point scored, 10pts per try assist, 1pt per 10 run metres, 5pts per linebreak, 1pt per tackle</strong>. You bet on a player to finish over or under a points total. It\'s like a mini fantasy score for a single game.',
    example: 'You bet <strong>Cameron Munster Over 55.5 performance points</strong> at <strong>$1.90</strong>. Munster scores a try (4pts), 2 try assists (20pts), 120 metres (12pts), 2 linebreaks (10pts), 28 tackles (28pts) = 74 points total. Your bet <strong>wins</strong>.',
    tips: [
      { icon: '🧮', title: 'Understand the scoring system', body: 'Tries are worth 4pts (for the 4 points they add to the score), not 6. Assists (10pts each) are massive — playmakers rack up big scores.' },
      { icon: '🏆', title: 'Halfbacks and five-eighths dominate', body: 'Ball-playing creators like Cleary, Reynolds, and Munster consistently score high due to assists + metres + tackles.' },
      { icon: '📊', title: 'Check their season performance average', body: 'Some bookmakers display a player\'s average performance score. If their average is 70 and the line is 55.5, that\'s a strong Over case.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Cronulla Sharks</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Performance Points Market</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Nathan Cleary Over 60.5 pts</span><span>$1.90</span></div>
          <div class="margin-row"><span>Nathan Cleary Under 60.5 pts</span><span>$1.90</span></div>
          <div class="margin-row separator"><span></span></div>
          <div class="margin-row"><span>Brian To'o Over 45.5 pts</span><span>$1.88</span></div>
          <div class="margin-row"><span>Nicho Hynes Over 52.5 pts</span><span>$1.92</span></div>
        </div>
        <div class="odds-note">Scoring: 4pts/point scored · 10pts/try assist · 1pt/10m run · 5pts/linebreak · 1pt/tackle</div>
      </div>`,
  },

  bigwin: {
    icon: '💥', name: 'Big Win Little Win', risk: 'low', riskLabel: 'Low Risk',
    tagline: 'Did they scrape home or blow them away?',
    desc: '<strong>Big Win Little Win</strong> is a simplified margin market with just two brackets: a <strong>"Little Win"</strong> means the team wins by 1–12 points, and a <strong>"Big Win"</strong> means they win by 13 or more. You pick a team AND which bracket applies. It\'s a great middle ground between H2H and full margin betting — more structure, more reward.',
    example: 'Dolphins are favourites. You back <strong>Dolphins Big Win (13+)</strong> at <strong>$2.25</strong>. They win 26–10, a 16-point margin. Big win confirmed — your $10 bet returns <strong>$22.50</strong>.',
    tips: [
      { icon: '📊', title: 'Check average margins', body: 'Teams that average 15+ point wins are consistent Big Win candidates against weaker opponents.' },
      { icon: '💡', title: '"Little Win" often better value', body: 'Close games are the norm in NRL. A "Little Win" at $3.00+ for a favourite can outperform straight H2H.' },
      { icon: '⚠️', title: 'Draw = loss for all', body: 'If the game ends in a draw (rare but possible after extra time), all Big Win Little Win bets lose.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Dolphins</span><span class="vs">vs</span><span>Canterbury Bulldogs</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Big Win Little Win</span><span>Odds</span></div>
          <div class="margin-row"><span>Dolphins 1 to 12 (Little Win)</span><span>$3.05</span></div>
          <div class="margin-row best-value"><span>Dolphins 13+ (Big Win)</span><span>$2.25</span></div>
          <div class="margin-row"><span>Canterbury 1 to 12 (Little Win)</span><span>$4.10</span></div>
          <div class="margin-row"><span>Canterbury 13+ (Big Win)</span><span>$7.25</span></div>
        </div>
        <div class="odds-note">Odds from real Sportsbet page (Dolphins vs Bulldogs, Round 12 2026)</div>
      </div>`,
  },

  pickyourline: {
    icon: '🎛️', name: 'Pick Your Own Line', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Set your own handicap and get a custom price.',
    desc: '<strong>Pick Your Own Line</strong> lets you choose a custom points handicap rather than accepting the bookmaker\'s standard line. Want to back the Penrith Panthers –15.5 instead of –8.5? You get longer odds. Prefer a safer +12.5 for the underdog? You get shorter odds. The price adjusts dynamically to reflect your chosen line.',
    example: 'Standard line: Panthers –8.5 at $1.90. You pick <strong>Panthers –15.5</strong> for higher upside at <strong>$2.60</strong>. Panthers win 30–10 (20-point win), covering your custom line. Your $10 returns <strong>$26.00</strong>.',
    tips: [
      { icon: '🎯', title: 'Go bigger for dominant teams', body: 'If you expect a blowout, picking a larger handicap multiplies your return significantly.' },
      { icon: '🛡️', title: 'Use a smaller line for safety', body: 'Give the underdog a bigger head start to reduce risk at the cost of lower odds.' },
      { icon: '📐', title: 'Understand the price shift', body: 'Each extra point in your custom line changes the odds. Compare the implied probability before committing.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Penrith Panthers</span><span class="vs">vs</span><span>Gold Coast Titans</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Pick Your Own Line — Panthers</span><span>Odds</span></div>
          <div class="margin-row"><span>Panthers –4.5</span><span>$1.60</span></div>
          <div class="margin-row"><span>Panthers –8.5 (standard)</span><span>$1.90</span></div>
          <div class="margin-row best-value"><span>Panthers –14.5</span><span>$2.40</span></div>
          <div class="margin-row"><span>Panthers –20.5</span><span>$3.50</span></div>
        </div>
        <div class="odds-note">Larger handicap = longer odds. You choose the risk/reward balance.</div>
      </div>`,
  },

  firstsecondthird: {
    icon: '🥉', name: '1st, 2nd or 3rd Try Scorer', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Score in the first three tries of the match.',
    desc: 'This market pays out if your selected player scores <strong>any one of the first three tries</strong> of the game. It\'s broader than First Try Scorer — three chances instead of one — making it more achievable and priced accordingly. Great for prolific try scorers who are almost guaranteed to be involved early.',
    example: 'You back <strong>Hamiso Tabuai-Fidow in the first 3 tries</strong> at <strong>$3.00</strong>. He scores the second try of the match. Your $10 bet returns <strong>$30.00</strong>.',
    tips: [
      { icon: '📈', title: 'Wing players and strike centres', body: 'Outside backs who finish off attacking sets early tend to score in the first tries. Target teams that start aggressively.' },
      { icon: '🎯', title: 'Better strike rate than FTS', body: 'Three chances instead of one means you\'ll win this bet roughly 3x as often as First Try Scorer for the same player.' },
      { icon: '💡', title: 'Check early-game dominance', body: 'Some teams consistently score first in their games. Their main finisher is a strong 1st/2nd/3rd try scorer pick.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Dolphins</span><span class="vs">vs</span><span>Canterbury Bulldogs</span></div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Hamiso Tabuai-Fidow<small>Dolphins — explosive starter</small></span><span class="fts-odd">$3.00</span></div>
          <div class="fts-item"><span class="fts-name">Jamayne Isaako<small>Bulldogs — dangerous winger</small></span><span class="fts-odd">$3.50</span></div>
          <div class="fts-item"><span class="fts-name">Selwyn Cobbo<small>Dolphins — consistent finisher</small></span><span class="fts-odd">$3.80</span></div>
          <div class="fts-item"><span class="fts-name">Bronson Xerri<small>Bulldogs — powerful centre</small></span><span class="fts-odd">$4.20</span></div>
        </div>
        <div class="odds-note">Wins if selected player scores any of the first 3 tries in the match.</div>
      </div>`,
  },

  teamscorecombo: {
    icon: '🔀', name: 'Team Score Combo', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Predict the score range for both teams at once.',
    desc: 'Also called <strong>Team Score Double</strong>, this market requires you to predict the score band for <strong>both teams</strong> in a single bet. For example: "Team A scores 11–20 points AND Team B scores 21–30 points." Both parts must be correct. The odds are long because you\'re nailing two things simultaneously — but so is the payout.',
    example: 'You back <strong>Dolphins 11–20 / Bulldogs 0–10</strong> at <strong>$26.00</strong>. Final score: Dolphins 18 – Bulldogs 6. Both score bands are correct. Your $10 bet returns a massive <strong>$260.00</strong>.',
    tips: [
      { icon: '🎯', title: 'Use form and totals markets together', body: 'Look at both teams\' average scores and the O/U line to identify realistic score band combinations.' },
      { icon: '💡', title: 'Lower bands are more likely', body: 'NRL averages ~22 points per team per game. Combinations in the 11–20 range are far more common than 31+ bands.' },
      { icon: '⚠️', title: 'High risk, big reward', body: 'Odds of $20–50+ are common. Treat this as a long-shot bet — only stake what you can afford to lose entirely.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Dolphins</span><span class="vs">vs</span><span>Canterbury Bulldogs</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Team Score Combo</span><span>Odds</span></div>
          <div class="margin-row"><span>Dolphins 0–10 / Bulldogs 21–30</span><span>$34.00</span></div>
          <div class="margin-row"><span>Dolphins 0–10 / Bulldogs 31+</span><span>$51.00</span></div>
          <div class="margin-row best-value"><span>Dolphins 11–20 / Bulldogs 0–10</span><span>$26.00</span></div>
          <div class="margin-row"><span>Dolphins 21–30 / Bulldogs 0–10</span><span>$19.00</span></div>
        </div>
        <div class="odds-note">Both score bands must be correct. Long odds reflect the difficulty.</div>
      </div>`,
  },

  timeofmarkets: {
    icon: '⏱️', name: 'Time of Try Markets', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Bet on the exact minute the first or last try is scored.',
    desc: '<strong>Time of Markets</strong> let you bet on <strong>when</strong> specific events happen — most commonly the exact minute window (e.g. 1–10, 11–20) in which the first try or last try of the game is scored. You\'re not picking who scores or which team, just <em>when</em> it happens. Also includes markets like "exact minute of 1st try" in NRL-style betting.',
    example: 'You back <strong>First Try Scored: Minutes 1–10</strong> at <strong>$2.80</strong>. The game\'s first try comes in the 7th minute. Your $10 bet returns <strong>$28.00</strong>.',
    tips: [
      { icon: '📊', title: 'Check both teams\' scoring patterns', body: 'Some teams are known for fast starts and score in the first 10 minutes frequently. Look at historical first-try timing data.' },
      { icon: '🛡️', title: '1st half windows are less risky', body: 'Most games see their first try in the first 20 minutes. Betting minutes 1–20 gives you a broader safety window.' },
      { icon: '⚠️', title: 'If no try in your window, you lose', body: 'Each minute band is exclusive — a try in minute 12 wins the 11–20 bet, not the 1–10 bet.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>First Try Scored — Minute Window</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Time Band</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Minutes 1–10</span><span>$2.80</span></div>
          <div class="margin-row"><span>Minutes 11–20</span><span>$3.00</span></div>
          <div class="margin-row"><span>Minutes 21–30</span><span>$4.00</span></div>
          <div class="margin-row"><span>Minutes 31–40</span><span>$6.00</span></div>
          <div class="margin-row"><span>Minutes 41–50</span><span>$5.50</span></div>
          <div class="margin-row"><span>Minutes 51–80</span><span>$4.50</span></div>
        </div>
        <div class="odds-note">Also available: Exact Minute of Last Try. Includes extra time.</div>
      </div>`,
  },

  mosttries: {
    icon: '⚔️', name: 'Most Tries Head to Head', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Which of two players will score more tries today?',
    desc: '<strong>Most Tries H2H</strong> pits two specific players against each other — you bet on which one will score <strong>more tries</strong> in the same match. If they score the same number of tries, the result is a tie (check the bookmaker\'s tie rules — often void or push). Great for fans who watch the game closely and know player matchups.',
    example: 'Hamiso Tabuai-Fidow vs Jonathan Sua. You back <strong>Tabuai-Fidow</strong> at <strong>$1.85</strong>. He scores 2 tries; Sua scores 0. Your $10 bet returns <strong>$18.50</strong>.',
    tips: [
      { icon: '📊', title: 'Compare recent try-scoring rates', body: 'A player averaging 0.9 tries/game vs one averaging 0.4 tries/game is a clear edge — check the stats before committing.' },
      { icon: '🎯', title: 'Matchup matters', body: 'Consider who each player is defending against. A winger facing a weak outside defence may thrive even against a prolific scorer.' },
      { icon: '💡', title: 'Tie rules vary', body: 'Some bookmakers void the bet on a tie; others pay both out. Always check the rules before placing.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Dolphins</span><span class="vs">vs</span><span>Canterbury Bulldogs</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>Most Tries H2H</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Hamiso Tabuai-Fidow v Jonathan Sua → Tabuai-Fidow</span><span>$1.85</span></div>
          <div class="margin-row"><span>Hamiso Tabuai-Fidow v Jonathan Sua → Sua</span><span>$1.95</span></div>
          <div class="margin-row separator"><span></span></div>
          <div class="margin-row"><span>Selwyn Cobbo v Bronson Xerri → Cobbo</span><span>$1.80</span></div>
          <div class="margin-row"><span>Selwyn Cobbo v Bronson Xerri → Xerri</span><span>$2.00</span></div>
        </div>
        <div class="odds-note">Tied score: bet is void (most bookmakers). Check T&Cs before placing.</div>
      </div>`,
  },

  playercombo: {
    icon: '🧩', name: 'Player Combo Markets', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Combine multiple player stat outcomes in one bet.',
    desc: '<strong>Player Combo Markets</strong> let you combine several player-based outcomes into a single bet — for example: "Player A scores a try AND Player B runs over 100 metres." All legs must win for the bet to pay out. Think of it as a Same Game Multi focused entirely on player performance rather than match results.',
    example: 'You build a combo: <strong>Hamiso Tabuai-Fidow to score a try + Nathan Cleary Over 55.5 performance points</strong>. Both legs win. At combined odds of <strong>$5.50</strong>, your $10 bet returns <strong>$55.00</strong>.',
    tips: [
      { icon: '🔗', title: 'Correlated legs boost value', body: 'Picking a playmaker to score + their team to win often correlates — if the team dominates, the playmaker is more likely to score.' },
      { icon: '⚠️', title: 'More legs = higher risk', body: 'Two-leg combos are manageable. Three or more legs dramatically reduce your chance of winning.' },
      { icon: '📊', title: 'Stick to consistent performers', body: 'Players who regularly hit their statistical benchmarks (high metres, consistent tackles) are safer combo legs than boom-or-bust options.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Player Combo — Example Build</span></div>
        <div class="fts-list">
          <div class="fts-item"><span class="fts-name">Leg 1: Tabuai-Fidow Anytime Try Scorer<small>Odds: $1.85</small></span><span class="fts-odd">✅</span></div>
          <div class="fts-item"><span class="fts-name">Leg 2: Cleary Over 55.5 Performance Pts<small>Odds: $1.90</small></span><span class="fts-odd">✅</span></div>
          <div class="fts-item best-value"><span class="fts-name">Combined Odds<small>$1.85 × $1.90</small></span><span class="fts-odd">$3.52</span></div>
        </div>
        <div class="odds-note">All legs must win. One losing leg and the entire combo is lost.</div>
      </div>`,
  },

  firstandlast: {
    icon: '🎬', name: '1st & Last to Score', risk: 'high', riskLabel: 'High Risk',
    tagline: 'Who scores the first AND last try of the match?',
    desc: 'The <strong>1st & Last to Score</strong> market asks you to select the player who scores the <strong>very first try</strong> of the game, and the player who scores the <strong>very last try</strong>. Both picks must be correct for the bet to pay out. It\'s a Scorecast-style market with huge potential returns — but obviously very difficult to get right.',
    example: 'You pick <strong>Tabuai-Fidow first / Cobbo last</strong> at <strong>$21.00</strong>. Tabuai-Fidow opens the scoring in minute 4, and Cobbo seals it with the final try in minute 74. Your $10 bet returns <strong>$210.00</strong>.',
    tips: [
      { icon: '🏃', title: 'First scorer: back fast starters', body: 'Target outside backs from teams that score quickly. Wingers in high-tempo teams often cross for the first try.' },
      { icon: '🔒', title: 'Last scorer: favour the winning team', body: 'The last try usually goes to the team in control late in the game. Back a player from the expected winner.' },
      { icon: '⚠️', title: 'Long odds for a reason', body: 'With the field of possible combinations enormous, expect odds of $15–$50+. Small stakes only.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card">
        <div class="odds-match"><span>Dolphins</span><span class="vs">vs</span><span>Canterbury Bulldogs</span></div>
        <div class="margin-table">
          <div class="margin-row header"><span>1st & Last Try Scorer Combos</span><span>Odds</span></div>
          <div class="margin-row best-value"><span>Tabuai-Fidow / Cobbo</span><span>$21.00</span></div>
          <div class="margin-row"><span>Tabuai-Fidow / Isaako</span><span>$26.00</span></div>
          <div class="margin-row"><span>Cobbo / Cobbo (scores first & last)</span><span>$34.00</span></div>
          <div class="margin-row"><span>Isaako / Tabuai-Fidow</span><span>$29.00</span></div>
        </div>
        <div class="odds-note">Both picks must be correct. High risk — perfect for small-stake punts.</div>
      </div>`,
  },

  futures: {
    icon: '🏅', name: 'Season Futures', risk: 'medium', riskLabel: 'Medium Risk',
    tagline: 'Bet on end-of-season outcomes like the Premiership winner.',
    desc: 'Futures (or Season Ante-Post) markets let you bet on outcomes that are decided at the end of the NRL season — not just a single game. Popular markets include the Premiership winner, Top 8 finish, Wooden Spoon, Dally M Medal (Player of the Year), and Top Try Scorer. Odds shift dramatically throughout the season based on results.',
    example: 'Pre-season, you bet <strong>$50 on Penrith Panthers to win the Premiership</strong> at <strong>$4.50</strong>. They go on to win the Grand Final. You collect <strong>$225.00</strong> — a $175 profit.',
    tips: [
      { icon: '📅', title: 'Early odds are the best value', body: 'Pre-season odds for good teams are often longer than mid-season. If you believe in a team, bet early.' },
      { icon: '🔄', title: 'Odds shift fast after bad rounds', body: 'A top team losing 2 in a row can see their premiership odds blow out from $4 to $8 — potential buying opportunity.' },
      { icon: '🛡️', title: 'Top 8 finish is lower risk', body: 'For strong teams, a Top 8 finish at $1.50–$1.80 is a safer alternative to the outright premiership market.' },
    ],
    oddsHtml: `
      <div class="odds-preview-card" style="padding-bottom:8px">
        <div class="prob-label" style="margin-bottom:10px">2026 Premiership Winner</div>
        <div class="fts-list">
          <div class="fts-item best-value"><span class="fts-name">Penrith Panthers<small>Round 12 leader</small></span><span class="fts-odd">$3.50</span></div>
          <div class="fts-item"><span class="fts-name">Melbourne Storm<small>Consistent finals contender</small></span><span class="fts-odd">$4.00</span></div>
          <div class="fts-item"><span class="fts-name">Sydney Roosters<small>Strong home form</small></span><span class="fts-odd">$6.00</span></div>
          <div class="fts-item"><span class="fts-name">Brisbane Broncos<small>Dark horse</small></span><span class="fts-odd">$9.00</span></div>
          <div class="fts-item"><span class="fts-name">Field (all others)</span><span class="fts-odd">$15+</span></div>
        </div>
        <div class="odds-note">Premiership markets fluctuate week to week — best odds found early in the season.</div>
      </div>`,
  },
};

function renderPanel(tabKey) {
  const bt = BET_TYPES[tabKey];
  if (!bt) return '';
  return `
    <div class="panel-content">
      <div class="panel-info">
        <div class="panel-top">
          <span class="bet-icon">${bt.icon}</span>
          <div>
            <h3>${bt.name}</h3>
            <p class="bet-tagline">${bt.tagline}</p>
          </div>
          <div class="risk-badge risk--${bt.risk}">${bt.riskLabel}</div>
        </div>
        <p class="panel-desc">${bt.desc}</p>
        <div class="example-box">
          <div class="example-label">📖 Example</div>
          <p>${bt.example}</p>
        </div>
        <div class="tips-grid">
          ${bt.tips.map(t => `
          <div class="tip-card">
            <span class="tip-icon">${t.icon}</span>
            <div><strong>${t.title}</strong><p>${t.body}</p></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="panel-odds">${bt.oddsHtml}</div>
    </div>`;
}
