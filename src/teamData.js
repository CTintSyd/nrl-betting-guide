// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'Brisbane_Broncos_logo.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.3 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.625 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.2727 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 0.6667 },
      { name: "Gehamat Shibasaki",                 pos: "centre",         tryRate: 0.2727 },
      { name: "Jordan Riki",                       pos: "lock",           tryRate: 0.2727 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'Canberra_Raiders_logo.svg',
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
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'Canterbury-Bankstown_Bulldogs_logo.svg',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.6667 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.2 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.4 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.4 },
      { name: "Matt Burton",                       pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Sitili Tupouniua",                  pos: "lock",           tryRate: 0.2 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'Cronulla-Sutherland_Sharks_logo.svg',
    players: [
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.3 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.5 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.5 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 0.9 },
      { name: "Teig Wilton",                       pos: "lock",           tryRate: 0.625 },
      { name: "Nicholas Hynes",                    pos: "halfback",       tryRate: 0.4 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'Dolphins_NRL_logo.svg',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.9 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.7 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.125 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 0.6 },
      { name: "Jake Averillo",                     pos: "centre",         tryRate: 0.8571 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.5 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'Gold_Coast_Titans_logo.svg',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.4 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.1 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.5 },
      { name: "Sialetili Faeamani",                pos: "wing",           tryRate: 0.5 },
      { name: "Cooper Bai",                        pos: "lock",           tryRate: 0.2 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'Manly-Warringah_Sea_Eagles_logo.svg',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.9 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 1.0 },
      { name: "Jamal Fogarty",                     pos: "halfback",       tryRate: 0.375 },
      { name: "Tolutau Koula",                     pos: "centre",         tryRate: 0.5 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.5 },
      { name: "Haumole Olakau'atu",                pos: "lock",           tryRate: 0.4 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'Melbourne_Storm_logo.svg',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.8182 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 1.0909 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.2727 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.4545 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.4 },
      { name: "Moses Leo",                         pos: "wing",           tryRate: 0.5 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'Newcastle_Knights_logo.svg',
    players: [
      { name: "Dominic Young",                     pos: "wing",           tryRate: 1.2727 },
      { name: "Kalyn Ponga",                       pos: "fullback",       tryRate: 0.2 },
      { name: "Dylan Brown",                       pos: "halfback",       tryRate: 0.1429 },
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.4 },
      { name: "Trey Mooney",                       pos: "prop",           tryRate: 0.5 },
      { name: "Fletcher Sharpe",                   pos: "centre",         tryRate: 0.4444 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'New_Zealand_Warriors_logo.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 1.2 },
      { name: "Charnze Nicoll-Klokstad",           pos: "fullback",       tryRate: 0.6 },
      { name: "Tanah Boyd",                        pos: "halfback",       tryRate: 0.3 },
      { name: "Alofiana Khan-Pereira",             pos: "wing",           tryRate: 1.0 },
      { name: "Leka Halasima",                     pos: "lock",           tryRate: 0.5 },
      { name: "Erin Clark",                        pos: "lock",           tryRate: 0.4 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'North_Queensland_Cowboys_logo.svg',
    players: [
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 1.2857 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.6364 },
      { name: "Jake Clifford",                     pos: "halfback",       tryRate: 0.4545 },
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.8 },
      { name: "Jaxon Purdue",                      pos: "centre",         tryRate: 0.5455 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.4545 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'Parramatta_Eels_logo.svg',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.6 },
      { name: "Joash Papalii",                     pos: "fullback",       tryRate: 0.2727 },
      { name: "Ronald Volkman",                    pos: "five-eighth",    tryRate: 0.5 },
      { name: "Tallyn Da Silva",                   pos: "hooker",         tryRate: 0.3636 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.4444 },
      { name: "Will Penisini",                     pos: "centre",         tryRate: 0.6 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'Penrith_Panthers_logo.svg',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 1.6364 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.8182 },
      { name: "Blaize Talagi",                     pos: "five-eighth",    tryRate: 0.4545 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.6364 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3636 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.4 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'South_Sydney_Rabbitohs_logo.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.5556 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.2857 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.4 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.2222 },
      { name: "Campbell Graham",                   pos: "centre",         tryRate: 0.6667 },
      { name: "Tallis Duncan",                     pos: "lock",           tryRate: 0.5 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'St._George_Illawarra_Dragons_logo.svg',
    players: [
      { name: "Setu Tu",                           pos: "wing",           tryRate: 0.5 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.1429 },
      { name: "Kyle Flanagan",                     pos: "halfback",       tryRate: 0.0 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.2 },
      { name: "Damien Cook",                       pos: "hooker",         tryRate: 0.2 },
      { name: "Hamish Stewart",                    pos: "lock",           tryRate: 0.2 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'Sydney_Roosters_logo.svg',
    players: [
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.8 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.6 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.5 },
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 0.875 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.6667 },
      { name: "Hugo Savala",                       pos: "centre",         tryRate: 0.7143 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'Wests_Tigers_logo.svg',
    players: [
      { name: "Luke Laulilii",                     pos: "wing",           tryRate: 0.6667 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.7143 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.625 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 0.8333 },
      { name: "Sunia Turuva",                      pos: "wing",           tryRate: 0.4 },
      { name: "Kai Pearce-Paul",                   pos: "lock",           tryRate: 0.4444 },
    ],
  },
};
