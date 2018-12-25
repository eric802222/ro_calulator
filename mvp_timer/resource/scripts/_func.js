function addZero(i)
{
	if (i < 10)
	{
		if (i < 0)
		{
			return addZero(i * -1);
		}
		else
		{
			return "0" + i;
		}
	}
	else
	{
		return i;
	}
}

function parseTime(n)
{
	if (n == "")
		return 0;
	else
		return parseInt(n);
}
