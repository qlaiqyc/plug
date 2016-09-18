(function($) {
	
  	var PageInfo = {};
  	
  	
  	PageInfo.init = function(option){
  		var FunUtil = {};//对内的工具类
	  	var HtmUtil = {};//对内的Html
	  	var PageObj	= {};//对外暴露的方法
	  	
	  	var $dialog =  this,$content;
	  	
	  	
	  	
	  	
	  	HtmUtil.init =  function(option){
	  		var buf = new StringBuffer();
	  		
	  		buf.append('<div class="plug-dialog">                               ');   
			buf.append('    <div class="plug-dialog-back"></div>                ');   
			buf.append('	<div class="plug-dialog-contents "  >                  ');   
			buf.append('		<div class="plug-dialog-head">                  ');   
			buf.append('			<span class="float-left">'+option.title+'</span>  ');   
			buf.append('            <span class="float-right plug-dialog-cancle"></span>          ');   
			buf.append('		</div>   ');
			buf.append('		<div class="plug-dialog-body"></div>     ');
			
			buf.append('        <div class="plug-dialog-foot"></div>            ');   
			buf.append('    </div>                                              ');   
			buf.append('</div>													');							
			
			return buf.toString();
	  	};
	  	
	  	FunUtil.common4propHeigth = function(option){
	  		var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度
		    _windowHeight = $(window).height(),//获取当前窗口高度
		    _windowWidth = $(window).width(),//获取当前窗口宽度
		    _popupHeight = option.height,//获取弹出层高度
		    _popupWeight = option.width;//获取弹出层宽度
		    _posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
		    _posiLeft = (_windowWidth - _popupWeight)/2;
		    $content.css({"width":option.width+"px","height":option.height+"px","left": _posiLeft + "px","top":_posiTop + "px","display":"block","position": "relative"});//设置position
	  	};
	  	
	  	PageObj.init = function(option){
	  		
	  		$dialog.html(HtmUtil.init(option));
	  		$content = $dialog.find("div.plug-dialog-contents");
	  		FunUtil.common4propHeigth(option);
	  		
	  		//打开动画
	  		$content.addClass("animated "+option.animate[0]);
	 		setTimeout(function(){
	 			$content.removeClass("animated "+option.animate[0]);
	 		},1000);
	 		
	 		//关闭动画
	 		$content.find("span.plug-dialog-cancle").unbind("click").bind("click",function(){
	 			$content.addClass("animated "+option.animate[1]);
		 		setTimeout(function(){
		 			$content.removeClass("animated "+option.animate[1]);
		 			//$dialog.hide();
		 		},4000);
	 		});
	 		
	  		
	  	};
	  	
	  	
	 	 PageObj.pub 	= function(option){
	 	 	
	 	 	/****
	 	 	 * String  默认常见弹出框
	 	 	 * Option  定制特殊弹出框 
	 	 	 * 
	 	 	 * *********/
			
			if(option instanceof String){
		  		 
		  		PageObj[option]();
		  	}else{
		  		
		  		 
			   	PageObj.init(option);
		  	}
		};
		
		PageObj.pub(option);
	  	
		   
		
		PageObj.pub(option);
  	};
	
	$.fn.xdndialog = function(option) {
	  	
	  	PageInfo.init.call(this,option);
 	};
})(jQuery);

