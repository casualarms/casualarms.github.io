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
var stageSets            = staticDataJSON["stageSets"];
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
	{ "id" : "arms-tue",     "game" : "arms",  "start" : getNextWeekday(3, 02, 00), "duration" : 120, "title" : "Tidal Tuesday"},
	{ "id" : "arms-wed",     "game" : "arms",  "start" : getNextWeekday(3, 23, 00), "duration" : 120, "title" : "Wildcard Wednesday"},
	{ "id" : "arms-thu",     "game" : "arms",  "start" : getNextWeekday(4, 19, 00), "duration" : 120, "title" : "Thumpin' Thursday"},
	{ "id" : "arms-sun",     "game" : "arms",  "start" : getNextWeekday(0, 20, 45), "duration" : 120, "title" : "Sunday Showdown"},
	
	{ "id" : "kart-mon",     "game" : "kart",  "start" : getNextWeekday(1, 19, 00), "duration" : 120, "title" : "Monday Motorway"},
	{ "id" : "kart-wed",     "game" : "kart",  "start" : getNextWeekday(3, 19, 00), "duration" : 120, "title" : "Wonky Wednesday"},
	{ "id" : "kart-fri",     "game" : "kart",  "start" : getNextWeekday(5, 22, 00), "duration" : 120, "title" : "Frantic Friday"},
	{ "id" : "kart-sat",     "game" : "kart",  "start" : getNextWeekday(0, 00, 00), "duration" : 120, "title" : "Saturday Speedway"},
	
	{ "id" : "splat-mon",    "game" : "splat", "start" : getNextWeekday(1, 22, 00), "duration" : 120, "title" : "Messy Monday"},
	{ "id" : "splat-thu",    "game" : "splat", "start" : getNextWeekday(5, 02, 00), "duration" : 120, "title" : "Turfsday"},
	{ "id" : "splat-sat",    "game" : "splat", "start" : getNextWeekday(6, 17, 00), "duration" : 120, "title" : "Splaturday"},
];
