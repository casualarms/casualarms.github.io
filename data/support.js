---
---

var staticDataJSON = {% include_relative static.json %};

var eventGames           = staticDataJSON["eventGames"];
var leaderboardTiers     = staticDataJSON["leaderboardTiers"];
var patreonTiers         = staticDataJSON["patreonTiers"];
var leaderboardTitles    = staticDataJSON["leaderboardTitles"];
var eventTypes           = staticDataJSON["eventTypes"];
var eventStages          = staticDataJSON["eventStages"];
var eventThemes          = staticDataJSON["eventThemes"];


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
	{ "tag" : "CC", "name" : "Rashiko",      "code" : "6822-5055-2423", tier : 2},
	{ "tag" : "",   "name" : "Literary",     "code" : "4704-7597-7783", tier : 2},
	
	{ "tag" : "",   "name" : "Mileve",       "code" : "2795-2096-7893", tier : 3},
	{ "tag" : "",   "name" : "Sora",         "code" : "0499-4528-8293", tier : 3},
	{ "tag" : "",   "name" : "Reis",         "code" : "1753-6049-3315", tier : 3},
	{ "tag" : "CC", "name" : "Marie",        "code" : "5693-4645-2698", tier : 3},
	{ "tag" : "",   "name" : "Spenjo",       "code" : "0725-4824-1895", tier : 2},
	{ "tag" : "",   "name" : "Levi",         "code" : "3256-0282-5625", tier : 1},
	{ "tag" : "",   "name" : "Taste",        "code" : "4535-5139-5505", tier : 1},
	
	{ "tag" : "",   "name" : "The Oddity",   "code" : "4303-5678-5601", tier : 0},
	{ "tag" : "",   "name" : "Pawl S. Lax",  "code" : "0656-1636-5890", tier : 0},
	{ "tag" : "CC", "name" : "Fang",         "code" : "8434-0819-1597", tier : 0},
	
//	{ "tag" : "",   "name" : "Program",      "code" : "4898-5196-4000", tier : 3},
]

/*
	"splat" : [
	/*	{
			"key"             : "turf-war",
			"name"            : "Casual Turfing",
			"description"     : "",
			"mode"            : "Turf War",
			"abilities"       : true,
			"stages"          : range(23),
		}, {
			"key"             : "rainmaker",
			"name"            : "Casual Rainmaking",
			"description"     : "",
			"mode"            : "Rainmaker",
			"abilities"       : true,
			"stages"          : range(23),
		}, {
			"key"             : "splat-zones",
			"name"            : "Casual Zones",
			"description"     : "",
			"mode"            : "Splat Zones",
			abilities       : true,
			"stages"          : range(23),
		}, {
			"key"             : "tower-control",
			"name"            : "Casual Towers",
			"description"     : "",
			"mode"            : "Tower Control",
			"abilities"       : true,
			"stages"          : range(23),
		}, {
			"key"             : "clam-blitz",
			"name"            : "Casual Clams",
			"description"     : "",
			"mode"            : "Clam Blitz",
			"abilities"       : true,
			"stages"          : range(23),
		}, {
			"key"             : "salmon-run",
			"name"            : "Casual Salmonid Cooking",
			"description"     : "",
			"mode"            : "Salmon Run",
			"abilities"       : false,
			"stages"          : [],
		},
	],
	"smash" : [],
};
*/