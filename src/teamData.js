// Static team metadata, player rosters and injury lists for NRL simulation engine.
// Keys match The Odds API team names exactly.
// ⚠️ Injury data is indicative only — always verify with official NRL team announcements.

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos',
    players: [
      { name: 'Selwyn Cobbo',    pos: 'wing',      tryRate: 0.55 },
      { name: 'Reece Walsh',     pos: 'fullback',   tryRate: 0.40 },
      { name: 'Kotoni Staggs',   pos: 'centre',     tryRate: 0.40 },
      { name: 'Ezra Mam',        pos: 'halfback',   tryRate: 0.22 },
      { name: 'Payne Haas',      pos: 'prop',       tryRate: 0.12 },
    ],
    injuries: [
      { name: 'Adam Reynolds',   pos: 'halfback',   injury: 'Calf strain',      status: 'Doubtful',  note: 'Missed training Thursday' },
      { name: 'Corey Oates',     pos: 'wing',       injury: 'Hamstring',        status: 'Out',       note: 'Expected back Round 15' },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders',
    players: [
      { name: 'Xavier Savage',     pos: 'wing',    tryRate: 0.52 },
      { name: 'Jordan Rapana',     pos: 'wing',    tryRate: 0.45 },
      { name: 'Matthew Timoko',    pos: 'centre',  tryRate: 0.38 },
      { name: 'Hudson Young',      pos: 'lock',    tryRate: 0.20 },
      { name: 'Joseph Tapine',     pos: 'prop',    tryRate: 0.15 },
    ],
    injuries: [
      { name: 'Elliott Whitehead', pos: 'second row', injury: 'Knee',           status: 'Doubtful',  note: 'Game-time decision' },
      { name: 'Tom Starling',      pos: 'hooker',     injury: 'Shoulder',       status: 'Out',       note: '2–3 weeks' },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs',
    players: [
      { name: 'Josh Addo-Carr',    pos: 'wing',    tryRate: 0.62 },
      { name: 'Bronson Xerri',     pos: 'centre',  tryRate: 0.45 },
      { name: 'Jacob Preston',     pos: 'wing',    tryRate: 0.42 },
      { name: 'Stephen Crichton',  pos: 'centre',  tryRate: 0.45 },
      { name: 'Toby Sexton',       pos: 'halfback',tryRate: 0.18 },
    ],
    injuries: [
      { name: 'Matt Burton',       pos: 'five-eighth', injury: 'Hamstring',     status: 'GTD',       note: 'Trained fully Friday' },
      { name: 'Reed Mahoney',      pos: 'hooker',      injury: 'Ankle',         status: 'Out',       note: 'Season in doubt' },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks',
    players: [
      { name: 'Ronaldo Mulitalo',  pos: 'wing',    tryRate: 0.58 },
      { name: 'Siosifa Talakai',   pos: 'centre',  tryRate: 0.50 },
      { name: 'Will Kennedy',      pos: 'fullback', tryRate: 0.38 },
      { name: 'Daniel Atkinson',   pos: 'wing',    tryRate: 0.42 },
      { name: 'Nicho Hynes',       pos: 'halfback', tryRate: 0.25 },
    ],
    injuries: [
      { name: 'Dale Finucane',     pos: 'prop',    injury: 'Knee',             status: 'Out',       note: '4–6 weeks' },
      { name: 'Cameron McInnes',   pos: 'hooker',  injury: 'Suspension',       status: 'Out',       note: '2-match ban' },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL',
    players: [
      { name: 'Hamiso Tabuai-Fidow', pos: 'fullback', tryRate: 0.65 },
      { name: 'Jamayne Isaako',      pos: 'wing',     tryRate: 0.50 },
      { name: 'Herbie Farnworth',    pos: 'centre',   tryRate: 0.45 },
      { name: 'Selwyn Cobbo',        pos: 'wing',     tryRate: 0.40 },
      { name: 'Sean O\'Sullivan',    pos: 'halfback',  tryRate: 0.18 },
    ],
    injuries: [
      { name: 'Kenny Bromwich',      pos: 'prop',     injury: 'Calf',           status: 'Doubtful',  note: 'Limted at training' },
      { name: 'Max Plath',           pos: 'second row',injury: 'Concussion',    status: 'Out',       note: 'HIA protocol' },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans',
    players: [
      { name: 'AJ Brimson',              pos: 'fullback', tryRate: 0.42 },
      { name: 'Alofiana Khan-Pereira',   pos: 'wing',     tryRate: 0.50 },
      { name: 'Keano Kini',              pos: 'wing',     tryRate: 0.45 },
      { name: 'Brian Kelly',             pos: 'centre',   tryRate: 0.38 },
      { name: 'Kieran Foran',            pos: 'halfback',  tryRate: 0.15 },
    ],
    injuries: [
      { name: 'Tino Fa\'asuamaleaui',    pos: 'prop',     injury: 'Suspension', status: 'Out',       note: '1-match ban' },
      { name: 'David Fifita',            pos: 'back row', injury: 'Calf',       status: 'Doubtful',  note: 'Week-to-week' },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles',
    players: [
      { name: 'Jason Saab',          pos: 'wing',     tryRate: 0.62 },
      { name: 'Tom Trbojevic',       pos: 'fullback', tryRate: 0.55 },
      { name: 'Reuben Garrick',      pos: 'wing',     tryRate: 0.50 },
      { name: 'Morgan Harper',       pos: 'centre',   tryRate: 0.38 },
      { name: 'Daly Cherry-Evans',   pos: 'halfback',  tryRate: 0.18 },
    ],
    injuries: [
      { name: 'Jake Trbojevic',      pos: 'prop',     injury: 'Knee',           status: 'Out',       note: '6–8 weeks' },
      { name: 'Haumole Olakau\'atu', pos: 'back row', injury: 'Ankle',          status: 'GTD',       note: 'Trained Thursday' },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm',
    players: [
      { name: 'Xavier Coates',   pos: 'wing',       tryRate: 0.68 },
      { name: 'Will Warbrick',   pos: 'wing',       tryRate: 0.55 },
      { name: 'Nick Meaney',     pos: 'fullback',   tryRate: 0.40 },
      { name: 'Cameron Munster', pos: 'five-eighth',tryRate: 0.30 },
      { name: 'Jahrome Hughes',  pos: 'halfback',   tryRate: 0.25 },
    ],
    injuries: [
      { name: 'Ryan Papenhuyzen', pos: 'fullback',  injury: 'Knee',            status: 'Out',       note: 'Season-ending' },
      { name: 'Nelson Asofa-Solomona', pos: 'prop', injury: 'Shoulder',        status: 'Doubtful',  note: 'Scans awaited' },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights',
    players: [
      { name: 'Dominic Young',    pos: 'wing',    tryRate: 0.58 },
      { name: 'Greg Marzhew',     pos: 'wing',    tryRate: 0.52 },
      { name: 'Bradman Best',     pos: 'centre',  tryRate: 0.45 },
      { name: 'Dane Gagai',       pos: 'centre',  tryRate: 0.40 },
      { name: 'Jackson Hastings', pos: 'halfback', tryRate: 0.20 },
    ],
    injuries: [
      { name: 'Kalyn Ponga',      pos: 'fullback', injury: 'Concussion',       status: 'GTD',       note: 'Cleared HIA' },
      { name: 'Tyson Frizell',    pos: 'back row', injury: 'Hamstring',        status: 'Out',       note: '2–3 weeks' },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors',
    players: [
      { name: 'Dallin Watene-Zelezniak', pos: 'wing',    tryRate: 0.55 },
      { name: 'Marcelo Montoya',         pos: 'wing',    tryRate: 0.50 },
      { name: 'Adam Pompey',             pos: 'centre',  tryRate: 0.40 },
      { name: 'Luke Metcalf',            pos: 'halfback', tryRate: 0.22 },
      { name: 'Te Maire Martin',         pos: 'five-eighth', tryRate: 0.25 },
    ],
    injuries: [
      { name: 'Tohu Harris',             pos: 'back row', injury: 'Knee',       status: 'Out',       note: '4 weeks' },
      { name: 'Shaun Johnson',           pos: 'halfback', injury: 'Calf',       status: 'Doubtful',  note: 'Being managed' },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys',
    players: [
      { name: 'Murray Taulagi',   pos: 'wing',     tryRate: 0.58 },
      { name: 'Kyle Feldt',       pos: 'wing',     tryRate: 0.52 },
      { name: 'Scott Drinkwater', pos: 'fullback', tryRate: 0.38 },
      { name: 'Heilum Luki',      pos: 'centre',   tryRate: 0.38 },
      { name: 'Tom Dearden',      pos: 'halfback',  tryRate: 0.22 },
    ],
    injuries: [
      { name: 'Chad Townsend',    pos: 'halfback', injury: 'Shoulder',         status: 'GTD',       note: 'Not training fully' },
      { name: 'Jeremiah Nanai',   pos: 'back row', injury: 'Ankle',            status: 'Out',       note: '3 weeks' },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels',
    players: [
      { name: 'Maika Sivo',       pos: 'wing',     tryRate: 0.62 },
      { name: 'Haze Dunster',     pos: 'wing',     tryRate: 0.45 },
      { name: 'Clint Gutherson',  pos: 'fullback', tryRate: 0.38 },
      { name: 'Will Penisini',    pos: 'centre',   tryRate: 0.40 },
      { name: 'Mitchell Moses',   pos: 'halfback',  tryRate: 0.22 },
    ],
    injuries: [
      { name: 'Dylan Brown',      pos: 'five-eighth', injury: 'Suspension',    status: 'Out',       note: '3-match ban' },
      { name: 'Junior Paulo',     pos: 'prop',        injury: 'Calf',          status: 'Doubtful',  note: 'Late fitness test' },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers',
    players: [
      { name: "Brian To'o",      pos: 'wing',     tryRate: 0.72 },
      { name: 'Sunia Turuva',    pos: 'wing',     tryRate: 0.55 },
      { name: 'Paul Alamoti',    pos: 'centre',   tryRate: 0.42 },
      { name: 'Nathan Cleary',   pos: 'halfback',  tryRate: 0.28 },
      { name: 'Isaah Yeo',       pos: 'lock',     tryRate: 0.22 },
    ],
    injuries: [
      { name: 'Liam Martin',     pos: 'back row', injury: 'Hamstring',         status: 'Doubtful',  note: 'Scans pending' },
      { name: 'Spencer Leniu',   pos: 'prop',     injury: 'Knee',              status: 'Out',       note: '6 weeks' },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs',
    players: [
      { name: 'Alex Johnston',    pos: 'wing',     tryRate: 0.72 },
      { name: 'Latrell Mitchell', pos: 'fullback', tryRate: 0.55 },
      { name: 'Campbell Graham', pos: 'centre',   tryRate: 0.45 },
      { name: 'Taane Milne',      pos: 'wing',     tryRate: 0.48 },
      { name: 'Lachlan Ilias',    pos: 'halfback',  tryRate: 0.20 },
    ],
    injuries: [
      { name: 'Cody Walker',      pos: 'five-eighth', injury: 'Knee',          status: 'Out',       note: '4–6 weeks' },
      { name: 'Tom Burgess',      pos: 'prop',        injury: 'Shoulder',      status: 'GTD',       note: 'Managed Thursday' },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons',
    players: [
      { name: 'Zac Lomax',          pos: 'wing',     tryRate: 0.55 },
      { name: 'Mikaele Ravalawa',   pos: 'wing',     tryRate: 0.55 },
      { name: 'Tyrell Sloan',       pos: 'fullback', tryRate: 0.40 },
      { name: 'Moses Suli',         pos: 'centre',   tryRate: 0.42 },
      { name: 'Kyle Flanagan',      pos: 'halfback',  tryRate: 0.18 },
    ],
    injuries: [
      { name: 'Ben Hunt',           pos: 'halfback', injury: 'Hamstring',      status: 'Out',       note: '2–3 weeks' },
      { name: 'Jaydn Su\'A',        pos: 'back row', injury: 'Ankle',          status: 'Doubtful',  note: 'Limping at training' },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters',
    players: [
      { name: 'Daniel Tupou',              pos: 'wing',     tryRate: 0.62 },
      { name: 'Mark Nawaqanitawase',       pos: 'wing',     tryRate: 0.55 },
      { name: 'James Tedesco',             pos: 'fullback', tryRate: 0.50 },
      { name: 'Joseph Manu',               pos: 'centre',   tryRate: 0.50 },
      { name: 'Luke Keary',                pos: 'halfback',  tryRate: 0.22 },
    ],
    injuries: [
      { name: 'Victor Radley',             pos: 'lock',     injury: 'Suspension',  status: 'Out',   note: '2-match ban' },
      { name: 'Nat Butcher',               pos: 'back row', injury: 'Hamstring',   status: 'Doubtful', note: 'Trained lightly' },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers',
    players: [
      { name: "Starford To'a",    pos: 'wing',     tryRate: 0.52 },
      { name: 'David Nofoaluma', pos: 'wing',     tryRate: 0.55 },
      { name: 'Jahream Bula',     pos: 'wing',     tryRate: 0.45 },
      { name: 'Brent Naden',      pos: 'centre',   tryRate: 0.38 },
      { name: 'Jayden Sullivan',  pos: 'halfback',  tryRate: 0.20 },
    ],
    injuries: [
      { name: 'Adam Doueihi',     pos: 'five-eighth', injury: 'Knee (ACL)',    status: 'Out',       note: 'Season-ending' },
      { name: 'Justin Matamua',   pos: 'prop',        injury: 'Calf',          status: 'GTD',       note: 'Fitness test Saturday' },
    ],
  },
};
