/* General scripts */

var monthNames = [
	"Jan.", "Feb.", "March", "April", "May", "June", 
	"July", "August", "Sept.", "Oct.", "Nov.", "Dec."];

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++)
	{
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable)
		{
			return decodeURIComponent(pair[1]);
		}
	}
	return null;
}

function $(id)
{
	return document.getElementById(id);
}

/* Random gen */

Math.seed = function(s)
{
	var hiddenState = s;
	return function()
	{
		hiddenState = (hiddenState + "").hashCode();
		s = hiddenState / (Math.pow(2, 32));
		return s - Math.floor(s);
	};
};

String.prototype.hashCode = function()
{
	var hash = 0, i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

function shuffle(array)
{
	let counter = array.length;
	// While there are elements in the array
	while (counter > 0)
	{
		// Pick a random index
		let index = Math.floor(Math.random() * counter);
		// Decrease counter by 1
		counter--;
		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

function escapeHTML(str)
{
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;');
}

function unEscapeHTML(str)
{
	return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

function getTimeZoneDiff()
{
	var now = new Date();
	diff = -now.getTimezoneOffset() / 60;

	// Override
	var timezone = getQueryVariable("timezone");
	if (timezone != null)
		diff = parseInt(timezone);
	
	return diff;
}

function timeZoneOffset(timeZoneString)
{
	var timeZoneOffsets = {
		"PST"  : -8,
		"PDT"  : -7,
		"EST"  : -5,
		"EDT"  : -4,
		"GMT"  :  0,
		"UTC"  :  0,
		"BST"  :  1,
		"CET"  :  1,
		"CEST" :  2,
	};
	
	return timeZoneOffsets[timeZoneString];
}

function convertDates(dates, diff)
{
	for (i = 0; i < dates.length; i++)
	{
		dates[i].setHours(dates[i].getHours() + diff);
	}
}

function weekCorrect(date)
{
	if (date.getDate() == 8)
		date.setDate(1);
}

function textWeekday(date)
{
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[date.getDay()];
}

function textMonthUTC(date)
{
	var months = [
		"January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December"];
	return months[date.getUTCMonth()];
}

function formatTimeHelper(h, m, diff)
{
	postfix = "";
	var useAMPM = (-7 <= diff && diff <= -4);
	
	if (useAMPM)
	{
		if (h < 12)
		{
			postfix = " AM";
			if (h == 0) h = 12; 
		}
		else
		{
			postfix = " PM";
			h -= 12;
			if (h == 0) h = 12; 
		}
	}
	
	if (h < 10 && !useAMPM) h = "0" + h;
	if (m < 10) m = "0" + m;
	return h + ":" + m + postfix;
}

function formatTime(date, diff)
{
	h = date.getHours();
	m = date.getMinutes();
	return formatTimeHelper(h, m, diff);
}

function formatTimeUTC(date, diff)
{
	h = date.getUTCHours();
	m = date.getUTCMinutes();
	return formatTimeHelper(h, m, diff);
}


function reorganizeLeaderboards(rawBoards)
{
	var leaderboards = [];
	
	for (var key in rawBoards)
	{
		if (rawBoards.hasOwnProperty(key) && key != "UNKNOWN")
		{
			var user = rawBoards[key];
			leaderboards.push({ name: user.name, coins: user.coins, monthly: user.monthly, id: key});
		}
	}
	
	for (var i = 0; i < rawBoards.UNKNOWN.length; ++i)
		leaderboards.push({ name: rawBoards.UNKNOWN[i][0], coins: rawBoards.UNKNOWN[i][1], monthly: rawBoards.UNKNOWN[i][2], id: null});
	
	leaderboards.sort(function(a, b) { return b.coins - a.coins; });
	return leaderboards;
}

function fetchJSON(url, callback)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var data = JSON.parse(this.responseText);
			callback(data);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


var cachedLeaderboardsJSON = undefined;
function fetchLeaderboards(game, callback)
{
	if (cachedLeaderboardsJSON)
		callback(cachedLeaderboardsJSON[game]);
	else
		fetchJSON("/data/leaderboards.json", function(rawJSON)
		{
			cachedLeaderboardsJSON = rawJSON
			callback(cachedLeaderboardsJSON[game]);
		});
}

function fetchSeasonHistory(callback)
{
	return fetchJSON("/data/season-history.json", callback);
}

function fetchBadges(callback)
{
	return fetchJSON("/data/badges.json", callback);
}

function fetchPatrons(callback)
{
	return fetchJSON("/data/patreon.json", callback);
}

function fetchEvents(callback)
{
	var interceptCallback = function(events)
	{
		for (var i = 0; i < events.length; i++)
		{
			var eventdata = events[i];
			eventdata.date = new Date(eventdata.date);
			events[i] = eventdata;
		}
		events.sort(function(a, b) { return a.date - b.date; });
		callback(events);
	};
	
	return fetchJSON("/data/events.json", interceptCallback);
}


function eventOngoingNow(callback)
{
	fetchEvents(function(lobbySchedule)
	{
		var classes = ["lobby", "lobby", "clash", "lobby", "lobby"];
		var now = new Date();
		
		for (i = 0; i < lobbySchedule.length; ++i)
		{
			var start = lobbySchedule[i].date;
			var end = getEventEnd(lobbySchedule[i]);
			
			if (now > start && now < end)
			{
				callback([classes[lobbySchedule[i].type]]);
				return;
			}
		}
		callback(["none"]);
		return;
	});
}

function nextEvents(callback)
{
	fetchEvents(function(lobbySchedule)
	{
		var applicables = [];
		var now = new Date();
		
		for (i = 0; i < lobbySchedule.length; ++i)
		{
			var start = lobbySchedule[i].date;
			var end = getEventEnd(lobbySchedule[i]);
			
			if (now < end)
				applicables.push(lobbySchedule[i]);
		}
		
		callback(applicables);
	});
}

function getEventID(eventdata)
{
	var epochString = (eventdata.date.getTime() / 1000) + "";
	var id = parseInt(epochString.substring(2, 8)).toString(16).toUpperCase();
	console.log(id);
	return id;
}

function getEventEnd(eventdata)
{
	return new Date(eventdata.date.getTime() + eventdata.duration * 60000);
}

function shuffle(array)
{
	var counter = array.length;
	while (counter > 0)
	{
		var index = Math.floor(Math.random() * counter);
		counter--;
		var temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

function getTierID(tier)
{
	return tier.name.toLowerCase().replace(" ", "-");
}

function getTheme(themeID)
{
	for (var t = 0; t < eventThemes.length; ++t)
		if (eventThemes[t].key == themeID)
			return eventThemes[t];
	return null;
}

function printTheme(ev)
{
	function printMode(ev, key, name)
	{
		var html = "";
		if (ev[key].length > 0)
		{
			html += "<p><span class='mode-name'>" + name + "</span> <span class='mode-options'>  ";
			for (s = 0; s < ev[key].length; ++s)
				html += ev[key][s] + "P  ";
			html += "</span></p>"
		}
		return html;
	}
	
	var html = "<h3 id='" + ev.key + "'>" + ev.name + "</h3>";
	html += "<p>" + ev.description + "</p>";
	
	html += printMode(ev, "solo-fight", "Solo Fight");
	html += printMode(ev, "team-fight", "Team Fight");
	html += printMode(ev, "vs-hedlok", "VS Hedlok");
	html += printMode(ev, "hedlok-scramble", "Hedlok Scramble");
	html += printMode(ev, "hoops", "Hoops");
	html += printMode(ev, "skillshot", "Skillshot");
	html += printMode(ev, "v-ball", "V-ball");
	
	html += "<p><span class='mode-name'>Items</span> <span class='mode-options option-" + (ev.items ? "on" : "off") + "'>  " + (ev.items ? "On" : "Off") + "  </span></p>";
	html += "<p><span class='mode-name'>Streak Bonuses</span> <span class='mode-options option-" + (ev["streak-bonuses"] ? "on" : "off") + "'>  " + (ev["streak-bonuses"] ? "On" : "Off") + "  </span></p>";
	
	html += "<div class='stage-container'>";
	for (s = 0; s < ev.stages.length; ++s)
	{
		html += "<div class='stage active'>";
		html += eventStages[ev.stages[s]];
		html += "</div>";
	}
	html += "</div>";
	return html;
}
