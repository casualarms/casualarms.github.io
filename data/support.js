---
---

var staticDataJSON = {% include_relative static.json %};

var eventGames           = staticDataJSON["eventGames"];
var leaderboardTiers     = staticDataJSON["leaderboardTiers"];
var patreonTiers         = staticDataJSON["patreonTiers"];
var leaderboardTitles    = staticDataJSON["leaderboardTitles"];
var eventTypes           = staticDataJSON["eventTypes"];
var eventStages          = staticDataJSON["eventStages"];
var eventItems           = staticDataJSON["eventItems"];
var eventThemes          = staticDataJSON["eventThemes"];
var stageSets            = staticDataJSON["stageSets"];
var itemSets             = staticDataJSON["itemSets"];
var eventSponsors        = staticDataJSON["eventSponsors"];
var badgeList            = staticDataJSON["badgeList"];

for (var game in eventGames)
{
	for (var i = 1; i < leaderboardTiers[game].length; ++i)
	{
		var tier = leaderboardTiers[game][i];
		var badge = {
			"caption"   : leaderboardTitles[game].prefix + tier.name + leaderboardTitles[game].suffix,
			"style"     : "light",
			"criterion" : "Earn at least " + tier.start + " points in " + eventGames[game] + " events",
		};
		badgeList[game + "_ldb" + (i - 1)] = badge;
	}
}

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

var eventSlots = [
	{ "id" : "arms-tue",  "game" : "arms",  "start" : getNextWeekday(3, 02, 00), "duration" : 120, "tz" : "PST", "type" : "leaderboard", "title" : "Tidal Tuesday"},
	{ "id" : "arms-wed",  "game" : "arms",  "start" : getNextWeekday(3, 23, 00), "duration" : 120, "tz" : "EST", "type" : "leaderboard", "title" : "Wildcard Wednesday"},
	{ "id" : "arms-thu",  "game" : "arms",  "start" : getNextWeekday(4, 19, 00), "duration" : 120, "tz" : "GMT", "type" : "leaderboard", "title" : "Thumpin' Thursday"},
	{ "id" : "arms-sun",  "game" : "arms",  "start" : getNextWeekday(0, 20, 45), "duration" : 120, "tz" : "EST", "type" : "leaderboard", "title" : "Sunday Showdown"},
	
	{ "id" : "kart-mon",  "game" : "flex",  "start" : getNextWeekday(1, 19, 00), "duration" : 120, "tz" : "GMT", "type" : "race",   "title" : "Monday Motorway",   "stages" : "all-race",   "theme" : "150cc",     "hosts" : [{"name":"","code":"1077-9421-4443"}]},
	{ "id" : "kart-wed",  "game" : "flex",  "start" : getNextWeekday(3, 19, 00), "duration" : 120, "tz" : "GMT", "type" : "race",   "title" : "Wonky Wednesday",   "stages" : "all-race",   "theme" : "mirror",    "hosts" : [{"name":"","code":"4621-2901-6363"}]},
	{ "id" : "kart-fri",  "game" : "flex",  "start" : getNextWeekday(5, 22, 00), "duration" : 120, "tz" : "EST", "type" : "battle", "title" : "Frantic Friday",    "stages" : "all-battle", "theme" : "mk_battle"},
	{ "id" : "kart-sat",  "game" : "flex",  "start" : getNextWeekday(0, 00, 00), "duration" : 120, "tz" : "EST", "type" : "race",   "title" : "Saturday Speedway", "stages" : "all-race",   "theme" : "200cc",     "hosts" : [{"name":"","code":"4412-5645-5723"}]},
	
	{ "id" : "splat-mon", "game" : "flex",  "start" : getNextWeekday(1, 22, 00), "duration" : 120, "tz" : "EST", "type" : "friends", "title" : "Messy Monday"},
	{ "id" : "splat-thu", "game" : "flex",  "start" : getNextWeekday(5, 02, 00), "duration" : 120, "tz" : "PST", "type" : "friends", "title" : "Turfsday"},
	{ "id" : "splat-sat", "game" : "flex",  "start" : getNextWeekday(6, 17, 00), "duration" : 120, "tz" : "GMT", "type" : "friends", "title" : "Splaturday"},
];
