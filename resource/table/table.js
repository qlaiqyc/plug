(function($) {
	
	/****** 全局变量***********/
  	var $table;
  	
	
  	var PageInfo = {};
  	
  	
  	PageInfo.init = function(option){
  		var FunUtil = {};//对内的工具类
	  	var HtmUtil = {};//对内的Html
	  	var PageObj	= {};//对外暴露的方法
	  	
	  	/*************HtmUtil 工具类************************** */
	  	
	  	HtmUtil.addTrs = function(option){
	  		var data 	= option.param.data;
	  		var columns = option.columns;
	  		var len4data= data.length;
	 		var len4col = columns.length;
	 		var buf  	= new StringBuffer();
	  		
	  		var id4index= FunUtil.indexNum(option.param.id); 
	  		
	  		if(len4data === 0) return;
	 		
		 	for(var i =0 ;i<len4data;i++){
		 		
		 		var obj = data[i];
		 		
		 		buf.append('<tr  data-index="'+id4index+'">');  //主要是针对，delete  update  append prepend
		 		id4index  = FunUtil.indexNum(id4index);
		 		
		 		for(var j=0;j<len4col;j++){
					
					var value = "";
					
					try{ String.hasText(obj[columns[j].filed]) ? value = obj[columns[j].filed] : value = ""; }catch(e){ };
					
					try{ value = columns[j].formatter(obj,value); }catch(e){};
					
		 			buf.append('<td>'+value+'</td>')
		 		}
		 		
		 		buf.append('</tr>');
		 	}
	  		
	  		
	  		return buf.toString();
	  	};
	  	
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
	  	
	  	//判断index 值
	  	
	  	FunUtil.indexNum	= function(index){
	  		var  list  = (index+"").split("-");
	  		var  value = list[list.length-1];
	  		
	  		if(value == 9) {
	  				list.push("1")
		  		}else{
		  			
		  			list[list.length-1] = (parseInt(value)+1);
		  	};
	  		
	  		return list.join("-");
	  	}
	  	
	  	//更新数据缓存
	  	FunUtil.cache4update = function(option){
	  		
	  		$table.data("qltable-option",option);
	  	};
	  	
	  	/*************PageObj操作类************************************/
	  	
	  	PageObj.load 	= function(option){
	  		var data 	= option.param;
	  		var columns = option.columns;
	  		var len4data= data.length;
	 		var len4col = columns.length;
	 		var buf  	= new StringBuffer();
	  		
	  		if(len4data === 0) return;
	 		
		 	for(var i =0 ;i<len4data;i++){
		 		
		 		var obj = data[i];
		 		
		 		buf.append('<tr  data-index="'+i+'">');  //主要是针对，delete  update  append prepend
		 		
		 		for(var j=0;j<len4col;j++){
					
					var value = "";
					
					try{ String.hasText(obj[columns[j].filed]) ? value = obj[columns[j].filed] : value = ""; }catch(e){ };
					
					try{ value = columns[j].formatter(obj,value); }catch(e){};
					
		 			buf.append('<td>'+value+'</td>')
		 		}
		 		
		 		buf.append('</tr>');
		 	}
		 		
	  		$table.find("tbody").html(buf.toString());
	  		
	  		FunUtil.cache4update(option)
	  	};
	  	
	  	
	  	/****
	  	 * param = {id:data-index,data:obj}
	  	 * 默认在最后  id=-1
	  	 * ********************/
	  	PageObj.append  = function(option){
	  		var param = option.param;
			
			var $this = $table.find("tr[data-index='"+param.id+"']");
	  		
	  		$this.after(HtmUtil.addTrs(option));
	  	};
	  	
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
	 		option.param = option.data;
	 		PageObj.load(option);
	  	};
	   
		PageObj.pub 	= function(option){
			
			if(!String.hasText(option.columns)){
		  		
		  		var method,data;
		  		
		  		for(var p in option){ method = p; data   = option[p];  }
		  		 
		  		option = $table.data("qltable-option") ;
		  		option.param = data;//公共参数
		  		
		  		FunUtil.setBaseOption(option);
		  		
		  		PageObj[method](option);
		  	}else{
		  		
		  		FunUtil.setBaseOption(option);
			   	
			   	FunUtil.cache4update(option);
			   	
			   	PageObj.init(option);
		  	}
			
		};
		PageObj.pub(option);
  	};
	
	$.fn.qltable = function(option) {
  	
  		$table 		= this;
	  	
	  	PageInfo.init(option);
 	};
})(jQuery);