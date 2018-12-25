var _view = {};

_view.init = function ()
{
	$("#setting").click(function ()
	{
		$("#help").toggleClass("on");
	}
	);
	$("#queue h4").click(function ()
	{
		$("body").toggleClass("queue_hide");
	}
	);
	_view.sizeChg();
}
_view.sizeChg = function ()
{
	if ($(window).width() < 300)
	{
		$(".mon").width(80);
		$(".mon img").width(80);
		$(".mon .time").width(74);
		$("#cus_time").text("長按");
	}
	else if ($(window).width() < 350)
	{
		$(".mon").width(($(window).width() - 20) / 3 - 10);
		$(".mon img").width("100%");
		$(".mon .time").width($(".mon").width() - 6);
		$("#cus_time").text("長按");
	}
	else if ($(window).width() < 500)
	{
		$(".mon").width(($(window).width() - 20) / 4 - 10);
		$(".mon img").width("100%");
		$(".mon .time").width($(".mon").width() - 6);
		$("#cus_time").text("長按");
	}
	else
	{
		$(".mon").width(80);
		$(".mon img").width(80);
		$(".mon .time").width(74);
		$("#cus_time").text("右鍵");
	}

	$(".time_wrap").height($(".mon").width());
}
