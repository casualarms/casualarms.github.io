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
	var prng = function()
	{
		hiddenState = (hiddenState + "").hashCode();
		s = hiddenState / (Math.pow(2, 32));
		return s - Math.floor(s);
	};
	
	prng.randomInt = function(low, high)
	{
		var rand1 = prng();
		var rand = low + Math.floor(rand1 * high);
		return rand;
	}
	
	prng.randomItem = function(options)
	{
		var val = options[prng.randomInt(0, options.length)];
		return val;
	}
	
	return prng;
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

function padZero(a)
{
	var text = String(a);
	if (text.length == 1) text = '0' + text;
	return text;
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
		"CST"  : -6,
		"CDT"  : -5,
		"EST"  : -5,
		"EDT"  : -4,
		"GMT"  :  0,
		"UTC"  :  0,
		"BST"  :  1,
		"CET"  :  1,
		"CEST" :  2,
	};
	
	if (!(timeZoneString in timeZoneOffsets))
		return undefined;
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

function withImagesLoaded(imageData, callback)
{
	var imagesOK = 0;
	var images = {};
	for (var key in imageData)
	{
		images[key] = new Image();
		images[key].onload = function() { if (++imagesOK == Object.keys(imageData).length) callback(images); };
		images[key].src = imageData[key];
	}
}

function monthifyLeaderboards(boards)
{
	var leaderboards = [];
	for (var i = 0; i < boards.length; ++i)
	{
		var entry = { name: boards[i].name, monthly: boards[i].monthly };
		if ("id" in boards[i]) entry.id = boards[i].id;
		leaderboards.push(entry);
	}
	return leaderboards.filter(function(item) { return item.monthly > 0; }).sort(function(a, b) { return b.monthly - a.monthly; });
}

function addCurrentSeason()
{
	// Add current leaderboard data to history object
	for (var game in eventGames)
	{
		var today = new Date();
		seasonHistoryJSON[game].splice(0, 0, {
			year  : today.getFullYear(),
			month : today.getMonth() + 1,
			data  : monthifyLeaderboards(leaderboardsJSON[game])
		});
	}
}

function getIndexInLeaderboard(pid, board, withTies=false, monthly=false)
{
	var prop = monthly ? "monthly" : "coins";
	for (var i = 0; i < board.length; ++i)
		if ("id" in board[i] && board[i].id == pid)
			if (!withTies) return i + 1;
			else { var j = i; while (j > 0 && board[i][prop] == board[j - 1][prop]) --j; return j + 1; }
	return undefined;
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

function upcomingEvents()
{
	var now = new Date();
	return eventDataJSON.filter(function(ev) { return now < getEventEnd(ev); });
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

function getTheme(game, themeID)
{
	for (var t = 0; t < eventThemes[game].length; ++t)
		if (eventThemes[game][t].key == themeID)
			return eventThemes[game][t];
	return null;
}

function getStageSet(game, stageID)
{
	for (var t = 0; t < stageSets[game].length; ++t)
		if (stageSets[game][t].key == stageID)
		{
			var stages = [];
			for (var s = 0; s < stageSets[game][t].stages.length; ++s)
			{
				var stage = stageSets[game][t].stages[s];
				if (typeof stage === 'object')
				{
					for (var b = stage.start; b <= stage.end; ++b)
						stages.push(b);
				}
				else stages.push(stageSets[game][t].stages[s]);
			}
			return stages;
		}
	return null;
}

function getItemSet(game, itemID)
{
	for (var t = 0; t < itemSets[game].length; ++t)
		if (itemSets[game][t].key == itemID)
		{
			var items = [];
			for (var i = 0; i < itemSets[game][t].items.length; ++i)
			{
				var item = itemSets[game][t].items[i];
				if (typeof item === 'object')
				{
					for (var b = item.start; b <= item.end; ++b)
						items.push(b);
				}
				else items.push(itemSets[game][t].items[i]);
			}
			return items;
		}
	return null;
}

function drawStagesItems(mode, canvasid, activeIndexes)
{
	var imageData = {
		"stages" : "/assets/stages.jpg",
		"items"  : "/assets/items.jpg",
	};
	
	var config = {
		items : {
			width        : 548,
			height       : 230,
			offset_x     : 1,
			offset_y     : 1,
			box_width    : 39,
			box_height   : 38,
			count        : 82,
			row_count    : 14,
			start_index  : 1,
		},
		stages : {
			width        : 410,
			height       : 313,
			offset_x     : 1,
			offset_y     : 0,
			box_width    : 37.2,
			box_height   : 31.2,
			count        : 103,
			row_count    : 11,
			start_index  : 1,
		}
	}[mode];
	
	withImagesLoaded(imageData, function(images)
	{
		var canvasMode = $(canvasid).tagName == "CANVAS";
		var c = canvasMode ? $(canvasid) : document.createElement("canvas");
		var ctx = c.getContext("2d");
		
		c.width  = config.width;
		c.height = config.height;
		ctx.drawImage(images[mode], 0, 0);
		
		for (var i = 0; i < config.count; ++i)
		{
			if (!activeIndexes.includes(i))
			{
				var index = config.start_index + i;
				var x = index % config.row_count;
				var y = Math.floor(index / config.row_count);
				var width = config.box_width;
				var height = config.box_height;
				
				ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
				ctx.fillRect(x * config.box_width + config.offset_x, y * config.box_height + config.offset_y, config.box_width, config.box_height);
				ctx.font = "30px sans-serif";
				ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
				ctx.textAlign = "center"; 
				ctx.fillText("⊘", (x+0.5) * config.box_width + config.offset_x, (y+0.5) * config.box_height + config.offset_y + 9);
			}
		}
		
		if (!canvasMode) $(canvasid).src = c.toDataURL("image/jpg");
	});
}

function printStageSet(game, stages)
{
	var myid = Math.random().toString(36).substring(7);
	var html = "<div class='stage-container' id='" + myid + "' onclick=\"expandStages('" + myid + "');\">";
	html += "<div class='stage-container-header'>" + stages.length + "/" + eventStages[game].length + " stages (click to expand)</div>";
	for (var s = 0; s < stages.length; ++s)
		html += "<div class='stage active' style='display: none;'>" + eventStages[game][stages[s]] + "</div>";
	return html + "</div>";
}

function printItemSet(game, items)
{
	var myid = Math.random().toString(36).substring(7);
	var html = "<div class='stage-container' id='" + myid + "' onclick=\"expandStages('" + myid + "');\">";
	html += "<div class='stage-container-header'>" + items.length + "/" + eventItems[game].length + " items (click to expand)</div>";
	for (var i = 0; i < items.length; ++i)
		html += "<div class='stage active' style='display: none;'>" + eventItems[game][items[i]] + "</div>";
	return html + "</div>";
}

function printTheme(game, theme, concise)
{
	function printMode(theme, key, name)
	{
		return "<p><span class='mode-name'>" + name + "</span> <span class='mode-options'>  " + theme[key] + "  </span></p>";
	}
	
	function printBinaryMode(theme, key, name)
	{
		return "<p><span class='mode-name'>" + name + "</span> <span class='mode-options option-" + (theme[key] ? "on" : "off") + "'>  " + (theme[key] ? "On" : "Off") + "  </span></p>";
	}
	
	function printMultiMode(theme, key, name)
	{
		var html = "";
		if (theme[key].length > 0)
		{
			html += "<p><span class='mode-name'>" + name + "</span> <span class='mode-options'>  ";
			for (var s = 0; s < theme[key].length; ++s)
				html += theme[key][s] + "P  ";
			html += "</span></p>"
		}
		return html;
	}
	
	var html = "<h3 id='" + theme.key + "'>" + theme.name + "</h3>";
	if (!concise) html += "<p>" + theme.description + "</p>";
	
	if (game == "arms")
	{
		html += printMultiMode(theme, "solo_fight", "Solo Fight");
		html += printMultiMode(theme, "team_fight", "Team Fight");
		html += printMultiMode(theme, "vs_hedlok", "VS Hedlok");
		html += printMultiMode(theme, "hedlok_scramble", "Hedlok Scramble");
		html += printMultiMode(theme, "hoops", "Hoops");
		html += printMultiMode(theme, "skillshot", "Skillshot");
		html += printMultiMode(theme, "v_ball", "V-ball");
		html += printBinaryMode(theme, "items", "Items");
		html += printBinaryMode(theme, "streak_bonuses", "Streak Bonuses");
	}
	else if (game == "kart")
	{
		html += printMode(theme, "mode", "Mode");
		html += printBinaryMode(theme, "teams", "Teams");
		html += printMode(theme, "items", "Items");
		html += printMode(theme, "round_length", "Round Length");
		html += printMode(theme, "cpu", "CPU");
		html += printMode(theme, "vehicles", "Vehicles");
		html += printBinaryMode(theme, "smart_steering", "Smart Steering");
	}
	else if (game == "splat")
	{
		html += printMode(theme, "mode-1", "Mode 1");
		html += printMode(theme, "mode-2", "Mode 2");
		html += printBinaryMode(theme, "abilities", "Sub Abilities");
	}
	else if (game == "smash")
	{
		html +=        printMode(theme, "title",         "Arena Title");
		html +=        printMode(theme, "type",          "Type");
		html +=        printMode(theme, "visibility",    "Visibility");
		html +=        printMode(theme, "format",        "Format");
		html +=        printMode(theme, "rotation",      "Rotation");
		
		html += "<div class='mode-group'><span class='mode-group-heading'>Rules</span>";
		html +=        printMode(theme["rules"], "style",         "Style");
		if (theme["rules"]["style"] == "Stamina")
			html +=     printMode(theme["rules"], "stamina",       "Stamina");
		if (theme["rules"]["style"] != "Time")
			html +=     printMode(theme["rules"], "stock",         "Stock");
		html +=        printMode(theme["rules"], "time",          "Time Limit");
		html +=  printBinaryMode(theme["rules"], "fs-meter",      "FS Meter");
		html +=  printBinaryMode(theme["rules"], "handicap",      "Damage Handicap");
		html +=        printMode(theme["rules"], "items",         "Items > Intensity");
		html +=  printBinaryMode(theme["rules"], "hazards",       "Stage Hazards");
		html +=  printBinaryMode(theme["rules"], "team-attack",   "Team Attack");
		html +=        printMode(theme["rules"], "launch-rate",   "Launch Rate");
		html +=  printBinaryMode(theme["rules"], "score-display", "Score Display");
		html +=  printBinaryMode(theme["rules"], "show-damage",   "Show Damage");
		
		html += "</div><div class='mode-group'><span class='mode-group-heading'>More</span>";
		html +=        printMode(theme["more"], "max-players",   "Max Players");
		html +=        printMode(theme["more"], "stage",         "Stage");
		html +=  printBinaryMode(theme["more"], "spirits",       "Spirits");
		html +=  printBinaryMode(theme["more"], "voice-chat",    "Voice Chat");
		html += "</div>";
	}
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

function renderSwirl(ctx, startX, startY, maxRadius, total_rotation, curvature, total_width, gaps, color)
{
	var components = gaps * 2 + 1;
	var width = total_width / components;
	for (var c = 0; c < components; c += 2)
	{
		var rotation = total_rotation + c * width;
		ctx.fillStyle = color;
		ctx.moveTo(startX, startY);
		ctx.beginPath();
		
		var steps = 300;
		function calcStep(step, angle)
		{
			var radius = step / steps * maxRadius;
			var phi = angle + step / steps * curvature;
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
}

function renderCheckerboard(mainctx, size, r, g, b, bg, startX, startY, width, height, fade)
{
	var scratch = document.createElement('canvas');
	scratch.width = width;
	scratch.height = height;
	var scratchctx = scratch.getContext("2d");
	
	for (var i = 0; i < width / size; i++)
		for (var j = 0; j < height / size; j++)
			if ((i+j) % 2 == 0)
				scratchctx.fillRect(i*size, j*size, size, size);
	
	var grd = scratchctx.createLinearGradient(0, 0 + height, 0, 0);
	grd.addColorStop(0, "rgba(" + r + "," + g + "," + b + ",1)");
	grd.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
	
	if (!fade) grd = "rgba(" + r + "," + g + "," + b + ",1)";
	scratchctx.globalCompositeOperation = "source-in";
	scratchctx.fillStyle = grd;
	scratchctx.fillRect(0, 0, width, height);
	
	scratchctx.globalCompositeOperation = "destination-over";
	scratchctx.fillStyle = bg;
	scratchctx.fillRect(0, 0, width, height);
	
	mainctx.save();
	mainctx.globalCompositeOperation = "source-over";
	mainctx.drawImage(scratch, startX, startY);
	mainctx.restore();
}

function renderSplash(mainctx, width, height, x, y, scale, color, alpha, PRNG)
{
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
			ctx.moveTo(-mainSize * Math.sin(-streak/2 * 2 * Math.PI), mainSize * (Math.cos(-streak/2 * 2 * Math.PI) - 1));
			ctx.bezierCurveTo(inset, 0,   inset, length-200, -size * Math.sin(-1/8 * 2 * Math.PI), length - size * Math.cos(-1/8 * 2 * Math.PI));
			ctx.lineTo(-size * Math.sin(1/8 * 2 * Math.PI), length - size * Math.cos(1/8 * 2 * Math.PI));
			ctx.bezierCurveTo(-inset, length-200, -inset, 0, mainSize * Math.sin(-streak/2 * 2 * Math.PI), mainSize * (Math.cos(-streak/2 * 2 * Math.PI) - 1));
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

function renderSmashBall(mainctx, width, height, color, size, offset_x, offset_y)
{
	var scratch = document.createElement('canvas');
	scratch.width = width;
	scratch.height = height;
	var ctx = scratch.getContext("2d");
	
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc((0.5 + offset_x) * width, (0.5 + offset_y) * height, size, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.clearRect((0.5 + offset_x) * width - 0.6 * size, 0, size * 0.42, height);
	ctx.clearRect(0, (0.5 + offset_y) * height + 0.28 * size, width, size * 0.17);
	
	mainctx.drawImage(scratch, 0, 0);
}

function renderStats(ctx, midX, midY, info)
{
	// Initialization
	var nameFont = "40pt Arial";
	var attributeFont = "20pt Arial";
	ctx.lineCap = "round";
	
	// Background
	ctx.fillStyle = info.bg_color;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	var numLines = 30;
	ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
	ctx.lineWidth = ctx.canvas.width / numLines / 3;
	for (var i = -numLines; i < numLines; i++)
	{
		var x = (i + 0.5) * ctx.canvas.width / numLines;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x + 500, ctx.canvas.height);
		ctx.stroke();
	}
	
	// Name
	ctx.font = nameFont;
	ctx.textAlign = "center";
	ctx.fillStyle = ctx.fillStyle = info.name_color;
	ctx.fillText(info.caps ? info.name.toUpperCase() : info.name, midX, 80);
	
	// Circumferences
	var thickness = ctx.canvas.height * 0.3 / info.steps;
	ctx.strokeStyle = info.grid_color;
	ctx.lineWidth = 3;
	for (var r = 1; r <= info.steps; r++)
	{
		ctx.beginPath();
		ctx.moveTo(midX, midY - r * thickness);
		for (var i = 0; i < info.stats.length; i++)
		{
			var angle = Math.PI * 2 * i / info.stats.length - Math.PI / 2;
			var x = midX + Math.cos(angle) * r * thickness;
			var y = midY + Math.sin(angle) * r * thickness;
			ctx.lineTo(x, y);
		}
		
		ctx.lineTo(midX, midY - r * thickness);
		ctx.stroke();
	}
	
	// Center lines
	ctx.lineWidth = 5;
	for (var i = 0; i < info.stats.length; i++)
	{
		ctx.beginPath();
		var angle = Math.PI * 2 * i / info.stats.length - Math.PI / 2;
		ctx.lineTo(midX, midY);
		x = midX + Math.cos(angle) * info.steps * thickness;
		y = midY + Math.sin(angle) * info.steps * thickness;
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	// Highlight area
	ctx.fillStyle = info.highlight_color;
	ctx.beginPath();
	ctx.moveTo(midX, midY - info.stats[0][1] * thickness);
	for (var i = 0; i < info.stats.length; i++)
	{
		var angle = Math.PI * 2 * i / info.stats.length - Math.PI / 2;
		var x = midX + Math.cos(angle) * info.stats[i][1] * thickness;
		var y = midY + Math.sin(angle) * info.stats[i][1] * thickness;
		ctx.lineTo(x, y);
	}
	ctx.fill();
	
	// Attribute names
	ctx.font = attributeFont;
	ctx.textAlign = "center";
	ctx.fillStyle = ctx.fillStyle = info.attr_color;
	
	for (var i = 0; i < info.stats.length; i++)
	{
		var angle = Math.PI * 2 * i / info.stats.length - Math.PI / 2;
		var offset = 35;
		var x = midX + Math.cos(angle) * (info.steps * thickness + offset*2.5);
		var y = midY + Math.sin(angle) * (info.steps * thickness + offset) + 10;
		ctx.fillText(info.caps ? info.stats[i][0].toUpperCase() : info.stats[i][0], x, y);
	}
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
