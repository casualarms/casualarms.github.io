/* General scripts */

var monthNames = [
	"January", "February", "March", "April", "May", "June", 
	"July", "August", "September", "October", "November", "December"];

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

function textMonth(date)
{
	var months = [
		"January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December"];
	return months[date.getMonth()];
}

function formatTimeHelper(date, diff, h, m)
{
	if (!diff) diff = getTimeZoneDiff();
	
	var postfix = "";
	var useAMPM = (-8 <= diff && diff <= -4);
	
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
	return formatTimeHelper(date, diff, date.getHours(), date.getMinutes());
}

function formatTimeUTC(date, diff)
{
	return formatTimeHelper(date, diff, date.getUTCHours(), date.getUTCMinutes());
}

function getNextWeekday(weekday, hours, minutes)
{
	var d = new Date();
	d.setUTCHours(hours);
	d.setUTCMinutes(minutes);
	d.setUTCSeconds(0);
	d.setUTCMilliseconds(0);
	d.setUTCDate(d.getUTCDate() + ((7 - d.getUTCDay()) % 7 + weekday) % 7);
	return d;
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
	return parseInt(epochString.substring(2, 8)).toString(16).toUpperCase();
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

function getTheme(gameID, themeID)
{
	for (var t = 0; t < eventThemes[gameID].length; ++t)
		if (eventThemes[gameID][t].key == themeID)
			return eventThemes[gameID][t];
	return null;
}

function printTheme(game, ev, concise)
{
	function printMode(ev, key, name)
	{
		return "<p><span class='mode-name'>" + name + "</span> <span class='mode-options'>  " + ev[key] + "  </span></p>";
	}
	
	function printBinaryMode(ev, key, name)
	{
		return "<p><span class='mode-name'>" + name + "</span> <span class='mode-options option-" + (ev[key] ? "on" : "off") + "'>  " + (ev[key] ? "On" : "Off") + "  </span></p>";
	}
	
	function getEventStagesList(ev)
	{
		var stages = [];
		for (s = 0; s < ev.stages.length; ++s)
		{
			var stage = ev.stages[s];
			if (typeof stage === 'object')
			{
				for (var b = stage.start; b <= stage.end; ++b)
					stages.push(b);
			}
			else stages.push(ev.stages[s]);
		}
		return stages;
	}
	
	function printMultiMode(ev, key, name)
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
	if (!concise) html += "<p>" + ev.description + "</p>";
	
	if (game == "arms")
	{
		html += printMultiMode(ev, "solo_fight", "Solo Fight");
		html += printMultiMode(ev, "team_fight", "Team Fight");
		html += printMultiMode(ev, "vs_hedlok", "VS Hedlok");
		html += printMultiMode(ev, "hedlok_scramble", "Hedlok Scramble");
		html += printMultiMode(ev, "hoops", "Hoops");
		html += printMultiMode(ev, "skillshot", "Skillshot");
		html += printMultiMode(ev, "v_ball", "V-ball");
		html += printBinaryMode(ev, "items", "Items");
		html += printBinaryMode(ev, "streak_bonuses", "Streak Bonuses");
	}
	else if (game == "kart")
	{
		html += printMode(ev, "mode", "Mode");
		html += printBinaryMode(ev, "teams", "Teams");
		html += printMode(ev, "items", "Items");
		html += printMode(ev, "round_length", "Round Length");
		html += printMode(ev, "cpu", "CPU");
		html += printMode(ev, "vehicles", "Vehicles");
		html += printBinaryMode(ev, "smart_steering", "Smart Steering");
	}
	else if (game == "splat")
	{
		html += printMode(ev, "mode", "Mode");
		html += printBinaryMode(ev, "abilities", "Sub Abilities");
	}
	
	var stages = getEventStagesList(ev);
	var myid = Math.random().toString(36).substring(7);
	html += "<div class='stage-container' id='" + myid + "' onclick=\"expandStages('" + myid + "');\">";
	html += "<div class='stage-container-header'>" + stages.length + "/" + eventStages[game].length + " stages (click to expand)</div>";
	for (var s = 0; s < stages.length; ++s)
		html += "<div class='stage active' style='display: none;'>" + eventStages[game][stages[s]] + "</div>";
	html += "</div>";
	return html;
}

function expandStages(myid)
{
	var container = $(myid);
	var stages = container.childNodes;
	for (var s = 1; s < stages.length; ++s)
	{
		stages[s].style.display = "block";
	}
}

function copyToClipboard(tid)
{
	var copyTextarea = $(tid);
	copyTextarea.focus();
	copyTextarea.select();
	
	try {
		var successful = document.execCommand('copy');
		console.log('Copying text command was ' + (successful ? 'successful' : 'unsuccessful'));
	} catch (err) {
		console.log('Oops, unable to copy');
	}
}


function drawSwirl(canvas, startX, startY, maxRadius, rotation, curvature, width, color)
{
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.moveTo(startX, startY);
	ctx.beginPath();
	
	var steps = 300;
	function calcStep(i, angle)
	{
		var radius = i / steps * maxRadius;
		var phi = angle + i / steps * curvature;
		var x = startX + radius * Math.cos(phi);
		var y = startY + radius * Math.sin(phi);
		ctx.lineTo(x, y);
	}
	
	for (var i = 0; i < steps; ++i)
		calcStep(i, rotation);
	
	var phiSteps = 50;
	for (var phi = 0; phi < phiSteps; ++phi)
		calcStep(steps-1, rotation + (phi / phiSteps) * width);
	
	for (var i = steps-1; i >= 0; --i)
		calcStep(i, rotation + width);
	
	ctx.fill();
}

function drawSwirlComponents(canvas, startX, startY, maxRadius, rotation, curvature, width, gaps, color)
{
	var components = gaps * 2 + 1;
	var width_s = width / components;
	for (var i = 0; i < components; i += 2)
	{
		var m_rotation = rotation + i * width_s;
		drawSwirl(canvas, startX, startY, maxRadius, m_rotation, curvature, width_s, color);
	}
}

function renderSwirls(canvas, lines)
{
	var midX = canvas.width / 2;
	var midY = canvas.height / 2;
	var radius = Math.max(canvas.width, canvas.height) * 2;
	
	for (var l = 0; l < lines.length; l++)
		drawSwirlComponents(canvas, midX + lines[l][0], midY + lines[l][1], radius, lines[l][2], lines[l][3],lines[l][4], lines[l][5], lines[l][6]);
}

function renderSplash(canvas, x, y, scale, color, alpha, PRNG)
{
	var mainctx = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	
	var scratch = document.createElement('canvas');
	scratch.width = width;
	scratch.height = height;
	var ctx = scratch.getContext("2d");
	
	ctx.fillStyle = color;
	ctx.translate(width / 2 + x, height / 2 + y);
	
	var dim = Math.min(width, height) / 3000 * scale;
	ctx.scale(dim, dim);
	
	var mainSize = 300 + PRNG() * 200;
	ctx.beginPath();
	ctx.arc(0, 0, mainSize, 0, 2 * Math.PI, false);
	ctx.fill();
	
	ctx.rotate(PRNG() * 2 * Math.PI);
	
	var blots = Math.floor(PRNG() * 18);
	for (var i = 0; i < blots; ++i)
	{
		var size   = 70 + PRNG() * 100;
		var length = size + 100 + PRNG() * 500;
		ctx.save();
		ctx.rotate(i / blots * 2 * Math.PI);
		ctx.translate(0, mainSize + length);
		
		ctx.beginPath();
		ctx.arc(0, 0, size, 0.0 * Math.PI, 2.0 * Math.PI, false);
		ctx.fill();
			
		if (PRNG() < 0.7)
		{
			ctx.translate(0, -mainSize - length);
			
			var inset = size / 10;
			var streak = 0.1;
			
			ctx.beginPath();
			ctx.translate(0, mainSize);
			ctx.moveTo(-mainSize * Math.sin(-streak/2 * 2 * Math.PI) , mainSize * (Math.cos(-streak/2 * 2 * Math.PI) - 1));
			ctx.bezierCurveTo(inset, 0,   inset, length-200,   -size * Math.sin(-1/8 * 2 * Math.PI), length - size * Math.cos(-1/8 * 2 * Math.PI));
			ctx.lineTo(-size * Math.sin(1/8 * 2 * Math.PI), length - size * Math.cos(1/8 * 2 * Math.PI));
			ctx.bezierCurveTo(-inset, length-200,   -inset, 0,    mainSize * Math.sin(-streak/2 * 2 * Math.PI) , mainSize * (Math.cos(-streak/2 * 2 * Math.PI) - 1));
			ctx.closePath();
			ctx.fill();
		}
		
		ctx.restore();
	}
	
	mainctx.save();
	mainctx.globalCompositeOperation = "source-over";
	mainctx.globalAlpha = alpha;
	mainctx.drawImage(scratch, 0, 0);
	mainctx.restore();
}

function selectOptionWithValue(elem, value, defaultToZero=false)
{
	for (var i = 0; i < elem.options.length; ++i)
	{
		if (elem.options[i].value == value)
		{
			elem.selectedIndex = i;
			return true;
		}
	}
	if (defaultToZero)
		elem.selectedIndex = 0;
	else
		return false;
}

function countsForLederboards(event)
{
	switch (event.game)
	{
		case "arms":
			return ["leaderboard"].includes(event.type);
		case "kart":
			return ["race"].includes(event.type);
		case "splat":
			return ["friends", "salmon"].includes(event.type);
		case "smash":
			return ["arena"].includes(event.type);
	}
}

function range(size, startAt = 0)
{
	return Array.apply(null, Array(size)).map(function (_, i) {return i + startAt;});
}
