var _cookie = {}

_cookie.set = function (name, value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

_cookie.get = function (name) //取cookies函数
{
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
	{
		var val = unescape(arr[2]);
		if (isNaN(val))
		{
			return val;
		}
		else
		{
			return Number(val);
		}
	}
	else
	{
		return null;
	}
}

_cookie.del = function (name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = _cookie.get(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
