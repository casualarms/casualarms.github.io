---
---

// Change this when the community administration enters/leaves DST!
var communityObservesDST = true; // true or false
// End DST change region

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
var streamingServices    = staticDataJSON["streamingServices"];

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
	
        //{ "tag" : "",   "name" : "Mileve",       "code" : "2795-2096-7893", tier : 3},
	{ "tag" : "",   "name" : "Sora",         "code" : "0499-4528-8293", tier : 3},
	//{ "tag" : "",   "name" : "Reis",         "code" : "1753-6049-3315", tier : 3},
	//{ "tag" : "CC", "name" : "Marie",        "code" : "5693-4645-2698", tier : 3},
	//{ "tag" : "",   "name" : "Spenjo",       "code" : "0725-4824-1895", tier : 2},
	//{ "tag" : "",   "name" : "Levi",         "code" : "3256-0282-5625", tier : 1},
	//{ "tag" : "",   "name" : "Taste",        "code" : "4535-5139-5505", tier : 1},
	
	{ "tag" : "",   "name" : "The Oddity",   "code" : "4303-5678-5601", tier : 0},
	{ "tag" : "",   "name" : "Pawl S. Lax",  "code" : "0656-1636-5890", tier : 0},
        //{ "tag" : "CC", "name" : "Fang",         "code" : "8434-0819-1597", tier : 0},

	{ "tag" : "",    "name" : "DinosaurY",   "code" : "2926-5224-3023", tier : 0},
	//{ "tag" : "",    "name" : "Jake",        "code" : "7677-0583-7008", tier : 0},
	//{ "tag" : "CC",  "name" : "Era",         "code" : "5972-7410-1228", tier : 0},
	//{ "tag" : "CC",  "name" : "Cocovet",     "code" : "8037-4720-4522", tier : 0},
	{ "tag" : "",    "name" : "Ombreverte",  "code" : "3089-8564-5404", tier : 0},
	{ "tag" : "",    "name" : "Udon",        "code" : "3801-5397-8600", tier : 0},
	{ "tag" : "CC",  "name" : "Tom",         "code" : "3190-3514-8531", tier : 0},
	
	{ "tag" : "",    "name" : "False King",  "code" : "2280-3366-3433", tier : 0},
	{ "tag" : "",    "name" : "Anthony",     "code" : "1406-0760-9130", tier : 0},
	{ "tag" : "",    "name" : "Lachesism",   "code" : "6781-1864-4112", tier : 0},
	{ "tag" : "",    "name" : "Emperor",     "code" : "7827-1266-0112", tier : 0},
	{ "tag" : "",    "name" : "uran10",      "code" : "2328-5563-4997", tier : 0},
]

var dst = communityObservesDST ? -60 : 0;

// FIXME: No longer used, check rest of references and remove
var eventSlots = [];

var streamSlots = [
//	{ "id" : "maker-mon", "slot_game" : "variety", "platform" : "mixer", "game" : "variety", "date" : getNextWeekday(1, 18, 30), "duration" :  60, "tz" : "EDT", "title" : "Maker Monday"},
//	{ "id" : "mine-tue",  "slot_game" : "variety", "platform" : "twitch", "game" : "variety", "date" : getNextWeekday(3, 01, 00), "duration" : 120, "tz" : "EDT", "title" : "Tiled Tuesday"}
];
