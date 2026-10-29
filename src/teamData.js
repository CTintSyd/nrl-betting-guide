// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'brisbane-broncos.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.2 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.8 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 1.0 },
      { name: "Gehamat Shibasaki",                 pos: "centre",         tryRate: 0.3333 },
      { name: "Jordan Riki",                       pos: "lock",           tryRate: 0.3333 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'canberra-raiders.svg',
    players: [
      { name: "Savelio Tamale",                    pos: "wing",           tryRate: 0.6667 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.6667 },
      { name: "Ethan Strange",                     pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Hudson Young",                      pos: "lock",           tryRate: 0.5 },
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.6 },
      { name: "Simi Sasagi",                       pos: "centre",         tryRate: 0.1667 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'canterbury-bulldogs.png',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.6 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.4 },
      { name: "Matt Burton",                       pos: "five-eighth",    tryRate: 0.4 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.6 },
      { name: "Marcelo Montoya",                   pos: "wing",           tryRate: 0.2 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.2 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'cronulla-sharks.svg',
    players: [
      { name: "Sione Katoa",                       pos: "wing",           tryRate: 0.3333 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.6667 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.6667 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 0.3333 },
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.3333 },
      { name: "Nicholas Hynes",                    pos: "halfback",       tryRate: 0.3333 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'dolphins.png',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.6 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 1.0 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.0 },
      { name: "Jake Averillo",                     pos: "centre",         tryRate: 1.0 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.4 },
      { name: "Kulikefu Finefeuiaki",              pos: "lock",           tryRate: 0.4 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'gold-coast-titans.svg',
    players: [
      { name: "Sialetili Faeamani",                pos: "wing",           tryRate: 0.5 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.0 },
      { name: "Jayden Campbell",                   pos: "halfback",       tryRate: 1.0 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.5 },
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.5 },
      { name: "Arama Hau",                         pos: "lock",           tryRate: 0.5 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'manly-sea-eagles.png',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.6 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 1.2 },
      { name: "Jamal Fogarty",                     pos: "halfback",       tryRate: 0.4 },
      { name: "Tolutau Koula",                     pos: "centre",         tryRate: 0.6 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.6 },
      { name: "Haumole Olakau'atu",                pos: "lock",           tryRate: 0.6 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'melbourne-storm.png',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 1.0 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 1.0 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.0 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.4 },
      { name: "Joe Chan",                          pos: "lock",           tryRate: 0.4 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.5 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'newcastle-knights.png',
    players: [
      { name: "Dominic Young",                     pos: "wing",           tryRate: 1.5 },
      { name: "Fletcher Hunt",                     pos: "fullback",       tryRate: 0.5 },
      { name: "Fletcher Sharpe",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 0.8333 },
      { name: "Trey Mooney",                       pos: "prop",           tryRate: 0.4 },
      { name: "Dane Gagai",                        pos: "centre",         tryRate: 0.1667 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'new-zealand-warriors.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 1.1667 },
      { name: "Taine Tuaupiki",                    pos: "fullback",       tryRate: 0.0 },
      { name: "Tanah Boyd",                        pos: "halfback",       tryRate: 0.5 },
      { name: "Leka Halasima",                     pos: "lock",           tryRate: 0.6667 },
      { name: "Jackson Ford",                      pos: "prop",           tryRate: 0.5 },
      { name: "Charnze Nicoll-Klokstad",           pos: "centre",         tryRate: 0.75 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'north-queensland-cowboys.svg',
    players: [
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 1.0 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.5 },
      { name: "Jake Clifford",                     pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jaxon Purdue",                      pos: "centre",         tryRate: 0.8333 },
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.8 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.5 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'parramatta-eels.svg',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.6 },
      { name: "Isaiah Iongi",                      pos: "fullback",       tryRate: 0.5 },
      { name: "Jonah Pezet",                       pos: "five-eighth",    tryRate: 0.4 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.6 },
      { name: "Kelma Tuilagi",                     pos: "lock",           tryRate: 0.3333 },
      { name: "Bailey Simonsson",                  pos: "wing",           tryRate: 0.4 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'penrith-panthers.png',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 2.3333 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.8333 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3333 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.5 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.5 },
      { name: "Paul Alamoti",                      pos: "centre",         tryRate: 0.1667 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'south-sydney-rabbitohs.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.2 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.4 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.4 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.2 },
      { name: "Campbell Graham",                   pos: "wing",           tryRate: 0.75 },
      { name: "Jack Wighton",                      pos: "centre",         tryRate: 0.4 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'st-george-illawarra.svg',
    players: [
      { name: "Setu Tu",                           pos: "wing",           tryRate: 0.6667 },
      { name: "Tyrell Sloan",                      pos: "fullback",       tryRate: 0.3333 },
      { name: "Daniel Atkinson",                   pos: "five-eighth",    tryRate: 0.0 },
      { name: "Luciano Leilua",                    pos: "lock",           tryRate: 0.4 },
      { name: "Emre Guler",                        pos: "prop",           tryRate: 0.2 },
      { name: "Damien Cook",                       pos: "hooker",         tryRate: 0.2 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'sydney-roosters.png',
    players: [
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.8 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.4 },
      { name: "Daly Cherry-Evans",                 pos: "five-eighth",    tryRate: 0.6 },
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 0.6 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.75 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.2 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'wests-tigers.svg',
    players: [
      { name: "Luke Laulilii",                     pos: "wing",           tryRate: 0.5 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.8 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.4 },
      { name: "Sunia Turuva",                      pos: "centre",         tryRate: 0.8 },
      { name: "Kai Pearce-Paul",                   pos: "lock",           tryRate: 0.6 },
      { name: "Samuela Fainu",                     pos: "lock",           tryRate: 0.4 },
    ],
  },
};
