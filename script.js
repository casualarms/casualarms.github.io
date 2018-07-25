function getTimeZoneDiff()
{
	var now = new Date();
	return -now.getTimezoneOffset() / 60;
}

function convertDates(dates, diff)
{
	for (i = 0; i < dates.length; i++)
	{
		dates[i].setHours(dates[i].getHours() + diff);
	}
}

function formatDate(date, diff, ID)
{
	h = date.getHours();
	m = date.getMinutes();
	postfix = "";
	
	if (-7 <= diff && diff <= -4)
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
	
	if (h < 10)
	{
		h = "0" + h;
	}
	if (m < 10)
	{
		m = "0" + m;
	}
	document.getElementById(ID).innerHTML = h + ":" + m + postfix;
}