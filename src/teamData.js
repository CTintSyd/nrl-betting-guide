// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'brisbane-broncos.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.0 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.6667 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.0 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 1.0 },
      { name: "Jordan Riki",                       pos: "lock",           tryRate: 0.6667 },
      { name: "Payne Haas",                        pos: "prop",           tryRate: 0.3333 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'canberra-raiders.svg',
    players: [
      { name: "Savelio Tamale",                    pos: "wing",           tryRate: 0.6667 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.3333 },
      { name: "Ethan Sanders",                     pos: "halfback",       tryRate: 0.3333 },
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.6667 },
      { name: "Noah Martin",                       pos: "lock",           tryRate: 0.6667 },
      { name: "Simi Sasagi",                       pos: "centre",         tryRate: 0.0 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'canterbury-bulldogs.png',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.45 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.1818 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.4167 },
      { name: "Matt Burton",                       pos: "centre",         tryRate: 0.3913 },
      { name: "Stephen Crichton",                  pos: "five-eighth",    tryRate: 0.35 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.35 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'cronulla-sharks.svg',
    players: [
      { name: "Sione Katoa",                       pos: "wing",           tryRate: 0.6667 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.3333 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 1.0 },
      { name: "Jesse Ramien",                      pos: "centre",         tryRate: 0.6667 },
      { name: "Nicholas Hynes",                    pos: "halfback",       tryRate: 0.6667 },
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.3333 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'dolphins.png',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.8636 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.6471 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.2105 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 1.0 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.5714 },
      { name: "Connelly Lemuelu",                  pos: "lock",           tryRate: 0.25 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'gold-coast-titans.svg',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.6364 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.1364 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.4211 },
      { name: "Kurtis Morrin",                     pos: "lock",           tryRate: 0.3 },
      { name: "AJ Brimson",                        pos: "centre",         tryRate: 0.25 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'manly-sea-eagles.png',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.8261 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 0.5714 },
      { name: "Clayton Faulalo",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jason Saab",                        pos: "wing",           tryRate: 0.6522 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.4783 },
      { name: "Haumole Olakau'atu",                pos: "lock",           tryRate: 0.4286 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'melbourne-storm.png',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.6667 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 2.0 },
      { name: "Jahrome Hughes",                    pos: "halfback",       tryRate: 0.3333 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 1.0 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.6667 },
      { name: "Moses Leo",                         pos: "centre",         tryRate: 0.6667 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'newcastle-knights.png',
    players: [
      { name: "Dominic Young",                     pos: "wing",           tryRate: 1.0 },
      { name: "Fletcher Hunt",                     pos: "fullback",       tryRate: 0.6667 },
      { name: "Sandon Smith",                      pos: "halfback",       tryRate: 0.0 },
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.0 },
      { name: "Bradman Best",                      pos: "centre",         tryRate: 0.3333 },
      { name: "Trey Mooney",                       pos: "prop",           tryRate: 0.3333 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'new-zealand-warriors.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 0.6667 },
      { name: "Taine Tuaupiki",                    pos: "fullback",       tryRate: 0.0 },
      { name: "Tanah Boyd",                        pos: "halfback",       tryRate: 1.0 },
      { name: "Leka Halasima",                     pos: "centre",         tryRate: 1.3333 },
      { name: "Jackson Ford",                      pos: "prop",           tryRate: 0.6667 },
      { name: "Ali Leiataua",                      pos: "centre",         tryRate: 0.3333 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'north-queensland-cowboys.svg',
    players: [
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.7895 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.3913 },
      { name: "Jake Clifford",                     pos: "five-eighth",    tryRate: 0.3913 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.4783 },
      { name: "Tom Chester",                       pos: "centre",         tryRate: 0.5 },
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 0.6875 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'parramatta-eels.svg',
    players: [
      { name: "Bailey Simonsson",                  pos: "wing",           tryRate: 0.0 },
      { name: "Isaiah Iongi",                      pos: "fullback",       tryRate: 0.6667 },
      { name: "Jonah Pezet",                       pos: "five-eighth",    tryRate: 0.6667 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.6667 },
      { name: "Kelma Tuilagi",                     pos: "lock",           tryRate: 0.6667 },
      { name: "Ryley Smith",                       pos: "hooker",         tryRate: 0.3333 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'penrith-panthers.png',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 2.6667 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 1.0 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3333 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.6667 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.3333 },
      { name: "Paul Alamoti",                      pos: "centre",         tryRate: 0.0 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'south-sydney-rabbitohs.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.35 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.2 },
      { name: "Jayden Sullivan",                   pos: "halfback",       tryRate: 0.05 },
      { name: "Tallis Duncan",                     pos: "centre",         tryRate: 0.6 },
      { name: "Campbell Graham",                   pos: "wing",           tryRate: 0.7059 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.0909 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'st-george-illawarra.svg',
    players: [
      { name: "Tyrell Sloan",                      pos: "wing",           tryRate: 0.6 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.1765 },
      { name: "Kyle Flanagan",                     pos: "halfback",       tryRate: 0.0435 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.4167 },
      { name: "Hamish Stewart",                    pos: "lock",           tryRate: 0.2083 },
      { name: "Mathew Feagai",                     pos: "wing",           tryRate: 0.2632 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'sydney-roosters.png',
    players: [
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.3333 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.6667 },
      { name: "Daly Cherry-Evans",                 pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 0.3333 },
      { name: "Angus Crichton",                    pos: "lock",           tryRate: 0.3333 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.0 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'wests-tigers.svg',
    players: [
      { name: "Jeral Skelton",                     pos: "wing",           tryRate: 0.4706 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.2857 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.5714 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 0.6667 },
      { name: "Jarome Luai",                       pos: "five-eighth",    tryRate: 0.2 },
      { name: "Samuela Fainu",                     pos: "lock",           tryRate: 0.25 },
    ],
  },
};
