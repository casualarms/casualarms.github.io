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
var eventTypesLeaderboards = staticDataJSON["eventTypesLeaderboards"];

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

// Event database
var eventDataJSON = {% include_relative events.json %};
for (var i = 0; i < eventDataJSON.length; i++)
{
	var eventdata = eventDataJSON[i];
	eventdata.date = new Date(eventdata.date);
	eventDataJSON[i] = eventdata;
}
eventDataJSON.sort(function(a, b) { return a.date - b.date; });

// Streams database
var streamsDataJSON = {% include_relative streams.json %};
for (var s = 0; s < streamsDataJSON.length; s++)
{
	var eventdata = streamsDataJSON[s];
	eventdata.date = new Date(eventdata.date);
	streamsDataJSON[s] = eventdata;
}
streamsDataJSON.sort(function(a, b) { return a.date - b.date; });

// Leaderboards etc
var leaderboardsJSON  = {% include_relative leaderboards.json %};
var seasonHistoryJSON = {% include_relative season-history.json %};
var badgeDatabaseJSON = {% include_relative badges.json %};
var patronsJSON       = {% include_relative patreon.json %};

leaderboardsJSON.variety = []
for (var game in eventGames)
	leaderboardsJSON[game].sort(function(a, b) { return b.coins - a.coins; });

// Tournament history
var tournamentsLog = {% include_relative champions.json %};


// Host database
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
	
	{ "tag" : "CC", "name" : "oh no BEES",   "code" : "1364-5571-6618", tier : 0},
	
//	{ "tag" : "",   "name" : "Program",      "code" : "4898-5196-4000", tier : 3},
]

var eventSlots = [
	{ "id" : "arms-tue",  "slot_game" : "arms",  "game" : "arms",  "date" : getNextWeekday(3, 02, 00), "duration" : 120, "tz" : "PST", "type" : "leaderboard", "title" : "Tidal Tuesday"},
	{ "id" : "arms-wed",  "slot_game" : "arms",  "game" : "arms",  "date" : getNextWeekday(3, 23, 00), "duration" : 120, "tz" : "EST", "type" : "leaderboard", "title" : "Wildcard Wednesday"},
	{ "id" : "arms-thu",  "slot_game" : "arms",  "game" : "arms",  "date" : getNextWeekday(4, 19, 00), "duration" : 120, "tz" : "GMT", "type" : "leaderboard", "title" : "Thumpin' Thursday"},
	{ "id" : "arms-sun",  "slot_game" : "arms",  "game" : "arms",  "date" : getNextWeekday(0, 20, 45), "duration" : 120, "tz" : "EST", "type" : "leaderboard", "title" : "Sunday Showdown"},
	
//	{ "id" : "kart-mon",  "slot_game" : "flex",  "game" : "kart",  "date" : getNextWeekday(1, 18, 30), "duration" :  60, "tz" : "GMT", "type" : "race",   "title" : "Monday Motorway",   "stages" : "all-race",   "theme" : "150cc",     "hosts" : [{"name":"","code":"1077-9421-4443"}]},
//	{ "id" : "kart-wed",  "slot_game" : "flex",  "game" : "kart",  "date" : getNextWeekday(3, 18, 30), "duration" :  60, "tz" : "GMT", "type" : "race",   "title" : "Wonky Wednesday",   "stages" : "all-race",   "theme" : "mirror",    "hosts" : [{"name":"","code":"4621-2901-6363"}]},
//	{ "id" : "kart-fri",  "game" : "flex",  "start" : getNextWeekday(5, 22, 30), "duration" :  60, "tz" : "EST", "type" : "battle", "title" : "Frantic Friday",    "stages" : "all-battle", "theme" : "mk_battle"},
//	{ "id" : "kart-sat",  "slot_game" : "flex",  "game" : "kart",  "date" : getNextWeekday(6, 23, 30), "duration" :  60, "tz" : "EDT", "type" : "race",   "title" : "Saturday Speedway", "stages" : "all-race",   "theme" : "200cc",     "hosts" : [{"name":"","code":"4412-5645-5723"}]},
	
	{ "id" : "splat-mon", "slot_game" : "splat",  "game" : "splat", "date" : getNextWeekday(1, 19, 30), "duration" :  60, "tz" : "EST", "type" : "friends", "title" : "Messy Monday"},
	{ "id" : "splat-thu", "slot_game" : "splat",  "game" : "splat", "date" : getNextWeekday(5, 02, 30), "duration" :  60, "tz" : "PST", "type" : "friends", "title" : "Turfsday"},
	{ "id" : "splat-sat", "slot_game" : "splat",  "game" : "splat", "date" : getNextWeekday(6, 17, 30), "duration" :  60, "tz" : "GMT", "type" : "friends", "title" : "Splaturday"},
	
	{ "id" : "smash-mon", "slot_game" : "smash",  "game" : "smash", "date" : getNextWeekday(1, 22, 30), "duration" :  60, "tz" : "EST", "type" : "friends", "title" : "Marthday"},
	{ "id" : "smash-wed", "slot_game" : "smash",  "game" : "smash", "date" : getNextWeekday(3, 19, 30), "duration" :  60, "tz" : "GMT", "type" : "friends", "title" : "WedNessDay"},
	{ "id" : "smash-sat", "slot_game" : "smash",  "game" : "smash", "date" : getNextWeekday(0, 00, 30), "duration" :  60, "tz" : "PST", "type" : "friends", "title" : "Mr. Saturnday"},
];

var streamSlots = [
//	{ "id" : "maker-mon", "slot_game" : "variety", "platform" : "mixer", "game" : "variety", "date" : getNextWeekday(1, 18, 30), "duration" :  60, "tz" : "EDT", "title" : "Maker Monday"},
//	{ "id" : "mine-tue",  "slot_game" : "variety", "platform" : "twitch", "game" : "variety", "date" : getNextWeekday(3, 01, 00), "duration" : 120, "tz" : "EDT", "title" : "Tiled Tuesday"}
];
