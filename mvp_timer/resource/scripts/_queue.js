var _queue = {};

_queue.init = function ()
{
	$('#queue .wrap').mousewheel(function (e, delta)
	{
		this.scrollLeft -= (delta * 60);
		e.preventDefault();
	}
	);
}
_queue.update = function (mqueue)
{
	mQ = [];
	for (var i = 0; i < mqueue.length; i++)
	{
		mQ.push(mqueue[i].name);
	}
	if (JSON.stringify(queue) != JSON.stringify(mQ))
	{
		var $wrapper = $('#queue .wrap');
		$wrapper
		.find('.mon').sort(function (a, b)
		{
			return $(a).attr('data-count') - $(b).attr('data-count');
		}
		)
		.appendTo($wrapper);

		queue = mQ;
	}
	var fix = -$('#queue .wrap').outerHeight();
	if ($('body').hasClass('ckb_queue') && !$('body').hasClass('queue_hide'))
		fix = 0;
	$("#queue").css("bottom", fix);
}
