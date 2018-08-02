function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return null;
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
		}
		else
		{
			h -= 12;
			postfix = " PM";
		}
	}
	
	if (h < 10 && !useAMPM)
	{
		h = "0" + h;
	}
	if (m < 10)
	{
		m = "0" + m;
	}
	
	var result = h + ":" + m + postfix;
	
	return result;
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


function parseEvents()
{
	events = [];
	for (i = 0; i < eventsJSON.length; i++)
	{
		var eventdata = JSON.parse(eventsJSON[i]);
		console.log("Parsed date: " + eventdata.date);
		eventdata.date = new Date(eventdata.date);
		console.log("As: " + eventdata.date);
		events[i] = eventdata;
	}
	return events;
}

function eventOngoingNow()
{
	var lobbySchedule = parseEvents();
	var classes = ["lobby", "lobby", "clash", "lobby", "lobby"];
	
	var now = new Date();
	for (i = 0; i < lobbySchedule.length; ++i)
	{
		var start = lobbySchedule[i].date;
		var end = getEventEnd(lobbySchedule[i]);
		
		if (now > start && now < end)
			return [classes[lobbySchedule[i].type]];
	}
	return ["none"];
}

function nextEvent()
{
	var lobbySchedule = parseEvents();
	
	applicable = null;
	
	
	
	var now = new Date();
	for (i = 0; i < lobbySchedule.length; ++i)
	{
		var start = lobbySchedule[i].date;
		var end = getEventEnd(lobbySchedule[i]);
		
		if (now < end)
			applicable = lobbySchedule[i];
	}
	return applicable;
}

function getEventEnd(eventdata)
{
	return new Date(eventdata.date.getTime() + eventdata.duration * 60000);
}
