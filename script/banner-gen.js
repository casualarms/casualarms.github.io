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

function performBannerRendering(ctx, eventdata, nativeTime, images)
{
	var width = 880;
	var height = 480;
	
	if (eventdata.game == "arms" && ["clash", "scramble"].includes(eventdata.type))
	{
		ctx.drawImage(images["template"], 0, 0);
		var startDate = new Date(eventdata.date);
		var dateText = (monthNames[startDate.getMonth()].slice(0, 3) + ". " + startDate.getDate()).toUpperCase();
		var timeText = formatTime(startDate).toUpperCase();
		
		if (!nativeTime)
		{
			var diff = timeZoneOffset(eventdata.tz);
			startDate.setUTCHours(startDate.getUTCHours() + diff);
			
			dateText = (monthNames[startDate.getUTCMonth()].slice(0, 3) + ". " + startDate.getUTCDate()).toUpperCase();
			timeText = (formatTimeUTC(startDate, diff) + " " + eventdata.tz).toUpperCase();
		}
		
		dateFont = "58pt ARMS";
		timeFont = "28pt ARMS";
		sponsorFont = "12pt ARMS";
		timeDateColor = (eventdata.type == "clash") ? "white" : "yellow";
		
		ctx.fillStyle = timeDateColor;
		ctx.textAlign = "center";
		
		ctx.shadowColor = "black";
		ctx.shadowBlur = 8;
		
		var clashOffsetX = (eventdata.type == "clash") ? -150 : 0;
		
		ctx.font = dateFont;
		for (var r = 0; r < 3; ++r)
			ctx.fillText(dateText, 220, 405);
		ctx.font = timeFont;
		for (var r = 0; r < 3; ++r)
			ctx.fillText(timeText, 700 + clashOffsetX, 410);
		
		if (eventdata.sponsor == "mindgames")
		{
			ctx.font = sponsorFont;
			for (var r = 0; r < 3; ++r)
				ctx.fillText("SPONSORED BY", 100, 30);
			
			ctx.drawImage(images["sponsor"], 30, 30);
		}
		return;
	}
	
	if (eventdata.game == "splat" && eventdata.type == "cookoff")
	{
		ctx.drawImage(images["template"], 0, 0);
		var startDate = new Date(eventdata.date);
		var dateText = (monthNames[startDate.getMonth()] + " " + startDate.getDate()).toUpperCase();
		dateText += "    " + formatTime(startDate).toUpperCase();
		
		if (!nativeTime)
		{
			var diff = timeZoneOffset(eventdata.tz);
			startDate.setUTCHours(startDate.getUTCHours() + diff);
			
			dateText = (monthNames[startDate.getUTCMonth()] + " " + startDate.getUTCDate()).toUpperCase();
			dateText += "    " + (formatTimeUTC(startDate, diff) + " " + eventdata.tz).toUpperCase();
		}
		
		
		ctx.fillStyle = "black";
		ctx.fillRect(0, 425, width, 55);
		
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		
		ctx.font = "30pt ARMS";
		ctx.fillText(dateText, 440, 467);
		
		return;
	}
	
	
	var startDate = new Date(eventdata.date);
	var endDate = getEventEnd(eventdata);
	
	var dateText = (dayNames[startDate.getDay()] + " " + monthNames[startDate.getMonth()].slice(0, 3) + ". " + startDate.getDate()).toUpperCase();
	var timeText = (formatTime(startDate) + " to " + formatTime(endDate)).toUpperCase();
	
	if (!nativeTime)
	{
		var diff = timeZoneOffset(eventdata.tz);
		startDate.setUTCHours(startDate.getUTCHours() + diff);
		endDate.setUTCHours(endDate.getUTCHours() + diff);
		
		dateText = (dayNames[startDate.getUTCDay()] + " " + monthNames[startDate.getUTCMonth()].slice(0, 3) + ". " + startDate.getUTCDate()).toUpperCase();
		timeText = (formatTimeUTC(startDate, diff) + " to " + formatTimeUTC(endDate, diff) + " " + eventdata.tz).toUpperCase();
	}
	
	// Style presets
	var bgColor = "#1d94fc";
	var logoBgColor = "yellow";
	var boxBgColor = "black";
	var stripeBgColor = "#1d94fc";
	var stripeStrokeColor = "black";
	var websiteBgColor = "yellow";
	
	var logoColor = "black";
	var titleColor = "yellow";
	var timeDateColor = "white";
	var hostsColor = "white";
	var tierColor = "black";
	var websiteColor = "black";
	
	var logoFont = "57pt ARMS";
	var titleFont = "22pt ARMS";
	var timeDateFont = "28pt ARMS";
	var tierFont = "15pt ARMS";
	var teamTagFont = "14pt ARMS";
	var hostsFont = "20pt ARMS";
	var websiteFont = "20pt ARMS";
	var discordFont = "bold 17pt sans-serif";
	
	var colors = ["#29fb2f", "#efed34", "#fc5935"];
	var tiers = ["easy", "medium", "hard"];
	
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = logoBgColor;
	ctx.fillRect(0, 0, width, 115);
	
	// Backgrounds
	switch (eventdata.game)
	{
	case "arms":
		renderSwirl(ctx, width / 2 + 100, height / 2 + 40, width * 2, 0.6 * Math.PI, 3, 0.40, 0, "rgba(  0,   0,   0, 0.09)");
		renderSwirl(ctx, width / 2 - 100, height / 2 + 50, width * 2, 1.7 * Math.PI, 3, 0.35, 3, "rgba(255, 255, 255, 0.12)");
		break;
	
	case "kart":
		titleColor = websiteBgColor = "#f92473";
		var grd = ctx.createLinearGradient(0, 0, 520, 0);
		grd.addColorStop(0.0, "#39cdf6");
		grd.addColorStop(0.8, "#39cdf6");
		grd.addColorStop(1.0, "#f92473");
		stripeBgColor = grd;
		renderCheckerboard(ctx, (height-115-40) / 3, 24, 132, 226, "#0991ff", 0, 115, width, height-115-40, true);
		renderCheckerboard(ctx, 115 / 3, 50,  50,  50, "#555", 0, 0, width, 115, false);
		break;
	
	case "splat3": /* fall-through */
	case "splat":
		if (eventdata.game == "splat3")
		{
			ctx.fillStyle = "#5c35df";
			ctx.fillRect(0, 0, width, height);
		}

		if (eventdata.type == "salmon")
		{
			ctx.fillStyle = "#c03e07";
			ctx.fillRect(0, 0, width, height);
		//	ctx.fillStyle = logoBgColor;
		//	ctx.fillRect(0, 0, width, 115);
		}
		
		stripeBgColor = (eventdata.type == "salmon") ? "#e321cb" : bgColor;
		titleColor = websiteBgColor = (eventdata.type == "salmon") ? "#35a054" : "yellow";
		renderSplash(ctx, width, height, -200, 100, 1.0, "rgb(0,0,0)",       0.10, Math.seed("ec7O63".hashCode()));
		renderSplash(ctx, width, height,  200,   0, 1.4, "rgb(255,255,255)", 0.15, Math.seed("pGvubT".hashCode()));
		ctx.fillStyle = (eventdata.type == "salmon") ? "#35a054" : "yellow";
		ctx.fillRect(0, 0, width, 115);
		break;
	
	case "smash":
		titleColor = websiteBgColor = "white";
		stripeBgColor = "black";
		renderSmashBall(ctx, width, height, "rgba(0, 0, 0,       0.12)",  70, -0.2, -0.07);
		renderSmashBall(ctx, width, height, "rgba(255, 255, 255, 0.2)", 180, 0.15, 0.07);
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, 115);
		break;
	
	case "variety":
		titleColor = "white";
		websiteBgColor = "#ccc";
		stripeBgColor = bgColor;
		ctx.fillStyle = ctx.createPattern(images["pattern"], "repeat");
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "#ccc";
		ctx.fillRect(0, 0, width, 115);
		break;
	}
	
	ctx.fillStyle = boxBgColor;
	ctx.fillRect(0, 122, 600, 40);
	ctx.fillRect(320, 271, 900, 40);
	
	ctx.fillStyle = stripeBgColor;
	ctx.strokeStyle = stripeStrokeColor;
	ctx.lineWidth = 3;
	ctx.fillRect  (80, 5, 460, 15);
	ctx.strokeRect(80, 5, 460, 15);
	
	ctx.fillRect  (370, 87, 600, 15);
	ctx.strokeRect(370, 87, 600, 15);
	
	ctx.fillStyle = websiteBgColor;
	ctx.fillRect(0, 440, width, 40);
	
	// Logo
	ctx.drawImage(images["casualarms"], 22, 0, 114, 114);
	
	ctx.save();
	ctx.font = logoFont;
	ctx.fillStyle = logoColor;
	ctx.textAlign = "left";
	if (eventdata.game == "kart")
	{
		ctx.shadowColor = "white";
		ctx.shadowBlur = 8;
		ctx.fillStyle = "black";
		for (var r = 0; r < 3; ++r)
			ctx.fillText("Casual ARMS".toUpperCase(), 170, 80);
	}
	else ctx.fillText("Casual ARMS".toUpperCase(), 170, 80);
	ctx.restore();
	
	// Discord link
	ctx.fillRect(0, 271, 280, 40);
	ctx.fillStyle = "black";
	ctx.font = discordFont;
	ctx.fillText("discord.gg/u6cfeN9", 53, 300);
	ctx.drawImage(images["discord"], 0, 271);
	
	// Warmup logo
	if (eventdata.game == "kart")
		ctx.drawImage(images["game"], 590, 150);
	else
		ctx.drawImage(images["game"], 610, 115);
	
	var pluralHosts = ("hosts" in eventdata && eventdata.hosts.length > 1) ? "S" : "";
	
	// Lobby title
	var lobbyTitle = ("LOBBY HOST" + pluralHosts).toUpperCase();
	if (eventdata.game == "kart" && eventdata.type == "leaderboard") lobbyTitle = "TOURNAMENT CODE";
	else if (eventdata.type == "tournament") lobbyTitle = "TOURNAMENT INFO";
	ctx.font = titleFont;
	ctx.textAlign = "center";
	ctx.fillStyle = titleColor;
	ctx.fillText(unEscapeHTML(eventdata.title).toUpperCase(), 290, 152);
	ctx.fillText(lobbyTitle, 600, 302);
	
	// Time and date
	ctx.font = timeDateFont;
	ctx.fillStyle = timeDateColor;
	ctx.textAlign = "center";
	ctx.fillText(dateText, 300, 210);
	ctx.fillText(timeText, 300, 250);
	
	// Website
	ctx.font = websiteFont;
	ctx.textAlign = "center";
	ctx.fillStyle = websiteColor;
	var websiteText = ("theme" in eventdata) ? "\"" + getTheme(eventdata.game, eventdata.theme).name + "\"" : "www.casualarms.net";
	ctx.fillText(websiteText.toUpperCase(), 440, 470);
	
	if ("theme" in eventdata)
	{
		ctx.fillStyle = (eventdata.game != "kart") ? websiteColor : "white";
		ctx.font = "12pt ARMS";
		ctx.fillText("www.casualarms.net".toUpperCase(), 716, 18);
	}
	
	// Leaderboards
	if (countsForLederboards(eventdata))
		ctx.drawImage(images["leaderboards"], width - 139, height - 40);
	
	// Streamed
	if ("mixers" in eventdata)
		ctx.drawImage(images["livestream-mixer"], 0, height - 40);
	else if ("streamers" in eventdata)
		ctx.drawImage(images["livestream"], 0, height - 40);
	
	if (eventdata.type == "tournament")
	{
		ctx.font = hostsFont;
		ctx.fillStyle = hostsColor;
		ctx.textAlign = "center";
		ctx.fillText(eventdata.description.toUpperCase(), 440, 360);
		ctx.fillText(eventdata.url.toUpperCase(), 440, 405);
	}
	
	// Hosts
	var didDrawCodes = false;
	if ("hosts" in eventdata)
	{
		var spacing = 35 + (3 - eventdata.hosts.length) * 10;
		for (i = 0; i < eventdata.hosts.length; i++)
		{
			var vOffset = 348 + (3 - eventdata.hosts.length)*15 + spacing * i;
			var hOffset = 150;
			
			if ("tag" in eventdata.hosts[i])
			{
				ctx.font = teamTagFont;
				ctx.fillStyle = hostsColor;
				ctx.textAlign = "left";
				ctx.fillText(eventdata.hosts[i].tag.toUpperCase(), hOffset, vOffset);
				hOffset += 40;
			}
			
			ctx.font = hostsFont;
			ctx.fillStyle = hostsColor;
			ctx.textAlign = "left";
			ctx.fillText((unEscapeHTML(eventdata.hosts[i].name) + "  " + unEscapeHTML(eventdata.hosts[i].code)).toUpperCase(), hOffset, vOffset);
			
			if ("tier" in eventdata.hosts[i])
			{
				ctx.fillStyle = colors[eventdata.hosts[i].tier-1];
				roundRect(ctx, 790, vOffset - 21, 75, 25, 10).fill();
				
				if (eventdata.hosts.length > 1)
					roundRect(ctx,  15, vOffset - 21, 120, 25, 10).fill();
				
				ctx.fillStyle = tierColor;
				ctx.font = tierFont;
				ctx.textAlign = "center";
				if (eventdata.hosts.length > 1)
					ctx.fillText(tiers[eventdata.hosts[i].tier-1].toUpperCase(), 75, vOffset - 1);
				
				ctx.fillText("" + (eventdata.hosts[i].tier) + " " + (eventdata.hosts[i].tier) + " " +(eventdata.hosts[i].tier), 827, vOffset - 1);
				didDrawCodes = true;
			}
		}
		
		if (didDrawCodes)
		{
			ctx.font = titleFont;
			ctx.textAlign = "center";
			ctx.fillStyle = titleColor;
			ctx.fillText(("Lobby Code" + pluralHosts).toUpperCase(), 720, 302);
		}
	}
}

function bannerImageData(eventdata)
{
	var imageData = {
		"casualarms" : "/assets/banners/logo-casualarms.png",
		"discord"  : "/assets/banners/logo-discord.png",
	};
	
	if (["clash", "scramble", "cookoff"].includes(eventdata.type))
	{
		imageData["template"]     = "/assets/banners/template-" + eventdata.type + ".jpg";
		imageData["sponsor"]      = "/assets/banners/sponsor-mind-games.png";
	}
	else
	{
		imageData["mlm"]          = "/assets/banners/logo-mlm.png";
		imageData["cote"]         = "/assets/banners/logo-cote.jpg";
		imageData["game"]         = "/assets/banners/logo-" + eventdata.game + ((eventdata.game == "splat" && eventdata.type == "salmon") ? "-sr" : "") + ".png";
		imageData["livestream"]   = "/assets/banners/icon-livestream.png";
		imageData["livestream-mixer"]   = "/assets/banners/icon-mixer.png";
		imageData["leaderboards"] = "/assets/banners/icon-leaderboards.png";
		imageData["pattern"] = "/assets/backdrop.png";
	}
	
	return imageData;
}

function generateBanner(width, height, eventdata, canvasid, nativeTime)
{
	withImagesLoaded(bannerImageData(eventdata), function(images)
	{
		// Banner URL overrides generator
		if (!canvasMode && "banner" in eventdata)
		{
			$(canvasid).src = eventdata.banner;
			return;
		}
		
		var canvasMode = $(canvasid).tagName == "CANVAS";
		var c = canvasMode ? $(canvasid) : document.createElement("canvas");
		c.width = width;
		c.height = height;
		ctx = c.getContext("2d");
		
		performBannerRendering(ctx, eventdata, nativeTime, images);
		
		// Generate image
		if (!canvasMode)
			$(canvasid).src = c.toDataURL("image/png");
	});
}
