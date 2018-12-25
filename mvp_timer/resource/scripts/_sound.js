var _sound = {};
_sound.list = ["", "sound/alert.mp3", "sound/alert2.mp3"];
_sound.play = function ()
{
	var source = _sound.list[_setting.alertSound];
	if ($(window).width() < 500)
	{
		//mobile
	}
	else
	{
		if (source)
		{
			var audio = new Audio(source);
			audio.volume = 0.5;
			audio.loop = false;
			audio.play();
		}
	}
}
