//require https://code.responsivevoice.org/responsivevoice.js

var _tts = {};

_tts.playing = false;

_tts.init = function ()
{
	responsiveVoice.setDefaultVoice("Chinese Female");
}
_tts.speak = function (txt, time)
{
	if (_setting.inited > 0)
	{
		var _txt = txt;
		setTimeout(function ()
		{
			if (!_tts.playing)
			{
				_tts.real_speak(_txt);
			}
			else
			{
				_tts.speak(_txt, 200);
			}
		}, time);
	}
}

_tts.real_speak = function (txt)
{
	_tts.playing = true;
	if ($(window).width() < 768)
	{
		responsiveVoice.speak(txt, 'Chinese Female',
		{
			rate : 1.2,
			volume : 3,
			onend : function ()
			{
				_tts.playing = false
			}
		}
		);
	}
	else
	{
		responsiveVoice.speak(txt, 'Chinese Female',
		{
			rate : 1.35,
			volume : 3,
			onend : function ()
			{
				_tts.playing = false
			}
		}
		);
	}
}
