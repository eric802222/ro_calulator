var _notify = {};
_notify.show = function (mons, type)
{
	if (_setting.inited)
	{
		if (('Notification' in window))
		{
			if (Notification.permission == "granted")
			{
				var n = new Notification("[" + mons.name + "] " + type + "!",
					{
						body : "[" + mons.loc + "] " + mons.race + "/" + mons.attr + "/" + mons.size,
						icon : "img/mon/" + mons.img + ".png",
					}
					);
				n.onshow = function ()
				{
					setTimeout(n.close.bind(n), 4000);
				}
			}
			else
			{
				console.log("not approve");
			}
		}
		else
		{
			console.log("not support Notification");
		}
	}
}
