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

function generateBanner(width, height, params)
{
	var monthNames = [
		"Jan.", "Feb.", "March",
		"April", "May", "June", "July",
		"August", "Sept.", "Oct.",
		"Nov.", "Dec." ];
		
		
	var dayNames = [
		"Monday", "Tuesday", "Wednesday",
		"Thursday", "Friday", "Saturday", "Sunday"];
	
	
	var dateText = dayNames[params.weekdayIndex] + " " + monthNames[params.monthIndex] + ' ' + params.day;
	var timeText = params.startTime + " to " + params.endTime + " " + params.timeZone;
	
	// Style presets
	titleColor = "yellow";
	timeDateColor = "white";
	hostsColor = "white";
	tierColor = "black";
	
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
	ctx = c.getContext("2d");
	
	
	var imgs = document.getElementById("template");
	if (params.mlmMode) imgs = document.getElementById("template-mlm");
	
	ctx.drawImage(imgs, 0, 0);
	
	if (!params.mlmMode)
	{
		// Lobby title
		ctx.font = titleFont;
		ctx.textAlign = "center";
		ctx.fillStyle = titleColor;
		ctx.fillText(params.titleText, 280, 152);
	
		// Subtitles
		ctx.fillText("Lobby Hosts", 290, 302);
		
		if (params.drawCodes)
			ctx.fillText("Lobby Code", 720, 302);
	}
	
	vOffset = 0; if (params.mlmMode) vOffset += 10;
	hOffset = 0; if (params.mlmMode) hOffset += 130;
	
	// Time and date
	ctx.font = timeDateFont;
	ctx.fillStyle = timeDateColor;
	ctx.textAlign = "center";
	ctx.fillText(dateText, 300, 210 + vOffset);
	ctx.fillText(timeText, 300 + hOffset, 250 + vOffset);
	
	// Hosts
	spacing = 35 + (3 - params.hosts.length) * 10;
	for (i = 0; i < params.hosts.length; i++)
	{
		vOffset = 348 + (3 - params.hosts.length)*15 + spacing * i; if (params.mlmMode) { vOffset += 10; };
		hOffset = 150; if (params.mlmMode) { hOffset += 130; };
		
		if (params.hosts[i][3])
		{
			ctx.font = teamTagFont;
			ctx.fillStyle = hostsColor;
			ctx.textAlign = "left";
			ctx.fillText("CC", hOffset, vOffset);
			hOffset += 40;
		}
		
		ctx.font = hostsFont;
		ctx.fillStyle = hostsColor;
		ctx.textAlign = "left";
		ctx.fillText(params.hosts[i][0] + "  " + params.hosts[i][1], hOffset, vOffset);
		
		if (params.drawTiers)
		{
			ctx.fillStyle = colors[params.hosts[i][2]];
			roundRect(ctx, 15, vOffset - 21, 120, 25, 10).fill();
			
			ctx.fillStyle = tierColor;
			ctx.font = tierFont;
			ctx.textAlign = "center";
			ctx.fillText(tiers[params.hosts[i][2]], 75, vOffset - 1);
		}
		
		if (params.drawCodes)
		{
			ctx.fillStyle = colors[params.hosts[i][2]];
			roundRect(ctx, 790, vOffset - 21, 75, 25, 10).fill();
			
			ctx.fillStyle = tierColor;
			ctx.font = tierFont;
			ctx.textAlign = "center";
			ctx.fillText(""+(params.hosts[i][2]+1)+" " + (params.hosts[i][2]+1)+" " +(params.hosts[i][2]+1), 827, vOffset - 1);
		}
	}
	
	// Generate image
	return c.toDataURL("image/png");
}
