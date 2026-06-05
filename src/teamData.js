// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'brisbane-broncos.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.3636 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.5556 },
      { name: "Ezra Mam",                          pos: "five-eighth",    tryRate: 0.25 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 0.6 },
      { name: "Xavier Willison",                   pos: "lock",           tryRate: 0.3333 },
      { name: "Jesse Arthars",                     pos: "wing",           tryRate: 0.5714 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'canberra-raiders.svg',
    players: [
      { name: "Savelio Tamale",                    pos: "wing",           tryRate: 0.5 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.6154 },
      { name: "Ethan Strange",                     pos: "five-eighth",    tryRate: 0.3636 },
      { name: "Sebastian Kris",                    pos: "centre",         tryRate: 0.3636 },
      { name: "Simi Sasagi",                       pos: "lock",           tryRate: 0.4444 },
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.5 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'canterbury-bulldogs.png',
    players: [
      { name: "Enari Tuala",                       pos: "wing",           tryRate: 0.2 },
      { name: "Jacob Kiraz",                       pos: "fullback",       tryRate: 0.75 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.4167 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.3636 },
      { name: "Sitili Tupouniua",                  pos: "lock",           tryRate: 0.25 },
      { name: "Matt Burton",                       pos: "five-eighth",    tryRate: 0.2727 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'cronulla-sharks.svg',
    players: [
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.2727 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.4545 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.5455 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 0.9 },
      { name: "Teig Wilton",                       pos: "lock",           tryRate: 0.6667 },
      { name: "Billy Burns",                       pos: "lock",           tryRate: 0.3636 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'dolphins.png',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.9091 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.7 },
      { name: "Bradley Schneider",                 pos: "five-eighth",    tryRate: 0.1111 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 0.6 },
      { name: "Jake Averillo",                     pos: "centre",         tryRate: 0.8571 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.5 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'gold-coast-titans.svg',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.4545 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.0909 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.4444 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.5 },
      { name: "Arama Hau",                         pos: "lock",           tryRate: 0.3636 },
      { name: "Sialetili Faeamani",                pos: "wing",           tryRate: 0.5 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'manly-sea-eagles.png',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.8333 },
      { name: "Clayton Faulalo",                   pos: "fullback",       tryRate: 0.5455 },
      { name: "Jamal Fogarty",                     pos: "halfback",       tryRate: 0.3636 },
      { name: "Jason Saab",                        pos: "wing",           tryRate: 0.5833 },
      { name: "Tom Trbojevic",                     pos: "fullback",       tryRate: 1.0 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.3846 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'melbourne-storm.png',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.7857 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 0.8571 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.2308 },
      { name: "Moses Leo",                         pos: "wing",           tryRate: 0.7778 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.4615 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.3333 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'newcastle-knights.png',
    players: [
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.25 },
      { name: "Kalyn Ponga",                       pos: "fullback",       tryRate: 0.1429 },
      { name: "Fletcher Sharpe",                   pos: "five-eighth",    tryRate: 0.4545 },
      { name: "Dominic Young",                     pos: "wing",           tryRate: 1.0769 },
      { name: "Fletcher Hunt",                     pos: "centre",         tryRate: 0.5385 },
      { name: "Dylan Lucas",                       pos: "lock",           tryRate: 0.6364 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'new-zealand-warriors.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 1.1667 },
      { name: "Charnze Nicoll-Klokstad",           pos: "fullback",       tryRate: 0.6 },
      { name: "Chanel Harris-Tavita",              pos: "five-eighth",    tryRate: 0.2727 },
      { name: "Alofiana Khan-Pereira",             pos: "wing",           tryRate: 1.125 },
      { name: "Leka Halasima",                     pos: "lock",           tryRate: 0.4167 },
      { name: "Jackson Ford",                      pos: "prop",           tryRate: 0.3333 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'north-queensland-cowboys.svg',
    players: [
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 1.125 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.5385 },
      { name: "Jake Clifford",                     pos: "halfback",       tryRate: 0.3846 },
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.8 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.5385 },
      { name: "Jaxon Purdue",                      pos: "centre",         tryRate: 0.4615 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'parramatta-eels.svg',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.5455 },
      { name: "Isaiah Iongi",                      pos: "fullback",       tryRate: 0.6 },
      { name: "Joash Papalii",                     pos: "five-eighth",    tryRate: 0.25 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.4 },
      { name: "Brian Kelly",                       pos: "wing",           tryRate: 0.3 },
      { name: "Ronald Volkman",                    pos: "halfback",       tryRate: 0.4286 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'penrith-panthers.png',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 1.5 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.75 },
      { name: "Blaize Talagi",                     pos: "five-eighth",    tryRate: 0.4167 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.6364 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.5455 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3636 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'south-sydney-rabbitohs.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.3636 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.2222 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.2222 },
      { name: "Campbell Graham",                   pos: "centre",         tryRate: 0.6 },
      { name: "Tallis Duncan",                     pos: "lock",           tryRate: 0.4167 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'st-george-illawarra.svg',
    players: [
      { name: "Setu Tu",                           pos: "wing",           tryRate: 0.6 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.1111 },
      { name: "Daniel Atkinson",                   pos: "five-eighth",    tryRate: 0.0909 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.3333 },
      { name: "Christian Tuipulotu",               pos: "wing",           tryRate: 0.3333 },
      { name: "Moses Suli",                        pos: "centre",         tryRate: 0.25 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'sydney-roosters.png',
    players: [
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 1.1111 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.5 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.4167 },
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.8 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.5455 },
      { name: "Hugo Savala",                       pos: "centre",         tryRate: 0.6667 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'wests-tigers.svg',
    players: [
      { name: "Luke Laulilii",                     pos: "wing",           tryRate: 0.6667 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.75 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.625 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 0.8333 },
      { name: "Sunia Turuva",                      pos: "centre",         tryRate: 0.3636 },
      { name: "Kai Pearce-Paul",                   pos: "lock",           tryRate: 0.4 },
    ],
  },
};
