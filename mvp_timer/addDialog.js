if(typeof($add)=="undefined")var $add={version:{},auto:{disabled:false}};(function($){
  $.fn.hasAttr=function(a){var b=$(this).attr(a);return void 0!==typeof b&&b!==!1},$.fn.getFormData=function(){var a={};return $(this).find("input, select, textarea").each(function(b,c){var d=$(c);d.hasAttr("name")&&(d.attr("type")&&d.hasAttr("type")&&"checkbox"==d.attr("type").toLowerCase()?d.is(":checked")?a[d.attr("name")]=!0:a[d.attr("name")]=!1:d.attr("type")&&d.hasAttr("type")&&"radio"==d.attr("type").toLowerCase()?d.is(":checked")?a[d.attr("name")]=d.val():void 0==a[d.attr("name")]&&(a[d.attr("name")]=null):a[d.attr("name")]=d.val())}),a};

  $add.version.Dialog = "3.1.2";
  $add.Dialog = function(contents, settings){
    var $overlay = $("#addui-dialog-overlay");
    if($overlay.length){
      var guid = $overlay.attr("guid");
      Obj.directory[guid].close();
      $overlay.remove();
      delete $overlay;
    }
    var o = new $add.Dialog.obj(contents, settings);
    o.render("body");
    o._elements.hide().fadeIn();
    o._elements.find(".addui-dialog").hide().fadeIn();
    return o;
  };
  $add.Dialog.obj = Obj.create(function(contents, settings){
    var self = this;

    this.defSettings({
      title: null,
      width: 280,
      height: 392,
      falseBtnText: null,
      falseBtnAction: function(){},
      trueBtnText: "Ok",
      trueBtnAction: function(){},
      class: "",
      enterEsc: false,
    });
    this.defMember("contents", "");
    this.defMethod("close", function(){
      var data = {};
      var dataArray = this._elements.find(".addui-dialog").serializeArray();
      for(var i=0; i<dataArray.length; i++){
        data[dataArray[i].name] = dataArray[i].value;
      }
      if(this._settings.falseBtnAction.call(this, data) !== false){
        var self = this;
        this._elements.fadeOut(function(){
          self.destroy();
        });
      }
    });
    this.defMethod("submit", function(){
      var data = this._elements.find(".addui-dialog").getFormData();
      if(this._settings.trueBtnAction.call(this, data) !== false){
        var self = this;
        this._elements.find(".addui-dialog").fadeOut(function(){
          self.destroy();
        });
      }
    });

    this.__enterEscListener = function(e){
      if(e.keyCode == 13){
        self.submit();
      } else if(e.keyCode == 27){
        self.close();
      }
    };

    this.renderer = function(){
      var self = this;
      var $overlay = $("<div id='addui-dialog-overlay'></div>");
      var $dialog = $("<form class='addui-dialog'></form>").on("submit", function(e){
        self.submit();
        e.preventDefault();
        return false;
      }).addClass(this._settings.class).appendTo($overlay);

      if(this._settings.title){
        var $title = $("<div class='addui-dialog-title'>"+this._settings.title+"</div>").appendTo($dialog);
      }

      var $contents = $("<div class='addui-dialog-contents'></div>").appendTo($dialog);
      $contents.append(this._contents);

      if(this._settings.falseBtnText || this._settings.trueBtnText){
        var $controls = $("<div class='addui-dialog-controls'></div>").appendTo($dialog);
        if(this._settings.falseBtnText){
          $("<button type='button' class='addui-dialog-falseBtn'>"+this._settings.falseBtnText+"</button>").on("click", function(){
            self.close();
          }).appendTo($controls);
        }
        if(this._settings.trueBtnText){
          $("<button type='submit' class='addui-dialog-trueBtn'>"+this._settings.trueBtnText+"</button>").appendTo($controls);
        }
      }

      $dialog.width(this._settings.width).height(this._settings.height);

      if(this._settings.enterEsc){
        $(window).on("keyup", this.__enterEscListener);
      }

      return $overlay;
    };
    this.destroyer = function(){
      $(window).off("keyup", this.__enterEscListener);
    };
    this.init = function(contents, settings){
      if(settings)
        this.settings = settings;
      if(contents)
        this.contents = contents;
    };
    this.init.apply(this, arguments);
  });
  $add.Dialog.error = function(contents, settings){
    return $add.Dialog(contents, $.extend({
      class: "error",
      title: "Error",
      width: 336,
      height: 336,
      falseBtnText: null
    }, settings));
  };
  $add.Dialog.warning = function(contents, settings){
    return $add.Dialog(contents, $.extend({
      class: "warning",
      title: "Warning",
      width: 336,
      height: 336,
      falseBtnText: null
    }, settings));
  };
  $add.Dialog.accent = function(contents, settings){
    return $add.Dialog(contents, $.extend({
      class: "accent"
    }, settings));
  };
  $add.Dialog.success = function(contents, settings){
    return $add.Dialog(contents, $.extend({
      class: "success",
      title: "Success",
      width: 336,
      height: 336,
      falseBtnText: null
    }, settings));
  };
  $add.Dialog.alert = function(contents, settings){
    return $add.Dialog(contents, $.extend({
      width: 336,
      height: 224,
      falseBtnText: null
    }, settings));
  };
  $add.Dialog.prompt = function(question, callback, settings){
    var S = $.extend({
      title: question,
      width: 336,
      height: 224,
      falseBtnText: null,
      trueBtnText: "Submit",
      trueBtnAction: function(data){
        if(callback)
          callback(data.answer);
      },
      placeholder: ""
    }, settings);
    return $add.Dialog("<input name='answer' placeholder='"+S.placeholder+"' />", S);
  };
  $add.Dialog.confirm = function(confirmText, callback, yesText, noText, settings){
    return $add.Dialog("<p>"+confirmText+"</p>", $.extend({
      width: 336,
      height: 168,
      falseBtnText: (noText || "No"),
      trueBtnText: (yesText || "Yes"),
      falseBtnAction: function(){
        if(callback)
          callback(false)
      },
      trueBtnAction: function(){
        if(callback)
          callback(true);
      }
    }, settings));
  };
  $add.auto.Dialog = function(){
    $("[data-addui=dialog]").each(function(i, el){
      var $el = $(el);
      var contents = $el.html();
      var settings = $el.data();
      $add.Dialog(contents, settings);
      $el.remove();
    });
  };
})(jQuery);
$(function(){for(var k in $add.auto){if(typeof($add.auto[k])=="function"){$add.auto[k]();}}});