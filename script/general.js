/* General scripts */

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
			leaderboards.push([user.name, user.coins, user.monthly, key]);
		}
	}
	
	for (var i = 0; i < rawBoards.UNKNOWN.length; ++i)
		leaderboards.push([rawBoards.UNKNOWN[i][0], rawBoards.UNKNOWN[i][1], rawBoards.UNKNOWN[i][2], null]);
	
	leaderboards.sort(function(a, b) { return b[1] - a[1]; });
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

function fetchLeaderboards(callback)
{
	return fetchJSON("/data/leaderboards.json", callback);
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

function getEventEnd(eventdata)
{
	return new Date(eventdata.date.getTime() + eventdata.duration * 60000);
}
