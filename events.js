
// Add new events here. Can also remove old ones for efficiency.
// Three elements per entry:
// - Start date+time in an exact format and time zone offset (from UTC)
// - Duration in minutes
// - Optional description

// Lobby events
var lobbySchedule = [
	[new Date('2018-07-29T22:45+02:00'),  60, "Champions of the Era Warmup"],
	[new Date('2018-07-30T22:45+02:00'),  60, "Mega League Monday Warmup"],
	[new Date('2018-08-02T00:00+02:00'), 120, "Wildcard Wednesday"],
	[new Date('2018-08-02T20:00+02:00'), 120, "Thumpin' Thursday"],
];

// Clash events
var clashSchedule = [
	[new Date('2018-07-28T22:30+02:00'), 120, "Casual Clash 3"],
];


function eventOngoingNow()
{
	var now = new Date();
	for (i = 0; i < lobbySchedule.length; ++i)
	{
		start = lobbySchedule[i][0];
		end = new Date();
		end.setTime(start.getTime() + lobbySchedule[i][1] * 60000);
		
		if (now > start && now < end)
			return ["lobby"];
	}
	for (i = 0; i < clashSchedule.length; ++i)
	{
		start = clashSchedule[i][0];
		end = new Date();
		end.setTime(start.getTime() + clashSchedule[i][1] * 60000);
		
		if (now > start && now < end)
			return ["clash"];
	}
	return ["none"];
}