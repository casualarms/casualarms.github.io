
// Add new events here. Can also remove old ones for efficiency.
// Three elements per entry:
// - Start date+time in an exact format and time zone offset (from UTC)
// - Duration in minutes
// - Optional description
var eventschedule = [
	[new Date('2018-07-28T22:30+02:00'), 120, "Casual Clash 3"],
	[new Date('2018-07-29T22:45+02:00'),  60, "Champions of the Era Warmup"],
	[new Date('2018-07-30T22:45+02:00'),  60, "Mega League Monday Warmup"],
	[new Date('2018-08-02T00:00+02:00'), 120, "Wildcard Wednesday"],
	[new Date('2018-08-02T20:00+02:00'), 120, "Thumpin' Thursday"],
];


function eventIsOngoingNow()
{
	var now = new Date();
	for (i = 0; i < eventschedule.length; ++i)
	{
		start = eventschedule[i][0];
		end = new Date();
		end.setTime(start.getTime() + eventschedule[i][1] * 60000);
		
		if (now > start && now < end)
			return true;
	}
	return false;
}