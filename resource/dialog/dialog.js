(function($) {
	/****
	 * 1.常用方法
	 * **************************/
  	var PageInfo = {};
  	
  	
  	PageInfo.init = function(option,param){
  		var FunUtil = {};//对内的工具类
	  	var HtmUtil = {};//对内的Html
	  	var PageObj	= {};//对外暴露的方法
	  	
	  	var $dialog =  this,$content;
	  	
	  	
	  	HtmUtil.init =  function(option){
	  		var buf = new StringBuffer();
	  		var isShowHead = (String.HasText(option.headshow) && option.headshow == "false");
	  		
	  		buf.append('<div class="plug-dialog">                               ');  
	  		
	  		buf.append('    <div class="plug-dialog-back"></div>                '); 
	  		
			buf.append('	<div class="plug-dialog-contents "  >                  ');  
			
			if(!isShowHead){
				
				buf.append('		<div class="plug-dialog-head">                  ');   
				buf.append('			<span class="float-left">'+option.title+'</span>  ');   
				buf.append('            <span class="float-right plug-dialog-cancle"></span>          ');   
				buf.append('		</div>   ');
			}
			
			buf.append('		<div class="plug-dialog-body">'+option.body+'</div>     ');
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
	  	
	  	//
	  	
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
		 		},4000);
	 		});
	 		
	  		
	  	};
	  	
	  	PageObj.loading = function(){
	  		var param = {};
	  		
	  		param.headshow	= "false";		
	  		param.height	= "100";
	  		param.width		= "100";
	  		param.body 		= '<img src="img/loading.gif" />';
	  		param.cancle	= "false";
	  		param.animate	= ["bounceInDown","flipOutY"];
	  		PageObj.init(param);
	  		
	  	}	
	  	
	  	PageObj.hint = function(option){
	  		var param = {};
	  		
	  		param.headshow	= "false";		
	  		param.height	= "100";
	  		param.width		= "150";
	  		param.body 		= '<div style="background-color: rgba(0,0, 0, 0.3); color: white; padding: 9px;  border-radius: 3px; text-align: center;">'+option+'</div>';
	  		param.cancle	= "false";
	  		param.animate	= ["bounceInDown","flipOutY"];
	  		PageObj.init(param);
	  		
	  		setTimeout(function(){
	  			$content.find("span.plug-dialog-cancle").trigger("click");
	  		},4000);
	  	}
	  	
	  	
	 	PageObj.pub 	= function(option,param){
	 	 	
	 	 	/****
	 	 	 * String  默认常见弹出框
	 	 	 * Option  定制特殊弹出框 
	 	 	 * *********/
			
			if(typeof(option) == "string"){
		  		 
		  		PageObj[option](param);
		  	}else{
		  		
			   	PageObj.init(option);
		  	}
		};
		
		PageObj.pub(option,param);
  	};
	
	$.fn.xdndialog = function(option,param) {
	  	
	  	PageInfo.init.call(this,option,param);
 	};
})(jQuery);

