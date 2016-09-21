(function($) {
	/****
	 * 1.常用方法
	 * loading		加载中
	 * hint			提示信息
	 * 
	 * **************************/
  	var PageInfo = {};
  	
  	
  	PageInfo.init = function(option,param){
  		var FunUtil = {};//对内的工具类
	  	var HtmUtil = {};//对内的Html
	  	var PageObj	= {};//对外暴露的方法
	  	
	  	var $dialog =  this,$content;
	  	
	  	
	  	HtmUtil.init =  function(option){
	  		var buf = new StringBuffer();
	  		
	  		buf.append('<div class="plug-dialog">                               ');  
	  	
	  			
	  		if(option.back.show == "true")	{
	  			buf.append('    <div class="plug-dialog-back"></div>                ');
	  		}
	  		
			buf.append('	<div class="plug-dialog-contents "  >                  ');  
			
			if(option.head.show == "true"){
				
				buf.append('		<div class="plug-dialog-head">                  ');   
				buf.append('			<span class="float-left">'+option.head.title+'</span>  ');   
				
				if(option.head.cancle == "true"){
					buf.append('            <span class="float-right plug-dialog-cancle"></span>          ');   
				}
				buf.append('		</div>   ');
			}
			
			buf.append('		<div class="plug-dialog-body" style="background-color:'+option.body.color+'">'+option.body.buf+'</div>     ');
			buf.append('        <div class="plug-dialog-foot"></div>            ');   
			buf.append('    </div>                                              ');   
			buf.append('</div>													');							
			
			return buf.toString();
	  	};
	  	
	  	HtmUtil.string4msg = function(param){
	  		
	  		var buf = new StringBuffer();
	  		
	  		buf.append('<div style="background-color: rgba(0,0, 0, 0.3); color: white; padding: 9px;  border-radius: 3px; text-align: center;">');
	  		buf.append(param);
	  		buf.append("</div>");
	  		
	  		return buf.toString();
	  	};
	  	
	  	
	  	FunUtil.setBaseOption = function(param){
	  		//设置默认样式
	  		var CssUtil 	= {};
	  		
	  		//设置option 基本参数
	  		
	  		var base 		= {};
	  		
	  		base.back		= {show:"true",color:""};
	  		base.head		= {show:"true",color:"",title:"提示信息",cancle:"true"};
	  		base.body		= {color:"#fff",buf:"",fiex:"false",callback:function(){},};//固定是否
	  		base.height		= 100;
	  		base.width		= 100;
	  		base.animate	= ["bounceIn","flipOutY"];
	  		
	  		
	  		
	  		if(String.HasText(param.back)){
	  			
	  			if(String.HasText(param.back.show))  base.back.show		= param.back.show ;
	  			if(String.HasText(param.back.color)) base.back.color	= param.back.color ;;
	  		};
			
			if(String.HasText(param.head)){
	  			if(String.HasText(param.head.show))	 base.head.show		= param.head.show ;
	  			if(String.HasText(param.head.color)) base.head.color	= param.head.color ;
	  			if(String.HasText(param.head.title)) base.head.title	= param.head.title ;
	  			if(String.HasText(param.head.cancle))base.head.cancle	= param.head.cancle ;
	  		};
	  		
	  		if(String.HasText(param.body)){
	  			
	  			if(String.HasText(param.body.color))base.body.color		= param.body.color;
	  			if(String.HasText(param.body.buf)) 	base.body.buf		= param.body.buf;
	  			if(String.HasText(param.body.fiex)) base.body.fiex		= param.body.fiex;
	  			
	  			if($.isFunction(param.body.callback))base.body.callback	= param.body.callback;
	  		};
	  		
	  		if(String.HasText(param.height)) 		base.height			= param.height;
	  		if(String.HasText(param.width)) 		base.width			= param.width;
	  		
	  		if(String.HasText(param.animate)){
	  			
	  			if(param.animate.length == 1) 		base.animate[0]		= param.animate[0];
	  			if(param.animate.length == 2) 		base.animate		= param.animate;
	  		};
	  		
	  		return base;
	  	};
	  	
	  	FunUtil.common4hide = function(){
	  		
	  		$dialog.html("");
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
		 		},2000);
	 		}); 
	 		
	  		try{ option.body.callback(); }catch(e){ }
	  	};
	  	
	  	PageObj.loading = function(){
	  		
	  		var option 		= {};
	  		
	  		option.back		= {"show":"false"};		
	  		option.head		= {"show":"false"};		
	  		option.height	= "100";
	  		option.width	= "100";
	  		option.body 	= {"buf":'<img src="img/loading.gif" />'};
	  		option.animate	= ["bounceIn","flipOutY"];
	  		
	  		option = FunUtil.setBaseOption(option);
	  		
	  		PageObj.init(option);
	  	};
	  	
	  	PageObj.hide = function(){
	  		
	  		FunUtil.common4hide();
	  	};
	  	
	  	PageObj.msg = function(param){
	  		
	  		var isfiex	= "false";	
	  		var buf		= "",callback;
	  		
	  		//是否固定
	  		if(typeof(param) == "object") {
	  			isfiex	= param.fiexd;
	  			buf		= param.buf;
	  			callback= param.callback;
	  		}else{
	  			buf = param;
	  		}
	  		
	  		var option 		= {};
	  		
	  		option.back		= {"show":"false"};		
	  		option.head		= {"show":"false"};		
	  		option.height	= "500";
	  		option.width	= "150";
	  		option.body 	= {"buf":HtmUtil.string4msg(buf),"fiex":isfiex,"callback":callback}
	  		option.animate	= ["flipInx","flipOutY"];
	  		
	  		option = FunUtil.setBaseOption(option);
	  		
	  		PageObj.init(option);
	  		
	  		if(isfiex == "false"){
	  			setTimeout(function(){
		  			$content.addClass("animated "+option.animate[1]);
			 		setTimeout(function(){ $dialog.html(""); },1000);
		  		},3000); 
	  		}
	  		
	  	}
	  	
	  	
	 	PageObj.pub 	= function(option,param){
	 	 	
			if(typeof(option) == "string"){
		  		 
		  		PageObj[option](param);
		  	}else{
		  		
				option = FunUtil.setBaseOption(option);
			   	PageObj.init(option);
		  	}
		};
		
		PageObj.pub(option,param);
  	};
	
	$.fn.xdndialog = function(option,param) {
	  	
	  	PageInfo.init.call(this,option,param);
 	};
})(jQuery);

