function roundRect(ctx, x, y, w, h, r)
{
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	ctx.beginPath();
	ctx.moveTo(x+r, y);
	ctx.arcTo(x+w, y,   x+w, y+h, r);
	ctx.arcTo(x+w, y+h, x,   y+h, r);
	ctx.arcTo(x,   y+h, x,   y,   r);
	ctx.arcTo(x,   y,   x+w, y,   r);
	ctx.closePath();
	return ctx;
}

function generateBanner(width, height, eventdata, canvasid, nativeTime)
{
	var monthNames = [
		"Jan.", "Feb.", "March", "April", "May", "June", 
		"July", "August", "Sept.", "Oct.", "Nov.", "Dec."];
	
	var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	var diff = timeZoneOffset(eventdata.timeZone);
	if (nativeTime)
		diff = getTimeZoneDiff();
	var startDate = new Date(eventdata.date);
	var endDate = getEventEnd(eventdata);
	convertDates([startDate, endDate], diff);
	
	var dateText = dayNames[startDate.getDay()] + " " + monthNames[startDate.getMonth()] + ' ' + startDate.getDate();
	var timeText = formatTimeUTC(startDate, diff) + " to " + formatTimeUTC(endDate, diff) + ((!nativeTime) ? " " + eventdata.timeZone : "");
	
	var isWarmup = eventdata.type == 3 || eventdata.type == 4;
	
	// Style presets
	bgColor = "#1d94fc";
	logoBgColor = "yellow";
	boxBgColor = "black";
	stripeBgColor = "#1d94fc";
	stripeStrokeColor = "black";
	
	logoColor = "black";
	titleColor = "yellow";
	timeDateColor = "white";
	hostsColor = "white";
	tierColor = "black";
	
	logoFont = "57pt ARMS";
	titleFont = "22pt ARMS";
	timeDateFont = "28pt ARMS";
	tierFont = "15pt ARMS";
	teamTagFont = "14pt ARMS";
	hostsFont = "20pt ARMS";
	
	colors = ["#29fb2f", "#efed34", "#fc5935"];
	tiers = ["easy", "medium", "hard"];
	
	// End of user settings
	// (But you can experiment with the code below)
	
	// Initialization
	var c = document.createElement('canvas');
	c.width = width;
	c.height = height;
	
	if (canvasid != null)
		c = document.getElementById(canvasid);
	ctx = c.getContext("2d");
	
	var caLogo = document.getElementById("logo-casualarms");
	var mlmLogo = document.getElementById("logo-mlm");
	var coteLogo = document.getElementById("logo-cote");
	var discordLogo = document.getElementById("logo-discord");
	
	var pluralHosts = (eventdata.hosts.length > 1) ? "s" : "";
	
	// Backgrounds
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, width, height);
	
	ctx.fillStyle = logoBgColor;
	ctx.fillRect(0, 0, width, 115);
	
	ctx.fillStyle = boxBgColor;
	ctx.fillRect(0, 122, 600, 40);
	ctx.fillRect(!isWarmup ? 76 : 300, 271, 900, 40);
	
	ctx.fillStyle = stripeBgColor;
	ctx.strokeStyle = stripeStrokeColor;
	ctx.lineWidth = 3;
	ctx.fillRect  (80, 5, 460, 15);
	ctx.strokeRect(80, 5, 460, 15);
	
	ctx.fillRect  (370, 87, 600, 15);
	ctx.strokeRect(370, 87, 600, 15);
	
	// Logo
	ctx.drawImage(caLogo, 22, 0, 114, 114);
	
	ctx.font = logoFont;
	ctx.fillStyle = logoColor;
	ctx.textAlign = "left";
	ctx.fillText("Casual ARMS", 170, 80);
	
	// Discord link
	if (!isWarmup)
		ctx.drawImage(discordLogo, 615, 122);
	else
		ctx.drawImage(discordLogo, 10, 320);
	
	// Warmup logo
	if (eventdata.type == 3)
		ctx.drawImage(mlmLogo, 630, 120);
	else if (eventdata.type == 4)
		ctx.drawImage(coteLogo, 630, 120);
	
	// Lobby title
	ctx.font = titleFont;
	ctx.textAlign = "center";
	ctx.fillStyle = titleColor;
	ctx.fillText(eventdata.titleText, 280, 152);
	ctx.fillText("Lobby Host" + pluralHosts, 290 + (isWarmup ? 250 : 0), 302);
	
	// Time and date
	ctx.font = timeDateFont;
	ctx.fillStyle = timeDateColor;
	ctx.textAlign = "center";
	ctx.fillText(dateText, 300, 210);
	ctx.fillText(timeText, 300, 250);
	
	// Hosts
	var didDrawCodes = false;
	spacing = 35 + (3 - eventdata.hosts.length) * 10;
	for (i = 0; i < eventdata.hosts.length; i++)
	{
		vOffset = 348 + (3 - eventdata.hosts.length)*15 + spacing * i;
		hOffset = 150; if (isWarmup) { hOffset += 130; };
		
		if (eventdata.hosts[i].tag != "")
		{
			ctx.font = teamTagFont;
			ctx.fillStyle = hostsColor;
			ctx.textAlign = "left";
			ctx.fillText(eventdata.hosts[i].tag, hOffset, vOffset);
			hOffset += 40;
		}
		
		ctx.font = hostsFont;
		ctx.fillStyle = hostsColor;
		ctx.textAlign = "left";
		ctx.fillText(eventdata.hosts[i].name + "  " + eventdata.hosts[i].code, hOffset, vOffset);
		
		if (!isWarmup && eventdata.hosts[i].tier != 0)
		{
			ctx.fillStyle = colors[eventdata.hosts[i].tier-1];
			roundRect(ctx, 15, vOffset - 21, 120, 25, 10).fill();
			
			ctx.fillStyle = tierColor;
			ctx.font = tierFont;
			ctx.textAlign = "center";
			ctx.fillText(tiers[eventdata.hosts[i].tier-1], 75, vOffset - 1);
		}
		
		if (!isWarmup && eventdata.hosts[i].tier != 0)
		{
			ctx.fillStyle = colors[eventdata.hosts[i].tier-1];
			roundRect(ctx, 790, vOffset - 21, 75, 25, 10).fill();
			
			ctx.fillStyle = tierColor;
			ctx.font = tierFont;
			ctx.textAlign = "center";
			ctx.fillText("" + (eventdata.hosts[i].tier) + " " + (eventdata.hosts[i].tier) + " " +(eventdata.hosts[i].tier), 827, vOffset - 1);
			didDrawCodes = true;
		}
	}
	
	if (didDrawCodes)
	{
		ctx.font = titleFont;
		ctx.textAlign = "center";
		ctx.fillStyle = titleColor;
		ctx.fillText("Lobby Code" + pluralHosts, 720, 302);
	}
	
	// Generate image
	if (canvasid == null)
		return c.toDataURL("image/png");
}
