var _setting = {};

_setting.inited = false;
_setting.isShowInfo;
_setting.isShowLoc;
_setting.isShowName;
_setting.isShowNotify;
_setting.isTTS;
_setting.alertSound;
_setting.liveTime;
_setting.warnTime = 5;

_setting.change = function (id, val)
{
	_cookie.del(id);
	_cookie.set(id, (val ? 1 : 0));
	if (val)
	{
		$("body").addClass(id);
		$("#" + id).prop('checked', true);
	}
	else
	{
		$("body").removeClass(id);
		$("#" + id).prop('checked', false);
	}
}
_setting.genCBK = function (store, id, _default, callback)
{
	var mCallback = callback;
	_setting[store] = _cookie.get(id);
	if (_setting[store] == null)
	{
		_setting.change(id, _default);
		_setting[store] = _default;
	}
	else
	{
		_setting.change(id, _setting[store]);
	}
	$("#" + id).change(function ()
	{
		_setting[store] = $(this).is(":checked");
		_setting.change(id, _setting[store]);
		if (mCallback !== undefined)
			mCallback(_setting[store]);
	}
	);
}
_setting.genVAL = function (store, id, _default, callback)
{
	var mCallback = callback;
	_setting[store] = _cookie.get(id);
	if (_setting[store] != null)
	{
		$("#" + id).val(_cookie.get(id));
	}
	else
	{
		_cookie.set(id, _default);
		$("#" + id).val(_default);
	}
	_setting[store] = $("#" + id).val();
	$("#" + id).change(function ()
	{

		_setting[store] = $(this).val();
		_cookie.set(id, _setting[store]);
		if (mCallback !== undefined)
			mCallback(_setting[store]);
	}
	);
}

_setting.init = function ()
{
	_setting.genCBK('isShowInfo', "ckb_info", true);
	_setting.genCBK('isShowLoc', "ckb_loc", true);
	_setting.genCBK('isShowName', "ckb_name", true);
	_setting.genCBK('isShowNotify', "ckb_notify", true);
	_setting.genCBK('isTTS', "ckb_tts", true);

	//_setting.genCBK('isShowQueue',"ckb_queue",true);

	_setting.genVAL('alertSound', 'sel_alert', 1, function (val)
	{
		_sound.play();
		console.log(val);
	}
	);

	//已活時間
	_setting.genVAL('liveTime', 'sel_livetime', 1);
	_setting.genVAL('readyTime', 'sel_readytime', 2);

	//語音文字:
	_setting.genVAL('txtMonShow', 'txt_showing', "走了,[BOSS]已現身");
	_setting.genVAL('txtMonReady', 'txt_coming', "請準備,[BOSS]");

}

_setting.export=function(){
  var fileName = "ooooo.csv";//匯出的檔名
  var data = _setting.get();
  var blob = new Blob([data], {
    type : "application/octet-stream"
  });
  var href = URL.createObjectURL(blob);
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = href;
  link.download = fileName;
  link.click();

}

_setting.get=function(){
  var header = "第一欄,第二欄,第三欄,第四欄,第五欄\n";
  var data = "";
  for (var i = 0; i < 50; i++) {
  	for (var j = 0; j < 5; j++) {
  	  if(j>0){
  	  	data = data + ",";
  	  }
  	  data = data + "Item" + i + "_" + j;
  	}
  	data = data + "\n";
  }
  return header+data;
}

