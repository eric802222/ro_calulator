var _view = {};

_view.init = function ()
{
	$("#setting").click(function ()
	{
		$("#help").toggleClass("on");
		$("body").toggleClass("setting");
	}
	);
	$("#queue h4").click(function ()
	{
		$("body").toggleClass("queue_hide");
	}
	);
	$("#hide-all").click(function ()
	{
		if(!$(this).hasClass('off')){
			$(this).addClass('off').attr('src','img/toggle_off.png');
			$(".control-hide span").text("隱藏全部");
			$(".mon").addClass("hide");
			_mon.saveHide('all',true);
		}else{
			$(this).removeClass('off').attr('src','img/toggle_on.png');
			$(".control-hide span").text("顯示全部");
			$(".mon").removeClass("hide");
			_mon.saveHide('all',false);
		}
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
