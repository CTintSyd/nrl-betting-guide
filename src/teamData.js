// Static team metadata and player rosters for NRL simulation engine.
// Keys match The Odds API team names exactly.
// Player try rates are updated each round by scripts/update-team-data-players.py

const NRL_TEAM_DATA = {
  'Brisbane Broncos': {
    emoji: '🐻', shortName: 'Broncos', venue: 'Suncorp Stadium', wikiPage: 'Brisbane_Broncos', logoFile: 'brisbane-broncos.svg',
    players: [
      { name: "Josiah Karapani",                   pos: "wing",           tryRate: 0.3571 },
      { name: "Reece Walsh",                       pos: "fullback",       tryRate: 0.4545 },
      { name: "Adam Reynolds",                     pos: "halfback",       tryRate: 0.2727 },
      { name: "Kotoni Staggs",                     pos: "centre",         tryRate: 0.5833 },
      { name: "Jesse Arthars",                     pos: "wing",           tryRate: 0.5 },
      { name: "Xavier Willison",                   pos: "lock",           tryRate: 0.2667 },
    ],
  },

  'Canberra Raiders': {
    emoji: '🔋', shortName: 'Raiders', venue: 'GIO Stadium', wikiPage: 'Canberra_Raiders', logoFile: 'canberra-raiders.svg',
    players: [
      { name: "Savelio Tamale",                    pos: "wing",           tryRate: 0.5 },
      { name: "Kaeo Weekes",                       pos: "fullback",       tryRate: 0.5 },
      { name: "Ethan Strange",                     pos: "five-eighth",    tryRate: 0.3077 },
      { name: "Xavier Savage",                     pos: "wing",           tryRate: 0.6364 },
      { name: "Hudson Young",                      pos: "lock",           tryRate: 0.3333 },
      { name: "Matthew Timoko",                    pos: "centre",         tryRate: 0.3333 },
    ],
  },

  'Canterbury Bulldogs': {
    emoji: '🐕', shortName: 'Bulldogs', venue: 'Accor Stadium', wikiPage: 'Canterbury-Bankstown_Bulldogs', logoFile: 'canterbury-bulldogs.png',
    players: [
      { name: "Jacob Kiraz",                       pos: "wing",           tryRate: 0.5455 },
      { name: "Connor Tracey",                     pos: "fullback",       tryRate: 0.1538 },
      { name: "Lachlan Galvin",                    pos: "halfback",       tryRate: 0.4 },
      { name: "Sitili Tupouniua",                  pos: "lock",           tryRate: 0.2857 },
      { name: "Stephen Crichton",                  pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Jacob Preston",                     pos: "lock",           tryRate: 0.3636 },
    ],
  },

  'Cronulla Sutherland Sharks': {
    emoji: '🦈', shortName: 'Sharks', venue: 'PointsBet Stadium', wikiPage: 'Cronulla-Sutherland_Sharks', logoFile: 'cronulla-sharks.svg',
    players: [
      { name: "Ronaldo Mulitalo",                  pos: "wing",           tryRate: 1.0 },
      { name: "William Kennedy",                   pos: "fullback",       tryRate: 0.4286 },
      { name: "Braydon Trindall",                  pos: "five-eighth",    tryRate: 0.5 },
      { name: "KL Iro",                            pos: "centre",         tryRate: 0.6923 },
      { name: "Teig Wilton",                       pos: "lock",           tryRate: 0.5 },
      { name: "Samuel Stonestreet",                pos: "wing",           tryRate: 0.3333 },
    ],
  },

  'Dolphins': {
    emoji: '🐬', shortName: 'Dolphins', venue: 'Suncorp Stadium', wikiPage: 'Dolphins_NRL', logoFile: 'dolphins.png',
    players: [
      { name: "Jamayne Isaako",                    pos: "wing",           tryRate: 0.9333 },
      { name: "Hamiso Tabuai-Fidow",               pos: "fullback",       tryRate: 0.6667 },
      { name: "Kodi Nikorima",                     pos: "five-eighth",    tryRate: 0.25 },
      { name: "Selwyn Cobbo",                      pos: "wing",           tryRate: 0.8333 },
      { name: "Herbie Farnworth",                  pos: "centre",         tryRate: 0.5714 },
      { name: "Jake Averillo",                     pos: "centre",         tryRate: 0.8571 },
    ],
  },

  'Gold Coast Titans': {
    emoji: '🌊', shortName: 'Titans', venue: 'Cbus Super Stadium', wikiPage: 'Gold_Coast_Titans', logoFile: 'gold-coast-titans.svg',
    players: [
      { name: "Phillip Sami",                      pos: "wing",           tryRate: 0.7333 },
      { name: "Keano Kini",                        pos: "fullback",       tryRate: 0.1333 },
      { name: "Jayden Campbell",                   pos: "five-eighth",    tryRate: 0.5385 },
      { name: "Arama Hau",                         pos: "lock",           tryRate: 0.4 },
      { name: "Jojo Fifita",                       pos: "centre",         tryRate: 0.3846 },
      { name: "Sialetili Faeamani",                pos: "wing",           tryRate: 0.5 },
    ],
  },

  'Manly Warringah Sea Eagles': {
    emoji: '🦅', shortName: 'Sea Eagles', venue: '4 Pines Park', wikiPage: 'Manly-Warringah_Sea_Eagles', logoFile: 'manly-sea-eagles.png',
    players: [
      { name: "Lehi Hopoate",                      pos: "wing",           tryRate: 0.8571 },
      { name: "Clayton Faulalo",                   pos: "fullback",       tryRate: 0.5455 },
      { name: "Jamal Fogarty",                     pos: "halfback",       tryRate: 0.3077 },
      { name: "Jason Saab",                        pos: "wing",           tryRate: 0.5714 },
      { name: "Reuben Garrick",                    pos: "centre",         tryRate: 0.4286 },
      { name: "Tolutau Koula",                     pos: "centre",         tryRate: 0.4615 },
    ],
  },

  'Melbourne Storm': {
    emoji: '⛈️', shortName: 'Storm', venue: 'AAMI Park', wikiPage: 'Melbourne_Storm', logoFile: 'melbourne-storm.png',
    players: [
      { name: "Will Warbrick",                     pos: "wing",           tryRate: 0.9375 },
      { name: "Sualauvi Faalogo",                  pos: "fullback",       tryRate: 0.8125 },
      { name: "Cameron Munster",                   pos: "five-eighth",    tryRate: 0.2667 },
      { name: "Moses Leo",                         pos: "wing",           tryRate: 0.7273 },
      { name: "Harry Grant",                       pos: "hooker",         tryRate: 0.4 },
      { name: "Jack Howarth",                      pos: "centre",         tryRate: 0.3077 },
    ],
  },

  'Newcastle Knights': {
    emoji: '⚔️', shortName: 'Knights', venue: 'McDonald Jones Stadium', wikiPage: 'Newcastle_Knights', logoFile: 'newcastle-knights.png',
    players: [
      { name: "Greg Marzhew",                      pos: "wing",           tryRate: 1.0714 },
      { name: "Kalyn Ponga",                       pos: "fullback",       tryRate: 0.125 },
      { name: "Fletcher Sharpe",                   pos: "five-eighth",    tryRate: 0.5385 },
      { name: "Dominic Young",                     pos: "wing",           tryRate: 0.9333 },
      { name: "Dylan Lucas",                       pos: "lock",           tryRate: 0.6667 },
      { name: "Trey Mooney",                       pos: "prop",           tryRate: 0.3571 },
    ],
  },

  'New Zealand Warriors': {
    emoji: '⚔️', shortName: 'Warriors', venue: 'Go Media Stadium', wikiPage: 'New_Zealand_Warriors', logoFile: 'new-zealand-warriors.svg',
    players: [
      { name: "Dallin Watene-Zelezniak",           pos: "wing",           tryRate: 1.0667 },
      { name: "Taine Tuaupiki",                    pos: "fullback",       tryRate: 0.2 },
      { name: "Te Maire Martin",                   pos: "halfback",       tryRate: 0.6667 },
      { name: "Alofiana Khan-Pereira",             pos: "wing",           tryRate: 1.0 },
      { name: "Leka Halasima",                     pos: "lock",           tryRate: 0.4167 },
      { name: "Erin Clark",                        pos: "lock",           tryRate: 0.2667 },
    ],
  },

  'North Queensland Cowboys': {
    emoji: '🤠', shortName: 'Cowboys', venue: 'Qld Country Bank Stadium', wikiPage: 'North_Queensland_Cowboys', logoFile: 'north-queensland-cowboys.svg',
    players: [
      { name: "Murray Taulagi",                    pos: "wing",           tryRate: 1.0 },
      { name: "Scott Drinkwater",                  pos: "fullback",       tryRate: 0.5 },
      { name: "Jaxon Purdue",                      pos: "five-eighth",    tryRate: 0.375 },
      { name: "Braidon Burns",                     pos: "wing",           tryRate: 0.8333 },
      { name: "Heilum Luki",                       pos: "lock",           tryRate: 0.4375 },
      { name: "Jake Clifford",                     pos: "halfback",       tryRate: 0.375 },
    ],
  },

  'Parramatta Eels': {
    emoji: '🐟', shortName: 'Eels', venue: 'CommBank Stadium', wikiPage: 'Parramatta_Eels', logoFile: 'parramatta-eels.svg',
    players: [
      { name: "Josh Addo-Carr",                    pos: "wing",           tryRate: 0.4286 },
      { name: "Isaiah Iongi",                      pos: "fullback",       tryRate: 0.375 },
      { name: "Ronald Volkman",                    pos: "five-eighth",    tryRate: 0.3 },
      { name: "Brian Kelly",                       pos: "wing",           tryRate: 0.3077 },
      { name: "Sean Russell",                      pos: "centre",         tryRate: 0.3077 },
      { name: "Kelma Tuilagi",                     pos: "lock",           tryRate: 0.2143 },
    ],
  },

  'Penrith Panthers': {
    emoji: '🐾', shortName: 'Panthers', venue: 'BlueBet Stadium', wikiPage: 'Penrith_Panthers', logoFile: 'penrith-panthers.png',
    players: [
      { name: "Thomas Jenkins",                    pos: "wing",           tryRate: 1.5625 },
      { name: "Dylan Edwards",                     pos: "fullback",       tryRate: 0.625 },
      { name: "Blaize Talagi",                     pos: "five-eighth",    tryRate: 0.3125 },
      { name: "Brian To'o",                        pos: "wing",           tryRate: 0.6429 },
      { name: "Casey McLean",                      pos: "centre",         tryRate: 0.5 },
      { name: "Nathan Cleary",                     pos: "halfback",       tryRate: 0.3846 },
    ],
  },

  'South Sydney Rabbitohs': {
    emoji: '🐰', shortName: 'Rabbitohs', venue: 'Accor Stadium', wikiPage: 'South_Sydney_Rabbitohs', logoFile: 'south-sydney-rabbitohs.svg',
    players: [
      { name: "Alex Johnston",                     pos: "wing",           tryRate: 1.4615 },
      { name: "Jye Gray",                          pos: "fullback",       tryRate: 0.1667 },
      { name: "Cody Walker",                       pos: "five-eighth",    tryRate: 0.4 },
      { name: "Latrell Mitchell",                  pos: "centre",         tryRate: 1.2222 },
      { name: "Tallis Duncan",                     pos: "lock",           tryRate: 0.4667 },
      { name: "Campbell Graham",                   pos: "centre",         tryRate: 0.6 },
    ],
  },

  'St George Illawarra Dragons': {
    emoji: '🐉', shortName: 'Dragons', venue: 'Netstrata Jubilee Oval', wikiPage: 'St._George_Illawarra_Dragons', logoFile: 'st-george-illawarra.svg',
    players: [
      { name: "Setu Tu",                           pos: "wing",           tryRate: 0.5714 },
      { name: "Clinton Gutherson",                 pos: "fullback",       tryRate: 0.0769 },
      { name: "Daniel Atkinson",                   pos: "five-eighth",    tryRate: 0.0667 },
      { name: "Valentine Holmes",                  pos: "centre",         tryRate: 0.5 },
      { name: "Tyrell Sloan",                      pos: "wing",           tryRate: 0.5 },
      { name: "Mathew Feagai",                     pos: "centre",         tryRate: 0.25 },
    ],
  },

  'Sydney Roosters': {
    emoji: '🐓', shortName: 'Roosters', venue: 'Allianz Stadium', wikiPage: 'Sydney_Roosters', logoFile: 'sydney-roosters.png',
    players: [
      { name: "Mark Nawaqanitawase",               pos: "wing",           tryRate: 1.0909 },
      { name: "James Tedesco",                     pos: "fullback",       tryRate: 0.4286 },
      { name: "Sam Walker",                        pos: "halfback",       tryRate: 0.4286 },
      { name: "Robert Toia",                       pos: "centre",         tryRate: 0.6154 },
      { name: "Daniel Tupou",                      pos: "wing",           tryRate: 0.8 },
      { name: "Hugo Savala",                       pos: "centre",         tryRate: 0.5455 },
    ],
  },

  'Wests Tigers': {
    emoji: '🐯', shortName: 'Tigers', venue: 'Campbelltown Stadium', wikiPage: 'Wests_Tigers', logoFile: 'wests-tigers.svg',
    players: [
      { name: "Sunia Turuva",                      pos: "wing",           tryRate: 0.25 },
      { name: "Jahream Bula",                      pos: "fullback",       tryRate: 0.4615 },
      { name: "Adam Doueihi",                      pos: "halfback",       tryRate: 0.7 },
      { name: "Taylan May",                        pos: "centre",         tryRate: 0.6667 },
      { name: "Jarome Luai",                       pos: "five-eighth",    tryRate: 0.3333 },
      { name: "Kai Pearce-Paul",                   pos: "lock",           tryRate: 0.3333 },
    ],
  },
};
