// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'brisbane-broncos.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.3 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.375 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.4 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 0.4211 },
      { name: "Xavier Willison",                   pos: "prop",           tryRate: 0.3182 },
      { name: "Jordan Riki",                       pos: "lock",           tryRate: 0.2 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'canberra-raiders.svg',
    players: [
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.5556 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.5652 },
      { name: "Ethan Strange",                     pos: "five-eighth",    tryRate: 0.3 },
      { name: "Simi Sasagi",                       pos: "centre",         tryRate: 0.4667 },
      { name: "Zac Hosking",                       pos: "lock",           tryRate: 0.2857 },
      { name: "Jed Stuart",                        pos: "wing",           tryRate: 0.3 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'canterbury-bulldogs.png',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.5 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.2 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.3636 },
      { name: "Matt Burton",                       pos: "centre",         tryRate: 0.381 },
      { name: "Stephen Crichton",                  pos: "five-eighth",    tryRate: 0.3889 },
      { name: "Jethro Rinakama",                   pos: "wing",           tryRate: 0.4667 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'cronulla-sharks.svg',
    players: [
      { name: "Sione Katoa",                       pos: "wing",           tryRate: 0.8125 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.4545 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.4286 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 0.6 },
      { name: "Ronaldo Mulitalo",                  pos: "wing",           tryRate: 0.9231 },
      { name: "Teig Wilton",                       pos: "lock",           tryRate: 0.4 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'dolphins.png',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.9545 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.6471 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.2105 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 0.8824 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.5238 },
      { name: "Connelly Lemuelu",                  pos: "lock",           tryRate: 0.2857 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'gold-coast-titans.svg',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.6818 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.1364 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.4 },
      { name: "Kurtis Morrin",                     pos: "lock",           tryRate: 0.35 },
      { name: "AJ Brimson",                        pos: "centre",         tryRate: 0.2 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'manly-sea-eagles.png',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.7143 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 0.5833 },
      { name: "Clayton Faulalo",                   pos: "five-eighth",    tryRate: 0.5 },
      { name: "Jason Saab",                        pos: "wing",           tryRate: 0.619 },
      { name: "Tolutau Koula",                     pos: "centre",         tryRate: 0.4737 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.381 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'melbourne-storm.png',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.8889 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 0.7273 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.2353 },
      { name: "Moses Leo",                         pos: "wing",           tryRate: 0.7333 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.3158 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.3529 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'newcastle-knights.png',
    players: [
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.0 },
      { name: "Kalyn Ponga",                       pos: "fullback",       tryRate: 0.3571 },
      { name: "Fletcher Sharpe",                   pos: "five-eighth",    tryRate: 0.5714 },
      { name: "Dominic Young",                     pos: "wing",           tryRate: 0.8696 },
      { name: "Fletcher Hunt",                     pos: "centre",         tryRate: 0.4783 },
      { name: "Dylan Lucas",                       pos: "lock",           tryRate: 0.625 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'new-zealand-warriors.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 0.9524 },
      { name: "Charnze Nicoll-Klokstad",           pos: "fullback",       tryRate: 0.7143 },
      { name: "Chanel Harris-Tavita",              pos: "halfback",       tryRate: 0.381 },
      { name: "Alofiana Khan-Pereira",             pos: "wing",           tryRate: 0.9375 },
      { name: "Leka Halasima",                     pos: "centre",         tryRate: 0.4211 },
      { name: "Jacob Laban",                       pos: "lock",           tryRate: 0.2727 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'north-queensland-cowboys.svg',
    players: [
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.7778 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.4091 },
      { name: "Jaxon Purdue",                      pos: "halfback",       tryRate: 0.3636 },
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 0.6471 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.4545 },
      { name: "Tom Chester",                       pos: "centre",         tryRate: 0.4286 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'parramatta-eels.svg',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.3333 },
      { name: "Isaiah Iongi",                      pos: "fullback",       tryRate: 0.3846 },
      { name: "Ronald Volkman",                    pos: "five-eighth",    tryRate: 0.4118 },
      { name: "Tallyn Da Silva",                   pos: "hooker",         tryRate: 0.4545 },
      { name: "Brian Kelly",                       pos: "wing",           tryRate: 0.25 },
      { name: "Sean Russell",                      pos: "fullback",       tryRate: 0.25 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'penrith-panthers.png',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 1.2727 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.5263 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3158 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.7 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.4375 },
      { name: "Liam Martin",                       pos: "lock",           tryRate: 0.3571 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'south-sydney-rabbitohs.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.4737 },
      { name: "Matthew Dufty",                     pos: "fullback",       tryRate: 0.2 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.381 },
      { name: "Campbell Graham",                   pos: "wing",           tryRate: 0.6875 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.2222 },
      { name: "Tallis Duncan",                     pos: "centre",         tryRate: 0.5 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'st-george-illawarra.svg',
    players: [
      { name: "Tyrell Sloan",                      pos: "wing",           tryRate: 0.5556 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.1765 },
      { name: "Kyle Flanagan",                     pos: "halfback",       tryRate: 0.0476 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.4545 },
      { name: "Hamish Stewart",                    pos: "lock",           tryRate: 0.2273 },
      { name: "Mathew Feagai",                     pos: "wing",           tryRate: 0.2941 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'sydney-roosters.png',
    players: [
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 0.8824 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.6875 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.4737 },
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.9231 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.5556 },
      { name: "Hugo Savala",                       pos: "centre",         tryRate: 0.4706 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'wests-tigers.svg',
    players: [
      { name: "Sunia Turuva",                      pos: "wing",           tryRate: 0.2381 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.3333 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.5714 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 0.6667 },
      { name: "Jarome Luai",                       pos: "five-eighth",    tryRate: 0.2353 },
      { name: "Jeral Skelton",                     pos: "wing",           tryRate: 0.2857 },
    ],
  },
};
