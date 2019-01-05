
var eventGames = {
	arms:  "ARMS",
	kart:  "Mario Kart 8 Deluxe",
	splat: "Splatoon 2",
	smash: "Super Smash Bros. Ultimate",
}

var leaderboardTiers = {
	arms : [
		{ start :        0, name : "Test Subject", color : "white"},
		{ start :        1, name : "Intern",       color : "#bfffff"},
		{ start :      100, name : "Technician",   color : "#00ffff"},
		{ start :      250, name : "Analyst",      color : "#00ff00"},
		{ start :      500, name : "Coder",        color : "#aaff00"},
		{ start :     1000, name : "Researcher",   color : "#ffae00"},
		{ start :     2000, name : "Scientist",    color : "#ff6000"},
		{ start :     3000, name : "Manager",      color : "#ff0004"},
		{ start :     5000, name : "VP",           color : "#ff006f"},
		{ start :     7000, name : "EVP",          color : "#ff00e6"},
		{ start :    10000, name : "Codirector",   color : "#b700ff"},
		{ start : 10000000, name : "[Dummy]",      color : "white"},
	],
	kart : [
		{ start :        0, name : "[Dummy]",       color : "white"},
		{ start :        1, name : "Shell",         color : "#bfffff"},
		{ start :      300, name : "Mushroom",      color : "#00ffff"},
		{ start :      700, name : "Banana",        color : "#00ff00"},
		{ start :     1500, name : "Flower",        color : "#aaff00"},
		{ start :     3000, name : "Leaf",          color : "#ffae00"},
		{ start :     6000, name : "Star",          color : "#ff6000"},
		{ start :     9000, name : "Egg",           color : "#ff0004"},
		{ start :    15000, name : "Bell",          color : "#ff006f"},
		{ start :    21000, name : "Lightning",     color : "#ff00e6"},
		{ start :    30000, name : "Special",       color : "#b700ff"},
		{ start : 10000000, name : "[Dummy]",       color : "white"},
	],
	splat : [
		{ start :        0, name : "[Dummy]",       color : "white"},
		{ start :        1, name : "Intern",        color : "#bfffff"},
		{ start :      100, name : "Trainee",       color : "#00ffff"},
		{ start :      250, name : "Apprentice",    color : "#00ff00"},
		{ start :      500, name : "Temp Worker",   color : "#aaff00"},
		{ start :     1000, name : "Part-Timer",    color : "#ffae00"},
		{ start :     2000, name : "Full-Timer",    color : "#ff6000"},
		{ start :     3000, name : "Go-Getter",     color : "#ff0004"},
		{ start :     5000, name : "Supervisor",    color : "#ff006f"},
		{ start :     7000, name : "Overachiever",  color : "#ff00e6"},
		{ start :    10000, name : "Profreshional", color : "#b700ff"},
		{ start : 10000000, name : "[Dummy]",       color : "white"},
	],
	smash : [],
};

var leaderboardTitles = {
	arms  : { prefix: "ARMS Labs ", suffix: ""},
	kart  : { prefix: "", suffix: " Cup Racer"},
	splat : { prefix: "Grizzco ", suffix: ""},
	smash : { prefix: "Smashing ", suffix: ""},
}

var patreonTiers = [
	{ start :  1, name : "Casual Contributor", color : "#2E666B"},
	{ start :  5, name : "Committed Casual",   color : "#0A680D"},
	{ start : 25, name : "True Casual",        color : "#8c230B"},
];

var badgeList = {
	
	casualcouple : { caption : "Casual ARMS Founder", style : "light", criterion: "This is a special badge for the two founders of Casual ARMS" },
	casualcrew : { caption : "Casual Crew Member", style : "dark", criterion: "Be a current or former member of the Casual Crew" },
	host : { caption : "Official Lobby Host", style : "dark", criterion: "Volunteer as a host of Casual ARMS lobby events" },
	cgc : { caption : "Cobra Gloves Club", style : "light", criterion: "Join the CGC and the Cobra hive mind by playing gloves-only Kid Cobra with a CGC member" },
	
	clash : { caption : "Casual Clash Participant", style : "light", criterion: "Play in a Casual Clash" },
	clash_win : { caption : "Casual Clash Champion", style : "hololight", criterion: "Achieve victory in a Casual Clash" },
	
	scramble : { caption : "Casual Scramble Participant", style : "dark", criterion: "Play in a Casual Scramble" },
	scramble_win : { caption : "Casual Scramble Sovereign", style : "holodark", criterion: "Achieve victory in a Casual Scramble" },
	
	season_arms     : { caption : "Monthly ARMS Leaderboards", style : "light", criterion: "Finish top 10 in the monthly ARMS leaderboards" },
	season_arms_win : { caption : "Monthly ARMS Leaderboards Win", style : "hololight", criterion: "Finish as the winner in the monthly ARMS leaderboards" },
	
	season_kart     : { caption : "Monthly Mario Kart Leaderboards", style : "light", criterion: "Finish top 10 in the monthly Mario Kart leaderboards" },
	season_kart_win : { caption : "Monthly Mario Kart Leaderboards Win", style : "hololight", criterion: "Finish as the winner in the monthly Mario Kart leaderboards" },
	
	p0 : { caption : "Patreon: Casual Contributor", style : "light", criterion: "Contribute more than $1 on the Patreon for at least one month" },
	p1 : { caption : "Patreon: Committed Casual",   style : "light", criterion: "Contribute more than $5 on the Patreon for at least one month" },
	p2 : { caption : "Patreon: True Casual",        style : "dark",  criterion: "Contribute more than $25 on the Patreon for at least one month" },
	
	arms_ldb0 : { caption : "ARMS Labs Intern",     style : "light", criterion: "Earn at least 1 coin in ARMS lobbies"},
	arms_ldb1 : { caption : "ARMS Labs Technician", style : "light", criterion: "Earn at least 100 coins in ARMS lobbies" },
	arms_ldb2 : { caption : "ARMS Labs Analyst",    style : "light", criterion: "Earn at least 250 coins in ARMS lobbies" },
	arms_ldb3 : { caption : "ARMS Labs Coder",      style : "light", criterion: "Earn at least 500 coins in ARMS lobbies" },
	arms_ldb4 : { caption : "ARMS Labs Researcher", style : "light", criterion: "Earn at least 1000 coins in ARMS lobbies" },
	arms_ldb5 : { caption : "ARMS Labs Scientist",  style : "light", criterion: "Earn at least 2000 coins in ARMS lobbies" },
	arms_ldb6 : { caption : "ARMS Labs Manager",    style : "light", criterion: "Earn at least 3000 coins in ARMS lobbies" },
	arms_ldb7 : { caption : "ARMS Labs VP",         style : "light", criterion: "Earn at least 5000 coins in ARMS lobbies" },
	arms_ldb8 : { caption : "ARMS Labs EVP",        style : "light", criterion: "Earn at least 7000 coins in ARMS lobbies" },
	arms_ldb9 : { caption : "ARMS Labs Codirector", style : "light", criterion: "Earn at least 10000 coins in ARMS lobbies" },
	
	kart_ldb0 : { caption : "Shell Cup Racer",     style : "light", criterion: "Earn at least 1 point in Mario Kart events"},
	kart_ldb1 : { caption : "Mushroom Cup Racer",  style : "light", criterion: "Earn at least 300 points in Mario Kart events" },
	kart_ldb2 : { caption : "Banana Cup Racer",    style : "light", criterion: "Earn at least 700 points in Mario Kart events" },
	kart_ldb3 : { caption : "Flower Cup Racer",    style : "light", criterion: "Earn at least 1500 points in Mario Kart events" },
	kart_ldb4 : { caption : "Leaf Cup Racer",      style : "light", criterion: "Earn at least 3000 points in Mario Kart events" },
	kart_ldb5 : { caption : "Star Cup Racer",      style : "light", criterion: "Earn at least 6000 points in Mario Kart events" },
	kart_ldb6 : { caption : "Egg Cup Racer",       style : "light", criterion: "Earn at least 9000 points in Mario Kart events" },
	kart_ldb7 : { caption : "Bell Cup Racer",      style : "light", criterion: "Earn at least 15000 points in Mario Kart events" },
	kart_ldb8 : { caption : "Lightning Cup Racer", style : "light", criterion: "Earn at least 21000 points in Mario Kart events" },
	kart_ldb9 : { caption : "Special Cup Racer",   style : "light", criterion: "Earn at least 30000 points in Mario Kart events" },
	
	splat_ldb0 : { caption : "Grizzco Intern",        style : "light", criterion: "Earn at least 1 point in Splatoon events"},
	splat_ldb1 : { caption : "Grizzco Trainee",       style : "light", criterion: "Earn at least 300 points in Splatoon events" },
	splat_ldb2 : { caption : "Grizzco Apprentice",    style : "light", criterion: "Earn at least 700 points in Splatoon events" },
	splat_ldb3 : { caption : "Grizzco Temp Worker",   style : "light", criterion: "Earn at least 1500 points in Splatoon events" },
	splat_ldb4 : { caption : "Grizzco Part-Timer",    style : "light", criterion: "Earn at least 3000 points in Splatoon events" },
	splat_ldb5 : { caption : "Grizzco Full-Timer",    style : "light", criterion: "Earn at least 6000 points in Splatoon events" },
	splat_ldb6 : { caption : "Grizzco Go-Getter",     style : "light", criterion: "Earn at least 9000 points in Splatoon events" },
	splat_ldb7 : { caption : "Grizzco Supervisor",    style : "light", criterion: "Earn at least 15000 points in Splatoon events" },
	splat_ldb8 : { caption : "Grizzco Overachiever",  style : "light", criterion: "Earn at least 21000 points in Splatoon events" },
	splat_ldb9 : { caption : "Grizzco Profreshional", style : "light", criterion: "Earn at least 30000 points in Splatoon events" },
};

var hostDatabase = [
	{ tag : "CC", name : "Rashiko",      code : "6822-5055-2423", tier : 2},
	{ tag : "",   name : "Literary",     code : "4704-7597-7783", tier : 2},
	
	{ tag : "",   name : "Mileve",       code : "2795-2096-7893", tier : 3},
	{ tag : "",   name : "Sora",         code : "0499-4528-8293", tier : 3},
	{ tag : "",   name : "Reis",         code : "1753-6049-3315", tier : 3},
	{ tag : "CC", name : "Marie",        code : "5693-4645-2698", tier : 3},
	{ tag : "",   name : "Spenjo",       code : "0725-4824-1895", tier : 2},
	{ tag : "",   name : "Levi",         code : "3256-0282-5625", tier : 1},
	{ tag : "",   name : "Taste",        code : "4535-5139-5505", tier : 1},
	
	{ tag : "",   name : "The Oddity",   code : "4303-5678-5601", tier : 0},
	{ tag : "",   name : "Pawl S. Lax",  code : "0656-1636-5890", tier : 0},
	{ tag : "CC", name : "Fang",         code : "8434-0819-1597", tier : 0},
	
/*	{ tag : "",   name : "Program",      code : "4898-5196-4000", tier : 3},*/
]

var eventStages = {
	arms: [
		"Spring Stadium", "Ribbon Ring", "Ninja College",  "Mausoleum",     "Ramen Bowl",      //  0 to  4
		"Scrapyard",      "Cinema Deux", "Buster Beach",   "Snake Park",    "DNA Lab",         //  5 to  9
		"Sky Arena",      "Via Dolce",   "Temple Grounds", "Sparring Ring", "[NAME REDACTED]", // 10 to 14
	],
	kart: [
		"Mario Kart Stadium",    "Water Park",                "Sweet Sweet Canyon",   "Thwomp Ruins",        //  0 to  3
		"Mario Circuit",         "Toad Harbor",               "Twisted Mansion",      "Shy Guy Falls",       //  4 to  7
		"Sunshine Airport",      "Dolphin Shoals",            "Electrodome",          "Mount Wario",         // 8 to  13
		"Cloudtop Cruise",       "Bone Dry Dunes",            "Bowser's Castle",      "Rainbow Road",        // 12 to 15
		"GCN Yoshi Circuit",     "Excitebike Arena",          "Dragon Driftway",      "Mute City",           // 16 to 19
		"GCN Baby Park",         "GBA Cheese Land",           "Wild Woods",           "Animal Crossing",     // 20 to 23
		"Wii Moo Moo Meadows",   "GBA Mario Circuit",         "DS Cheep Cheep Beach", "N64 Toad's Turnpike", // 24 to 27
		"GCN Dry Dry Desert",    "SNES Donut Plains 3",       "N64 Royal Raceway",    "3DS DK Jungle",       // 28 to 31
		"DS Wario Stadium",      "GCN Sherbet Land",          "3DS Melody Motorway",  "N64 Yoshi Valley",    // 32 to 35
		"DS Tick-Tock Clock",    "3DS Piranha Plant Pipeway", "Wii Grumble Volcano",  "N64 Rainbow Road",    // 36 to 39
		"Wii Wario's Gold Mine", "SNES Rainbow Road",         "Ice Ice Outpost",      "Hyrule Circuit",      // 40 to 41
		"3DS Koopa City",        "GBA Ribbon Road",           "Super Bell Subway",    "Big Blue",            // 44 to 47
		"Battle Stadium",        "Sweet Sweet Kingdowm",      "Dragon Palace",        "Lunar Colony",        // 48 to 51
		"3DS Wuhu Town",         "GCN Luigi's Mansion",       "SNES Battle Course 1", "Urchin Underpass",    // 52 to 55
	],
	splat: [
		"The Reef",           "Musselforge Fitness",  "Starfish Mainstage", "Humpback Pumptrack", "Inkblot Art Academy",   //  0 to  4
		"Sturgeon Shipyard",  "Moray Towers",         "Port Mackerel",      "Manta Maria",        "Kelp Dome",             //  5 to  9
		"Snapper Canal",      "Blackbelly Skatepark", "MakoMart",           "Walleye Warehouse",  "Shellendorf Institute", // 10 to 14
		"Arowana Mall",       "Goby Arena",           "Piranha Pit",        "Camp Triggerfish",   "Wahoo World",           // 20 to 19
		"New Albacore Hotel", "Ancho-V Games",        "Skipper Pavilion",
	],
	smash: []
};

var eventTypes = {
	arms: {
		leaderboard: "Leaderboard Lobby",
		clash:       "Casual Clash",
		scramble:    "Casual Scramble",
		mlm_warmup:  "MLM Warmup Lobby",
		era_warmup:  "Era Warmup Lobby",
		impromptu:   "Impromptu Lobby",
	},
	kart: {
		race:        "Race Lobby",
		battle:      "Battle Lobby",
		impromptu:   "Impromptu Lobby",
	},
	splat: {
		friends:     "Friends Lobby",
		salmon:      "Salmon Run Lobby",
		impromptu:   "Impromptu Lobby",
	},
	smash: {
		arena:       "Battle Arena",
		impromptu:   "Impromptu Lobby",
	}
};

var eventThemes = {
	arms : [
		{
			key             : "everything",
			name            : "Anything Goes",
			description     : "",
			solo_fight      : [2, 3, 4],
			team_fight      : [4],
			vs_hedlok       : [2, 3],
			hedlok_scramble : [2, 3, 4],
			hoops           : [2],
			skillshot       : [2, 4],
			v_ball          : [2, 4],
			items           : true,
			streak_bonuses  : false,
			stages          : range(15),
		}, {
			key             : "breakable-bits",
			name            : "Breakable Bits",
			description     : "",
			solo_fight      : [2],
			team_fight      : [4],
			vs_hedlok       : [],
			hedlok_scramble : [2, 3, 4],
			hoops           : [],
			skillshot       : [2, 4],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : [1, 3, 5, 9, 11, 12, 14],
		}, {
			key             : "teambuilding",
			name            : "Teambuilding",
			description     : "",
			solo_fight      : [],
			team_fight      : [4],
			vs_hedlok       : [2, 3],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [4],
			v_ball          : [4],
			items           : true,
			streak_bonuses  : false,
			stages          : [0, 1, 3, 4, 8, 9, 10, 12],
		}, {
			key             : "bane-of-ranked",
			name            : "Bane of Ranked",
			description     : "",
			solo_fight      : [3, 4],
			team_fight      : [4],
			vs_hedlok       : [],
			hedlok_scramble : [3, 4],
			hoops           : [2],
			skillshot       : [2, 4],
			v_ball          : [2, 4],
			items           : true,
			streak_bonuses  : false,
			stages          : [2, 4, 6, 8, 14],
		}, {
			key             : "teambuilding-near-far",
			name            : "Teambuilding: Near & Far",
			description     : "",
			solo_fight      : [],
			team_fight      : [4],
			vs_hedlok       : [2, 3],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [4],
			v_ball          : [4],
			items           : true,
			streak_bonuses  : false,
			stages          : [0, 1, 2, 4, 8, 11, 13],
		}, {
			key             : "barrier-bonanza",
			name            : "Barrier Bonanza",
			description     : "",
			solo_fight      : [2, 3, 4],
			team_fight      : [4],
			vs_hedlok       : [],
			hedlok_scramble : [2, 3, 4],
			hoops           : [],
			skillshot       : [],
			v_ball          : [2, 4],
			items           : true,
			streak_bonuses  : false,
			stages          : [1, 5, 6, 7, 8, 9, 12, 14],
		}, {
			key             : "corner-chaos",
			name            : "Corner Chaos",
			description     : "",
			solo_fight      : [2],
			team_fight      : [4],
			vs_hedlok       : [3],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : [0, 1, 7, 10, 11, 13, 14],
		}, {
			key             : "hedlok-havok",
			name            : "Hedlok Havok",
			description     : "",
			solo_fight      : [],
			team_fight      : [],
			vs_hedlok       : [2, 3],
			hedlok_scramble : [2, 3, 4],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : range(15),
		}, {
			key             : "fights-only",
			name            : "Fights Only",
			description     : "All standard fight modes and no minigames, on all stages! Hedlok is welcome, though.",
			solo_fight      : [2, 3, 4],
			team_fight      : [4],
			vs_hedlok       : [2, 3],
			hedlok_scramble : [2, 3, 4],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : range(15),
		}, {
			key             : "mlm",
			name            : "Competitive (MLM Warmup)",
			description     : "This theme is used for the Mega League Mondays warmup lobbies.",
			solo_fight      : [2],
			team_fight      : [],
			vs_hedlok       : [],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : [3, 7, 9, 12, 13],
		}, {
			key             : "cote",
			name            : "Competitive (Era Warmup)",
			description     : "This theme is used for the Champions of the Era warmup lobbies.",
			solo_fight      : [2],
			team_fight      : [],
			vs_hedlok       : [],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : [0, 1, 3, 5, 7, 9, 11, 12, 13],
		}, {
			key             : "clash",
			name            : "Casual Clash",
			description     : "Used in the Casual Clash tournament and warmup lobby.",
			solo_fight      : [2],
			team_fight      : [],
			vs_hedlok       : [],
			hedlok_scramble : [],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : range(15),
		}, {
			key             : "scramble",
			name            : "Casual Scramble",
			description     : "Used in the Casual Scramble tournament and warmup lobby.",
			solo_fight      : [],
			team_fight      : [],
			vs_hedlok       : [],
			hedlok_scramble : [2],
			hoops           : [],
			skillshot       : [],
			v_ball          : [],
			items           : true,
			streak_bonuses  : false,
			stages          : range(15),
		},
	],
	kart : [
		{
			key             : "150cc",
			name            : "150cc Racing",
			description     : "",
			mode            : "150cc Grand Prix",
			teams           : false,
			items           : "Normal Items",
			round_length    : 0,
			cpu             : "Normal",
			vehicles        : "All",
			smart_steering  : true,
			stages          : range(48),
		},
		{
			key             : "mk_battle",
			name            : "Random Battles",
			description     : "",
			mode            : "Random Battle",
			teams           : false,
			items           : "Normal Items",
			round_length    : 5,
			cpu             : "Normal",
			vehicles        : "All",
			smart_steering  : true,
			stages          : [48, 49, 50, 51, 52, 53, 54, 55],
		},
	],
	splat : [
	/*	{
			key             : "turf-war",
			name            : "Casual Turfing",
			description     : "",
			mode            : "Turf War",
			abilities       : true,
			stages          : range(23),
		}, {
			key             : "rainmaker",
			name            : "Casual Rainmaking",
			description     : "",
			mode            : "Rainmaker",
			abilities       : true,
			stages          : range(23),
		}, {
			key             : "splat-zones",
			name            : "Casual Zones",
			description     : "",
			mode            : "Splat Zones",
			abilities       : true,
			stages          : range(23),
		}, {
			key             : "tower-control",
			name            : "Casual Towers",
			description     : "",
			mode            : "Tower Control",
			abilities       : true,
			stages          : range(23),
		}, {
			key             : "clam-blitz",
			name            : "Casual Clams",
			description     : "",
			mode            : "Clam Blitz",
			abilities       : true,
			stages          : range(23),
		}, {
			key             : "salmon-run",
			name            : "Casual Salmonid Cooking",
			description     : "",
			mode            : "Salmon Run",
			abilities       : false,
			stages          : [],
		},*/
	],
	smash : [],
};
