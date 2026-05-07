// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos',
    players: [
      { name: 'Selwyn Cobbo',    pos: 'wing',      tryRate: 0.55 },
      { name: 'Reece Walsh',     pos: 'fullback',   tryRate: 0.40 },
      { name: 'Kotoni Staggs',   pos: 'centre',     tryRate: 0.40 },
      { name: 'Ezra Mam',        pos: 'halfback',   tryRate: 0.22 },
      { name: 'Payne Haas',      pos: 'prop',       tryRate: 0.12 },
    ],
  },
  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders',
    players: [
      { name: 'Xavier Savage',     pos: 'wing',    tryRate: 0.52 },
      { name: 'Jordan Rapana',     pos: 'wing',    tryRate: 0.45 },
      { name: 'Matthew Timoko',    pos: 'centre',  tryRate: 0.38 },
      { name: 'Hudson Young',      pos: 'lock',    tryRate: 0.20 },
      { name: 'Joseph Tapine',     pos: 'prop',    tryRate: 0.15 },
    ],
  },
  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs',
    players: [
      { name: 'Josh Addo-Carr',    pos: 'wing',    tryRate: 0.62 },
      { name: 'Bronson Xerri',     pos: 'centre',  tryRate: 0.45 },
      { name: 'Jacob Preston',     pos: 'wing',    tryRate: 0.42 },
      { name: 'Stephen Crichton',  pos: 'centre',  tryRate: 0.45 },
      { name: 'Toby Sexton',       pos: 'halfback',tryRate: 0.18 },
    ],
  },
  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks',
    players: [
      { name: 'Ronaldo Mulitalo',  pos: 'wing',    tryRate: 0.58 },
      { name: 'Siosifa Talakai',   pos: 'centre',  tryRate: 0.50 },
      { name: 'Will Kennedy',      pos: 'fullback', tryRate: 0.38 },
      { name: 'Daniel Atkinson',   pos: 'wing',    tryRate: 0.42 },
      { name: 'Nicho Hynes',       pos: 'halfback', tryRate: 0.25 },
    ],
  },
  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins',
    players: [
      { name: 'Hamiso Tabuai-Fidow', pos: 'fullback', tryRate: 0.65 },
      { name: 'Jamayne Isaako',      pos: 'wing',     tryRate: 0.50 },
      { name: 'Herbie Farnworth',    pos: 'centre',   tryRate: 0.45 },
      { name: 'Selwyn Cobbo',        pos: 'wing',     tryRate: 0.40 },
      { name: 'Sean O\'Sullivan',    pos: 'halfback',  tryRate: 0.18 },
    ],
  },
  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans',
    players: [
      { name: 'AJ Brimson',              pos: 'fullback', tryRate: 0.42 },
      { name: 'Alofiana Khan-Pereira',   pos: 'wing',     tryRate: 0.50 },
      { name: 'Keano Kini',              pos: 'wing',     tryRate: 0.45 },
      { name: 'Brian Kelly',             pos: 'centre',   tryRate: 0.38 },
      { name: 'Kieran Foran',            pos: 'halfback',  tryRate: 0.15 },
    ],
  },
  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles',
    players: [
      { name: 'Jason Saab',          pos: 'wing',     tryRate: 0.62 },
      { name: 'Tom Trbojevic',       pos: 'fullback', tryRate: 0.55 },
      { name: 'Reuben Garrick',      pos: 'wing',     tryRate: 0.50 },
      { name: 'Morgan Harper',       pos: 'centre',   tryRate: 0.38 },
      { name: 'Daly Cherry-Evans',   pos: 'halfback',  tryRate: 0.18 },
    ],
  },
  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm',
    players: [
      { name: 'Xavier Coates',   pos: 'wing',       tryRate: 0.68 },
      { name: 'Will Warbrick',   pos: 'wing',       tryRate: 0.55 },
      { name: 'Nick Meaney',     pos: 'fullback',   tryRate: 0.40 },
      { name: 'Cameron Munster', pos: 'five-eighth',tryRate: 0.30 },
      { name: 'Jahrome Hughes',  pos: 'halfback',   tryRate: 0.25 },
    ],
  },
  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights',
    players: [
      { name: 'Dominic Young',    pos: 'wing',    tryRate: 0.58 },
      { name: 'Greg Marzhew',     pos: 'wing',    tryRate: 0.52 },
      { name: 'Bradman Best',     pos: 'centre',  tryRate: 0.45 },
      { name: 'Dane Gagai',       pos: 'centre',  tryRate: 0.40 },
      { name: 'Jackson Hastings', pos: 'halfback', tryRate: 0.20 },
    ],
  },
  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors',
    players: [
      { name: 'Dallin Watene-Zelezniak', pos: 'wing',    tryRate: 0.55 },
      { name: 'Marcelo Montoya',         pos: 'wing',    tryRate: 0.50 },
      { name: 'Adam Pompey',             pos: 'centre',  tryRate: 0.40 },
      { name: 'Luke Metcalf',            pos: 'halfback', tryRate: 0.22 },
      { name: 'Te Maire Martin',         pos: 'five-eighth', tryRate: 0.25 },
    ],
  },
  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys',
    players: [
      { name: 'Murray Taulagi',   pos: 'wing',     tryRate: 0.58 },
      { name: 'Kyle Feldt',       pos: 'wing',     tryRate: 0.52 },
      { name: 'Scott Drinkwater', pos: 'fullback', tryRate: 0.38 },
      { name: 'Heilum Luki',      pos: 'centre',   tryRate: 0.38 },
      { name: 'Tom Dearden',      pos: 'halfback',  tryRate: 0.22 },
    ],
  },
  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels',
    players: [
      { name: 'Maika Sivo',       pos: 'wing',     tryRate: 0.62 },
      { name: 'Haze Dunster',     pos: 'wing',     tryRate: 0.45 },
      { name: 'Clint Gutherson',  pos: 'fullback', tryRate: 0.38 },
      { name: 'Will Penisini',    pos: 'centre',   tryRate: 0.40 },
      { name: 'Mitchell Moses',   pos: 'halfback',  tryRate: 0.22 },
    ],
  },
  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers',
    players: [
      { name: "Brian To'o",      pos: 'wing',     tryRate: 0.72 },
      { name: 'Sunia Turuva',    pos: 'wing',     tryRate: 0.55 },
      { name: 'Paul Alamoti',    pos: 'centre',   tryRate: 0.42 },
      { name: 'Nathan Cleary',   pos: 'halfback',  tryRate: 0.28 },
      { name: 'Isaah Yeo',       pos: 'lock',     tryRate: 0.22 },
    ],
  },
  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs',
    players: [
      { name: 'Alex Johnston',    pos: 'wing',     tryRate: 0.72 },
      { name: 'Latrell Mitchell', pos: 'fullback', tryRate: 0.55 },
      { name: 'Campbell Graham', pos: 'centre',   tryRate: 0.45 },
      { name: 'Taane Milne',      pos: 'wing',     tryRate: 0.48 },
      { name: 'Lachlan Ilias',    pos: 'halfback',  tryRate: 0.20 },
    ],
  },
  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons',
    players: [
      { name: 'Zac Lomax',          pos: 'wing',     tryRate: 0.55 },
      { name: 'Mikaele Ravalawa',   pos: 'wing',     tryRate: 0.55 },
      { name: 'Tyrell Sloan',       pos: 'fullback', tryRate: 0.40 },
      { name: 'Moses Suli',         pos: 'centre',   tryRate: 0.42 },
      { name: 'Kyle Flanagan',      pos: 'halfback',  tryRate: 0.18 },
    ],
  },
  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters',
    players: [
      { name: 'Daniel Tupou',              pos: 'wing',     tryRate: 0.62 },
      { name: 'Mark Nawaqanitawase',       pos: 'wing',     tryRate: 0.55 },
      { name: 'James Tedesco',             pos: 'fullback', tryRate: 0.50 },
      { name: 'Joseph Manu',               pos: 'centre',   tryRate: 0.50 },
      { name: 'Luke Keary',                pos: 'halfback',  tryRate: 0.22 },
    ],
  },
  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers',
    players: [
      { name: "Starford To'a",    pos: 'wing',     tryRate: 0.52 },
      { name: 'David Nofoaluma', pos: 'wing',     tryRate: 0.55 },
      { name: 'Jahream Bula',     pos: 'wing',     tryRate: 0.45 },
      { name: 'Brent Naden',      pos: 'centre',   tryRate: 0.38 },
      { name: 'Jayden Sullivan',  pos: 'halfback',  tryRate: 0.20 },
    ],
  },
};
