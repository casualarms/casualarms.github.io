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

function renderCheckerboard(mainctx, size, r, g, b, bg, startX, startY, width, height)
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


function generateBanner(width, height, eventdata, canvasid, nativeTime)
{
	var caLogo, mlmLogo, gameLogo, coteLogo, discordLogo, streamIcon, leaderboardsIcon;
	var template, sponsor;
	
	var performBannerRendering = function()
	{
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
		
		var isWarmup = ["mlm_warmup", "era_warmup"].includes(eventdata.type) || eventdata.game == "kart" || eventdata.game == "splat" || eventdata.game == "smash";
		
		// Style presets
		bgColor = "#1d94fc";
		logoBgColor = "yellow";
		boxBgColor = "black";
		stripeBgColor = "#1d94fc";
		stripeStrokeColor = "black";
		websiteBgColor = "yellow";
		
		logoColor = "black";
		titleColor = "yellow";
		timeDateColor = "white";
		hostsColor = "white";
		tierColor = "black";
		websiteColor = "black";
		
		logoFont = "57pt ARMS";
		titleFont = "22pt ARMS";
		timeDateFont = "28pt ARMS";
		tierFont = "15pt ARMS";
		teamTagFont = "14pt ARMS";
		hostsFont = "20pt ARMS";
		websiteFont = "20pt ARMS";
		
		colors = ["#29fb2f", "#efed34", "#fc5935"];
		tiers = ["easy", "medium", "hard"];
		
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = logoBgColor;
		ctx.fillRect(0, 0, width, 115);
		
		// Backgrounds
		switch (eventdata.game)
		{
		case "arms":
			var params = [
				[ 100, 40, 0.6 * Math.PI, 3, 0.4, 0, "rgba(0,0,0,0.09)"],
				[-100, 50, 1.7 * Math.PI, 3, 0.35, 3, "rgba(255,255,255,0.12)"],
			];
			renderSwirls(ctx.canvas, params);
			break;
		
		case "kart":
			titleColor = websiteBgColor = "#f92473";
			var grd = ctx.createLinearGradient(0, 0, 520, 0);
			grd.addColorStop(0.0, "#39cdf6");
			grd.addColorStop(0.8, "#39cdf6");
			grd.addColorStop(1.0, "#f92473");
			stripeBgColor = grd;
			renderCheckerboard(ctx, (height-115-40) / 3, 24, 132, 226, "#0991ff", 0, 115, width, height-115-40);
			renderCheckerboard(ctx, 115 / 3, 50,  50,  50, "#555", 0, 0, width, 115);
			break;
		
		case "splat":
			stripeBgColor = bgColor
			titleColor = websiteBgColor = "#00dd00";
			ctx.fillStyle = "#00dd00";
			ctx.fillRect(0, 0, width, 115);
			break;
		
		case "smash":
			titleColor = websiteBgColor = "white";
			stripeBgColor = "black";
			ctx.fillStyle = "#ff0000";
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = "rgba(0,0,0,0.2)";
			ctx.beginPath();
			ctx.arc(450, height/2 + 50, 200, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.fillStyle = "#ff0000";
			ctx.fillRect(350, 0, 70, height);
			ctx.fillRect(0, 370, width, 15);
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width, 115);
			break;
		}
		
		
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
		
		ctx.fillStyle = websiteBgColor;
		ctx.fillRect(0, 440, width, 40);
		
		// Logo
		ctx.drawImage(caLogo, 22, 0, 114, 114);
		
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
		if (!isWarmup)
		{
			ctx.fillRect  (615, 122, 255, 110);
			ctx.drawImage(discordLogo, 615, 122);
		}
		else
		{
			ctx.fillRect  (10, 320, 255, 110);
			ctx.drawImage(discordLogo, 10, 325);
		}
		
		// Warmup logo
		if (eventdata.game == "arms" && eventdata.type == "mlm_warmup")
			ctx.drawImage(mlmLogo, 630, 120);
		else if (eventdata.game == "arms" && eventdata.type == "era_warmup")
			ctx.drawImage(coteLogo, 630, 120);
		else if (eventdata.game == "kart")
			ctx.drawImage(gameLogo, 590, 150);
		else if (eventdata.game == "splat" || eventdata.game == "smash")
			ctx.drawImage(gameLogo, 610, 115);
		
		var pluralHosts = ("hosts" in eventdata && eventdata.hosts.length > 1) ? "s" : "";
		
		// Lobby title
		var lobbyTitle = ("Lobby Host" + pluralHosts).toUpperCase();
		if (eventdata.game == "kart") lobbyTitle = "TOURNAMENT CODE";
		ctx.font = titleFont;
		ctx.textAlign = "center";
		ctx.fillStyle = titleColor;
		ctx.fillText(unEscapeHTML(eventdata.title).toUpperCase(), 280, 152);
		ctx.fillText(lobbyTitle, 290 + (isWarmup ? 250 : 0), 302);
		
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
			ctx.drawImage(leaderboardsIcon, width - 139, height - 40);
		
		// Streamed
		if ("streamers" in eventdata)
			ctx.drawImage(streamIcon, 0, height - 40);
		
		// Hosts
		var didDrawCodes = false;
		if ("hosts" in eventdata)
		{
			spacing = 35 + (3 - eventdata.hosts.length) * 10;
			for (i = 0; i < eventdata.hosts.length; i++)
			{
				vOffset = 348 + (3 - eventdata.hosts.length)*15 + spacing * i;
				hOffset = 150; if (isWarmup) { hOffset += 130; };
				
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
				
				if (!isWarmup && "tier" in eventdata.hosts[i])
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
	
	var handleTournamentBanner = function()
	{
		ctx.drawImage(template, 0, 0);
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
			
			ctx.drawImage(sponsor, 30, 30);
		}
	}
	
	var imagesOK = 0;
	var imgs = [];
	
	var imageURLs = [];
	imageURLs.push("/assets/banners/logo-casualarms.png");
	imageURLs.push("/assets/banners/logo-discord.png");
	
	if (eventdata.game == "arms" && eventdata.type == "clash")
	{
		imageURLs.push("/assets/banners/template-clash.jpg");
		imageURLs.push("/assets/banners/sponsor-mind-games.png");
	}
	else if (eventdata.game == "arms" && eventdata.type == "scramble")
	{
		imageURLs.push("/assets/banners/template-scramble.jpg");
		imageURLs.push("/assets/banners/sponsor-mind-games.png");
	}
	else
	{
		imageURLs.push("/assets/banners/logo-mlm.png");
		imageURLs.push("/assets/banners/logo-cote.jpg");
		imageURLs.push("/assets/banners/logo-" + eventdata.game + ".png");
		imageURLs.push("/assets/banners/icon-livestream.png");
		imageURLs.push("/assets/banners/icon-leaderboards.png");
	}
	
	loadAllImages();

	function loadAllImages()
	{
		for (var i = 0; i < imageURLs.length; i++)
		{
			var img = new Image();
			imgs.push(img);
			img.onload = function() { imagesOK++; imagesAllLoaded(); };
			img.src = imageURLs[i];
		}      
	}

	var imagesAllLoaded = function()
	{
		if (imagesOK == imageURLs.length)
		{
			// All images are fully loaded an ready to use
			caLogo = imgs[0];
			discordLogo = imgs[1];
			template = imgs[2];
			sponsor = imgs[3];
			
			if (imgs.length > 4)
			{
				mlmLogo = imgs[2];
				coteLogo = imgs[3];
				gameLogo = imgs[4];
				streamIcon = imgs[5];
				leaderboardsIcon = imgs[6];
			}
			
			// Initialization
			var canvasMode = $(canvasid).tagName == "CANVAS";
			var c = canvasMode ? $(canvasid) : document.createElement("canvas");
			c.width = width;
			c.height = height;
			ctx = c.getContext("2d");
			
			if (eventdata.game == "arms" && ["clash", "scramble"].includes(eventdata.type))
				handleTournamentBanner(ctx);
			else
				performBannerRendering(ctx);
			
			// Generate image
			if (!canvasMode)
				$(canvasid).src = c.toDataURL("image/png");
		}
	};
}


