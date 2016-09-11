  	
  	function StringBuffer() {
		this.content = new Array;
	};
	StringBuffer.prototype.append = function(str) {
		this.content.push(str);
	};
	StringBuffer.prototype.prepend = function(str) {
		this.content.unshift(str);
	};
	StringBuffer.prototype.toString = function() {
		return this.content.join("");
	};	
	

   String.HasText  = function(str){
   	if (typeof(str) == "undefined") return false;
	if (str == null) return false;
	if (str == 'null') return false;
	if (str == 'undefined') return false;
	
	if (typeof(str) == 'string')
		str = str.replace(/(^\s*)|(\s*$)/g, '');
	if (str === '') return false;
	return true;
   	
   };
   
   /*gloab 方法 */
  
  function common4Global(fun) {
        var a = [];
        for (var b in fun) a.push("var " + b + "=FunUtil.Global()." + b + ";");
        return a.join("")
   }
