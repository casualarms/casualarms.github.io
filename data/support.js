
var leaderboardTiers = [
	{"start" :     1, "name" : "Intern",     "color" : "#bfffff"},
	{"start" :   100, "name" : "Technician", "color" : "#00ffff"},
	{"start" :   250, "name" : "Analyst",    "color" : "#00ff00"},
	{"start" :   500, "name" : "Coder",      "color" : "#aaff00"},
	{"start" :  1000, "name" : "Researcher", "color" : "#ffae00"},
	{"start" :  2000, "name" : "Scientist",  "color" : "#ff6000"},
	{"start" :  3000, "name" : "Manager",    "color" : "#ff0004"},
	{"start" :  5000, "name" : "VP",         "color" : "#ff006f"},
	{"start" :  7000, "name" : "EVP",        "color" : "#ff00e6"},
	{"start" : 10000, "name" : "Codirector", "color" : "#b700ff"},
];

var patreonTiers = [
	{"start" :  1, "name" : "Casual Contributor", "color" : "#2E666B"},
	{"start" :  5, "name" : "Committed Casual",   "color" : "#0A680D"},
	{"start" : 25, "name" : "True Casual",        "color" : "#8c230B"},
];

var badgeList = {
	"ldb0" : { "caption" : "ARMS Labs Intern",     "style" : "light", "criterion": "Earn at least 1 coin in our leaderboard lobbies"},
	"ldb1" : { "caption" : "ARMS Labs Technician", "style" : "light", "criterion": "Earn at least 100 coins in our leaderboard lobbies" },
	"ldb2" : { "caption" : "ARMS Labs Analyst",    "style" : "light", "criterion": "Earn at least 250 coins in our leaderboard lobbies" },
	"ldb3" : { "caption" : "ARMS Labs Coder",      "style" : "light", "criterion": "Earn at least 500 coins in our leaderboard lobbies" },
	"ldb4" : { "caption" : "ARMS Labs Researcher", "style" : "light", "criterion": "Earn at least 1000 coins in our leaderboard lobbies" },
	"ldb5" : { "caption" : "ARMS Labs Scientist",  "style" : "light", "criterion": "Earn at least 2000 coins in our leaderboard lobbies" },
	"ldb6" : { "caption" : "ARMS Labs Manager",    "style" : "light", "criterion": "Earn at least 3000 coins in our leaderboard lobbies" },
	"ldb7" : { "caption" : "ARMS Labs VP",         "style" : "light", "criterion": "Earn at least 5000 coins in our leaderboard lobbies" },
	"ldb8" : { "caption" : "ARMS Labs EVP",        "style" : "light", "criterion": "Earn at least 7000 coins in our leaderboard lobbies" },
	"ldb9" : { "caption" : "ARMS Labs Codirector", "style" : "light", "criterion": "Earn at least 10000 coins in our leaderboard lobbies" },
	
	"p0" : { "caption" : "Patreon: Casual Contributor", "style" : "light", "criterion": "Contribute more than $1 on the Patreon for at least one month" },
	"p1" : { "caption" : "Patreon: Committed Casual",   "style" : "light", "criterion": "Contribute more than $5 on the Patreon for at least one month" },
	"p2" : { "caption" : "Patreon: True Casual",        "style" : "dark",  "criterion": "Contribute more than $25 on the Patreon for at least one month" },
	
	"casualcouple" : { "caption" : "Casual ARMS Founder", "style" : "light", "criterion": "This is a special badge for the two founders of Casual ARMS" },
	"clsh" : { "caption" : "Casual Clash Champion", "style" : "light", "criterion": "Play in a Casual Clash and achieve victory" },
	"scrmbl" : { "caption" : "Casual Scramble Sovereign", "style" : "dark", "criterion": "Play in a Casual Scramble and achieve victory" },
	"casualcrew" : { "caption" : "Casual Crew Member", "style" : "dark", "criterion": "Be a current or former member of the Casual Crew." },
};

var eventStages = {
	 0 : "Spring Stadium",
	 1 : "Ribbon Ring",
	 2 : "Ninja College",
	 3 : "Mausoleum",
	 4 : "Ramen Bowl",
	 5 : "Scrapyard",
	 6 : "Cinema Deux",
	 7 : "Buster Beach",
	 8 : "Snake Park",
	 9 : "DNA Lab",
	10 : "Sky Arena",
	11 : "Via Dolce",
	12 : "Temple Grounds",
	13 : "Sparring Ring",
	14 : "[NAME REDACTED]"
};

var eventThemes = [
	{
		"key"             : "everything",
		"name"            : "Anything Goes",
		"description"     : "",
		"solo-fight"      : [2, 3, 4],
		"team-fight"      : [4],
		"vs-hedlok"       : [2, 3],
		"hedlok-scramble" : [2, 3, 4],
		"hoops"           : [2],
		"skillshot"       : [2, 4],
		"v-ball"          : [2, 4],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	},
	{
		"key"             : "breakable-bits",
		"name"            : "Breakable Bits",
		"description"     : "",
		"solo-fight"      : [2],
		"team-fight"      : [4],
		"vs-hedlok"       : [],
		"hedlok-scramble" : [2, 3, 4],
		"hoops"           : [],
		"skillshot"       : [2, 4],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [1, 3, 5, 9, 11, 12, 14],
	},
	{
		"key"             : "teambuilding",
		"name"            : "Teambuilding",
		"description"     : "",
		"solo-fight"      : [],
		"team-fight"      : [4],
		"vs-hedlok"       : [2, 3],
		"hedlok-scramble" : [],
		"hoops"           : [],
		"skillshot"       : [4],
		"v-ball"          : [4],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 3, 4, 8, 9, 10, 12],
	},
	{
		"key"             : "bane-of-ranked",
		"name"            : "Bane of Ranked",
		"description"     : "",
		"solo-fight"      : [3, 4],
		"team-fight"      : [4],
		"vs-hedlok"       : [],
		"hedlok-scramble" : [3, 4],
		"hoops"           : [2],
		"skillshot"       : [2, 4],
		"v-ball"          : [2, 4],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [2, 4, 6, 8, 14],
	},
	{
		"key"             : "teambuilding-near-far",
		"name"            : "Teambuilding: Near & Far",
		"description"     : "",
		"solo-fight"      : [],
		"team-fight"      : [4],
		"vs-hedlok"       : [2, 3],
		"hedlok-scramble" : [],
		"hoops"           : [],
		"skillshot"       : [4],
		"v-ball"          : [4],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 2, 4, 8, 11, 13],
	},
	{
		"key"             : "barrier-bonanza",
		"name"            : "Barrier Bonanza",
		"description"     : "",
		"solo-fight"      : [2, 3, 4],
		"team-fight"      : [4],
		"vs-hedlok"       : [],
		"hedlok-scramble" : [2, 3, 4],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [2, 4],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [1, 5, 6, 7, 8, 9, 12, 14],
	},
	{
		"key"             : "corner-chaos",
		"name"            : "Corner Chaos",
		"description"     : "",
		"solo-fight"      : [2],
		"team-fight"      : [4],
		"vs-hedlok"       : [3],
		"hedlok-scramble" : [],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 7, 10, 11, 13, 14],
	},
	{
		"key"             : "hedlok-havok",
		"name"            : "Hedlok Havok",
		"description"     : "",
		"solo-fight"      : [],
		"team-fight"      : [],
		"vs-hedlok"       : [2, 3],
		"hedlok-scramble" : [2, 3, 4],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	},
	{
		"key"             : "fights-only",
		"name"            : "Fights Only",
		"description"     : "All standard fight modes and no minigames, on all stages! Hedlok is welcome, though.",
		"solo-fight"      : [2, 3, 4],
		"team-fight"      : [4],
		"vs-hedlok"       : [2, 3],
		"hedlok-scramble" : [2, 3, 4],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
	},
	{
		"key"             : "mlm",
		"name"            : "Restricted Competitive (MLM style)",
		"description"     : "This theme is used for the Mega League Mondays warmup lobbies.",
		"solo-fight"      : [2],
		"team-fight"      : [],
		"vs-hedlok"       : [],
		"hedlok-scramble" : [],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [3, 7, 9, 12, 13],
	},
	{
		"key"             : "cote",
		"name"            : "Extended Competitive (Era style)",
		"description"     : "This theme is used for the Champions of the Era warmup lobbies.",
		"solo-fight"      : [2],
		"team-fight"      : [],
		"vs-hedlok"       : [],
		"hedlok-scramble" : [],
		"hoops"           : [],
		"skillshot"       : [],
		"v-ball"          : [],
		"items"           : true,
		"streak-bonouses" : false,
		"stages"          : [0, 1, 3, 5, 7, 9, 11, 12, 13],
	},
];
