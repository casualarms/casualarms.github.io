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
	var caLogo, mlmLogo, mk8dLogo, coteLogo, discordLogo;
	var template, sponsor;
	
	var performBannerRendering = function()
	{
		var startDate = new Date(eventdata.date);
		var endDate = getEventEnd(eventdata);
		
		var dateText = (dayNames[startDate.getDay()] + " " + monthNames[startDate.getMonth()] + " " + startDate.getDate()).toUpperCase();
		var timeText = (formatTime(startDate) + " to " + formatTime(endDate)).toUpperCase();
		
		if (!nativeTime)
		{
			var diff = timeZoneOffset(eventdata.timeZone);
			startDate.setUTCHours(startDate.getUTCHours() + diff);
			endDate.setUTCHours(endDate.getUTCHours() + diff);
			
			dateText = (dayNames[startDate.getUTCDay()] + " " + monthNames[startDate.getUTCMonth()] + " " + startDate.getUTCDate()).toUpperCase();
			timeText = (formatTimeUTC(startDate, diff) + " to " + formatTimeUTC(endDate, diff) + " " + eventdata.timeZone).toUpperCase();
		}
		
		var isWarmup = eventdata.type == 3 || eventdata.type == 4 || eventdata.type == 6;
		
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
		websiteFont = "26pt ARMS";
		
		if (eventdata.type == 6)
		{
			titleColor = "#f92473";
			websiteBgColor = "#f92473";
			
			var grd = ctx.createLinearGradient(0, 0, 520, 0);
			grd.addColorStop(0.0, "#39cdf6");
			grd.addColorStop(0.8, "#39cdf6");
			grd.addColorStop(1.0, "#f92473");
			stripeBgColor = grd;
		}
		
		colors = ["#29fb2f", "#efed34", "#fc5935"];
		tiers = ["easy", "medium", "hard"];
		
		var pluralHosts = (eventdata.hosts.length > 1) ? "s" : "";
		
		// Backgrounds
		if (eventdata.type != 6)
		{
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, width, height);
			ctx.fillStyle = logoBgColor;
			ctx.fillRect(0, 0, width, 115);
		}
		else
		{
			renderCheckerboard(ctx, (height-115-40) / 3, 24, 132, 226, "#0991ff", 0, 115, width, height-115-40);
			renderCheckerboard(ctx, 115 / 3, 50,  50,  50, "#555", 0, 0, width, 115);
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
		if (eventdata.type == 6)
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
			ctx.drawImage(discordLogo, 615, 122);
		else
			ctx.drawImage(discordLogo, 10, 320);
		
		// Warmup logo
		if (eventdata.type == 3)
			ctx.drawImage(mlmLogo, 630, 120);
		else if (eventdata.type == 4)
			ctx.drawImage(coteLogo, 630, 120);
		else if (eventdata.type == 6)
			ctx.drawImage(mk8dLogo, 590, 150);
		
		// Lobby title
		var lobbyTitle = ("Lobby Host" + pluralHosts).toUpperCase();
		if (eventdata.type == 6) lobbyTitle = "TOURNAMENT CODE";
		ctx.font = titleFont;
		ctx.textAlign = "center";
		ctx.fillStyle = titleColor;
		ctx.fillText(unEscapeHTML(eventdata.titleText).toUpperCase(), 280, 152);
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
		ctx.fillText("www.casualarms.net".toUpperCase(), 440, 472);
		
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
				ctx.fillText(eventdata.hosts[i].tag.toUpperCase(), hOffset, vOffset);
				hOffset += 40;
			}
			
			ctx.font = hostsFont;
			ctx.fillStyle = hostsColor;
			ctx.textAlign = "left";
			ctx.fillText((unEscapeHTML(eventdata.hosts[i].name) + "  " + unEscapeHTML(eventdata.hosts[i].code)).toUpperCase(), hOffset, vOffset);
			
			if (!isWarmup && eventdata.hosts[i].tier != 0 && eventdata.hosts.length > 1)
			{
				ctx.fillStyle = colors[eventdata.hosts[i].tier-1];
				roundRect(ctx, 15, vOffset - 21, 120, 25, 10).fill();
				
				ctx.fillStyle = tierColor;
				ctx.font = tierFont;
				ctx.textAlign = "center";
				ctx.fillText(tiers[eventdata.hosts[i].tier-1].toUpperCase(), 75, vOffset - 1);
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
			ctx.fillText(("Lobby Code" + pluralHosts).toUpperCase(), 720, 302);
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
			var diff = timeZoneOffset(eventdata.timeZone);
			startDate.setUTCHours(startDate.getUTCHours() + diff);
			
			dateText = (monthNames[startDate.getUTCMonth()].slice(0, 3) + ". " + startDate.getUTCDate()).toUpperCase();
			timeText = (formatTimeUTC(startDate, diff) + " " + eventdata.timeZone).toUpperCase();
		}
		
		dateFont = "58pt ARMS";
		timeFont = "32pt ARMS";
		sponsorFont = "12pt ARMS";
		timeDateColor = (eventdata.type == 2) ? "white" : "yellow";
		
		ctx.fillStyle = timeDateColor;
		ctx.textAlign = "center";
		
		ctx.shadowColor = "black";
		ctx.shadowBlur = 8;
		
		var clashOffsetX = (eventdata.type == 2) ? -50 : 0;
		var clashOffsetY = (eventdata.type == 2) ?  20 : 0;
		
		ctx.font = dateFont;
		for (var r = 0; r < 3; ++r)
			ctx.fillText(dateText, 220, 405);
		ctx.font = timeFont;
		for (var r = 0; r < 3; ++r)
			ctx.fillText(timeText, 700 + clashOffsetX, 400 + clashOffsetY);
		
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
	
	if (eventdata.type == 2)
	{
		imageURLs.push("/assets/banners/template-clash.jpg");
		imageURLs.push("/assets/banners/sponsor-mind-games.png");
	}
	else if (eventdata.type == 5)
	{
		imageURLs.push("/assets/banners/template-scramble.jpg");
		imageURLs.push("/assets/banners/sponsor-mind-games.png");
	}
	else
	{
		imageURLs.push("/assets/banners/logo-mlm.jpg");
		imageURLs.push("/assets/banners/logo-cote.jpg");
		imageURLs.push("/assets/banners/logo-mk8d.png");
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
				mk8dLogo = imgs[4];
			}
			
			// Initialization
			var canvasMode = $(canvasid).tagName == "CANVAS";
			var c = canvasMode ? $(canvasid) : document.createElement("canvas");
			c.width = width;
			c.height = height;
			ctx = c.getContext("2d");
			
			if (eventdata.type == 2 || eventdata.type == 5)
				handleTournamentBanner(ctx);
			else
				performBannerRendering(ctx);
			
			// Generate image
			if (!canvasMode)
				$(canvasid).src = c.toDataURL("image/png");
		}
	};
}


