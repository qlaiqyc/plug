(function($) {
	
  	var FunUtil = {};//对内的工具类
  	var HtmUtil = {};//对内的Html
  	var PageObj	= {};//对外暴露的方法
  	
  	/****** 全局变量***********/
  	var $table;
  	
  	
  	/*************FunUtil 工具类************************** */
  	
  	FunUtil.Glob = function(){
  		
  	};
	
	 
	
	FunUtil.setBaseOption	= function(option){
  		
  			/*self.data	= option.data;
		    self.colors	= option.colors;
		    self.columns= option.columns;*/
  	};
  	
  	FunUtil.isFunction 		= function(option) {
  		var fn = {};
  		var method,data;
  		
  		try{
  			for(var p in option){ method = p; data   = option[p]; return; }
  			
  			if(String.hasText(method)) fn = methods[method]();
  		}catch(e){
  			//TODO handle the exception
  		}
  		
    	return (!!fn&&!fn.nodename&&fn.constructor!=String&&fn.constructor!=RegExp&&fn.constructor!=Array&&/function/i.test(fn+""));
	}
  	
  	
  	/*************PageObj操作类************************************/
  	
  	PageObj.load 	= function(option){
  		var data 	= option.data;
  		var columns = option.columns;
  		var len4data= data.length;
 		var len4col = columns.length;
 		var buf  	= new StringBuffer();
  		
  		if(len4data === 0) return;
 		
	 	for(var i =0 ;i<len4data;i++){
	 		
	 		var obj = data[i];
	 		
	 		buf.append('<tr>');
	 		
	 		for(var j=0;j<len4col;j++){
				
				var value = "";
				
				/*******
				 * 两种情况
				 * 1.初始化进来的情况 
				 * 2.方法进来情况        
				 * *******/
				try{ String.hasText(obj[columns[j].filed]) ? value = obj[columns[j].filed] : value = ""; }catch(e){ };
				
				try{ value = columns[j].formatter(obj,value); }catch(e){};
				
	 			buf.append('<td>'+value+'</td>')
	 		}
	 		
	 		buf.append('</tr>');
	 	}
	 		
  		$table.find("tbody").html(buf.toString());
  	};
  
  	PageObj.append  = function(){};
  	
  	PageObj.prepend = function(){};
  	
  	PageObj.delect	= function(){};
  	PageObj.update	= function(){};
  	
  	PageObj.init 	= function(option){
  		
  		var data 	= option.data;
 		var columns = option.columns;
 		var len4col = columns.length;
 		var len4data= data.length;
 		
 		//首行
 		var buf  = new StringBuffer();
 		
 		buf.append(" <thead> <tr>");
 		
 		for(var i =0 ;i<len4col;i++){
 			var obj = columns[i];
 			
 			var str = '<th  data-field="'+obj.filed+'">'+obj.title+'</th>';
 			
 			if(String.hasText(obj.formatter)) str = ('<th data-formatter="'+obj.formatter.name+'" data-field="'+obj.filed+'">'+obj.title+'</th>');
 			 
 			buf.append(str);
 		}
 		
 		buf.append(" </tr> </thead>");
 		buf.append(" <tbody> ");
 		buf.append(" </tbody> ");
 		
 		$table.html(buf.toString());
 		PageObj.load(option);
  	};
   
	PageObj.pub 	= function(option){
		
		if(!String.hasText(option.columns)){
	  		
	  		var method,data;
	  		
	  		for(var p in option){ method = p; data   = option[p];  }
	  		 
	  		option = $table.data("qltable-option") ;
	  		option.data = data;
	  		
	  		FunUtil.setBaseOption(option);
	  		
	  		PageObj[method](option);
	  	}else{
	  		
	  		FunUtil.setBaseOption(option);
		   	
		    $table.data("qltable-option",option);
		   	
		   	PageObj.init(option);
	  	}
		
	};
	
	$.fn.qltable = function(option) {
  	
  		$table 		= this;
	  	
	  	PageObj.pub(option);
 	};
})(jQuery);