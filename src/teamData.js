// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.3333 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.7143 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.3 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 0.6667 },
      { name: "Gehamat Shibasaki",                 pos: "centre",         tryRate: 0.3 },
      { name: "Jordan Riki",                       pos: "lock",           tryRate: 0.3 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders',
    players: [
      { name: "Savelio Tamale",                    pos: "wing",           tryRate: 0.5556 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.7 },
      { name: "Ethan Strange",                     pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Simi Sasagi",                       pos: "lock",           tryRate: 0.4444 },
      { name: "Hudson Young",                      pos: "lock",           tryRate: 0.375 },
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.6 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.6667 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.2222 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.4444 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.3333 },
      { name: "Matt Burton",                       pos: "five-eighth",    tryRate: 0.375 },
      { name: "Sitili Tupouniua",                  pos: "lock",           tryRate: 0.2222 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks',
    players: [
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.3333 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.4444 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.4444 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 1.0 },
      { name: "Teig Wilton",                       pos: "lock",           tryRate: 0.7143 },
      { name: "Nicholas Hynes",                    pos: "halfback",       tryRate: 0.3333 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 1.0 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.6667 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.1429 },
      { name: "Jake Averillo",                     pos: "centre",         tryRate: 0.8571 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 0.5556 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.4444 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.4444 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.1111 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.5714 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.5556 },
      { name: "Sialetili Faeamani",                pos: "wing",           tryRate: 0.5 },
      { name: "Cooper Bai",                        pos: "lock",           tryRate: 0.2222 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.8889 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 1.0 },
      { name: "Jamal Fogarty",                     pos: "halfback",       tryRate: 0.4286 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.5556 },
      { name: "Tolutau Koula",                     pos: "fullback",       tryRate: 0.4444 },
      { name: "Haumole Olakau'atu",                pos: "lock",           tryRate: 0.3333 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.9 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 1.2 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.2 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.4 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.3333 },
      { name: "Nick Meaney",                       pos: "centre",         tryRate: 0.2222 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights',
    players: [
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.4444 },
      { name: "Kalyn Ponga",                       pos: "fullback",       tryRate: 0.25 },
      { name: "Fletcher Sharpe",                   pos: "five-eighth",    tryRate: 0.25 },
      { name: "Dominic Young",                     pos: "wing",           tryRate: 1.1 },
      { name: "Trey Mooney",                       pos: "prop",           tryRate: 0.5556 },
      { name: "Dylan Lucas",                       pos: "lock",           tryRate: 0.5 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 1.1111 },
      { name: "Charnze Nicoll-Klokstad",           pos: "fullback",       tryRate: 0.6 },
      { name: "Tanah Boyd",                        pos: "halfback",       tryRate: 0.3333 },
      { name: "Alofiana Khan-Pereira",             pos: "wing",           tryRate: 1.2 },
      { name: "Leka Halasima",                     pos: "lock",           tryRate: 0.5556 },
      { name: "Jackson Ford",                      pos: "prop",           tryRate: 0.4444 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys',
    players: [
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 1.2857 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.6 },
      { name: "Jake Clifford",                     pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jaxon Purdue",                      pos: "centre",         tryRate: 0.6 },
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.6667 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.5 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.6667 },
      { name: "Joash Papalii",                     pos: "fullback",       tryRate: 0.2 },
      { name: "Ronald Volkman",                    pos: "five-eighth",    tryRate: 0.6 },
      { name: "Tallyn Da Silva",                   pos: "hooker",         tryRate: 0.4 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.375 },
      { name: "Will Penisini",                     pos: "centre",         tryRate: 0.6 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 1.6 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.9 },
      { name: "Blaize Talagi",                     pos: "five-eighth",    tryRate: 0.5 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.6 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.4 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.4444 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.5556 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.3333 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.4444 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.375 },
      { name: "Campbell Graham",                   pos: "centre",         tryRate: 0.75 },
      { name: "Tallis Duncan",                     pos: "lock",           tryRate: 0.5556 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons',
    players: [
      { name: "Setu Tu",                           pos: "wing",           tryRate: 0.5714 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.1667 },
      { name: "Daniel Atkinson",                   pos: "five-eighth",    tryRate: 0.0 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.2222 },
      { name: "Damien Cook",                       pos: "hooker",         tryRate: 0.2222 },
      { name: "Hamish Stewart",                    pos: "lock",           tryRate: 0.2222 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters',
    players: [
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.8889 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.6667 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.5556 },
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 0.875 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.75 },
      { name: "Daly Cherry-Evans",                 pos: "five-eighth",    tryRate: 0.4444 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers',
    players: [
      { name: "Luke Laulilii",                     pos: "wing",           tryRate: 0.625 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.7143 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.625 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 1.0 },
      { name: "Sunia Turuva",                      pos: "wing",           tryRate: 0.4444 },
      { name: "Kai Pearce-Paul",                   pos: "lock",           tryRate: 0.375 },
    ],
  },
};
