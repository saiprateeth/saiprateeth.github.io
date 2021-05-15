document.addEventListener('click',function(){});var obj_registry=new Array();function register_object(obj){obj.private_obj_params=new Array(0);obj_registry[obj_registry.length]=obj;obj.private_obj_params["registry_id"]=obj_registry.length-1;obj.get=stdobj_get;obj.set=stdobj_set;}
function stdobj_get(param){if(typeof(this.private_obj_params[param])!="undefined")
return this.private_obj_params[param]
else
return undefined;}
function stdobj_set(param,val){this.private_obj_params[param]=val}
function StopWatch(){register_object(this);this.reset();}
function StopWatch_start(){if(!this.get("clock_running")){this.set("start_time",new Date());this.set("clock_running",true);}}
StopWatch.prototype.start=StopWatch_start;function StopWatch_stop(){if(this.get("clock_running")){this.set("stored_elapsed",this.elapsed());this.set("clock_running",false);}}
StopWatch.prototype.stop=StopWatch_stop;function StopWatch_reset(){if(!this.get("clock_running")){this.set("stored_elapsed",0);this.set("start_time",0);}}
StopWatch.prototype.reset=StopWatch_reset;function StopWatch_elapsed(){if(this.get("clock_running"))
return(new Date()-this.get("start_time"))+this.get("stored_elapsed");else
return this.get("stored_elapsed");}
StopWatch.prototype.elapsed=StopWatch_elapsed;function StopWatch_running(){return this.get("clock_running");}
StopWatch.prototype.running=StopWatch_running;function StopWatch_start_time(){return this.get("start_time");}
StopWatch.prototype.start_time=StopWatch_start_time;function ParamString(str){str=str.slice(1);if(str){str=new String(str);var params=str.split("&");for(var i in params){if(params[i]){var pair=params[i].split("=");if(pair[0]){if(new String(pair[0]).substr(pair[0].length-2)=="[]"){var fieldname=new String(pair[0]).substr(0,pair[0].length-2);if(typeof(this[fieldname])=="undefined"){eval("this."+fieldname+" = new Array();");}
eval("this."+fieldname+"[this."+fieldname+".length] = \""+unescape(pair[1])+"\";");}
else{eval("this."+unescape(pair[0])+" = \""+unescape(pair[1])+"\";");}}}}}}
ParamString.prototype.toString=ParamString_toString
ParamString.prototype.list=ParamString_list
function ParamString_list(){var arr=new Array();for(var i in this){if(typeof(this[i])!="function"){if(typeof(this[i])!="object"&&typeof(this[i])!="array"){arr[arr.length]=i
arr[i]=this[i]}
else{arr[arr.length]=i
arr[i]=new Array();for(var j in this[i]){if(typeof(this[i][j])!="function"){arr[i][arr[i].length]=j
arr[i][j]=this[i][j]}}}}}
return arr;}
function ParamString_toString(){var separator="?";var out="";for(var i in this){if(typeof(this[i])!="function"){out+=separator+to_querystring(this[i],i);separator="&";}}
return out;}
function to_querystring(obj,name){var out="";if(typeof(obj)!="object"&&typeof(obj)!="array"){out+=name+"="+escape(obj);}
else{var separator="";for(var i in obj){out+=separator+to_querystring(obj[i],name+"["+i+"]");separator="&";}}
return out;}
var acceptsCookies=false;if(document.cookie==''){document.cookie='acceptsCookies=yes';if(document.cookie.indexOf('acceptsCookies=yes')!=-1){acceptsCookies=true;}}else{acceptsCookies=true;}
function setCookie(name,value,hours,path,domain,secure){if(acceptsCookies){var not_NN2=(navigator&&navigator.appName&&(navigator.appName=='Netscape')&&navigator.appVersion&&(parseInt(navigator.appVersion)==2))?false:true;if(hours&&not_NN2){if((typeof(hours)=='string')&&Date.parse(hours)){var numHours=hours;}else if(typeof(hours)=='number'){var numHours=(new Date((new Date()).getTime()+hours*3600000)).toGMTString();}}
document.cookie=name+'='+escape(value)+((numHours)?(';expires='+numHours):'')+((path)?';path='+path:'')+((domain)?';domain='+domain:'')+((secure&&(secure==true))?'; secure':'');}}
function readCookie(name){if(document.cookie==''){return false;}else{var firstChar,lastChar;var theBigCookie=document.cookie;firstChar=theBigCookie.indexOf(name);var NN2Hack=firstChar+name.length;if((firstChar!=-1)&&(theBigCookie.charAt(NN2Hack)=='=')){firstChar+=name.length+1;lastChar=theBigCookie.indexOf(';',firstChar);if(lastChar==-1)lastChar=theBigCookie.length;return unescape(theBigCookie.substring(firstChar,lastChar));}else{return false;}}}
function killCookie(name,path,domain){var theValue=readCookie(name);if(theValue){document.cookie=name+'='+theValue+'; expires=Fri, 13-Apr-1970 00:00:00 GMT'+((path)?';path='+path:'')+((domain)?';domain='+domain:'');}}
var next_ajax_obj_index=0;var ajax_obj_registry=new Array();function getAJAXObject(){var xmlhttp;if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){try{xmlhttp=new XMLHttpRequest();}catch(e){xmlhttp=false;}}
return xmlhttp;}
function new_ajax_obj(){var ajax_obj_index=next_ajax_obj_index++;var ajax_obj=getAJAXObject();ajax_obj_registry[ajax_obj_index]={'callback':null,'ajax_obj':ajax_obj}
eval('ajax_handler_router_'+ajax_obj_index+' = function() { ajax_global_response_handler('+ajax_obj_index+') }');return ajax_obj_index;}
function ajax_send_old(url,callback){callback=typeof(callback)=='undefined'?null:callback;var ajax_obj_index=new_ajax_obj();var ajax_obj=ajax_obj_registry[ajax_obj_index]['ajax_obj'];if(ajax_obj){if(callback&&callback!='return'){ajax_obj_registry[ajax_obj_index]['callback']=callback;eval('ajax_obj.onreadystatechange = ajax_handler_router_'+ajax_obj_index+';');}
if(url.charAt(0)=='?'){url=url.slice(1);}
ajax_obj.open('POST','?',callback!='return');ajax_obj.setRequestHeader('Content-type','application/x-www-form-urlencoded');ajax_obj.setRequestHeader('Content-length',url.length);ajax_obj.setRequestHeader('Connection','close');ajax_obj.send(url);if(callback=='return'){return ajax_obj.responseText;}}}
function ajax_global_response_handler(ajax_obj_index){var ajax_obj=ajax_obj_registry[ajax_obj_index]['ajax_obj'];if(ajax_obj.readyState==4){var callback=ajax_obj_registry[ajax_obj_index]['callback'];if(typeof(eval(callback))=='function'){eval(callback+'(ajax_obj.responseText);');}}}
function ajax_get_url(){var ajax_params=new ParamString('?');ajax_params.ajax=arguments[0];ajax_params.ajax_args=new Array();for(var i=1;i<arguments.length;i++){ajax_params.ajax_args[i-1]=arguments[i];}
return ajax_params.toString();}
function ajax_parse_response(response){var first_char,last_char;var returnval=new Array();first_char=0;last_char=response.indexOf('\n',first_char);returnval['status']=response.substring(first_char,last_char);first_char=last_char+1;last_char=response.indexOf('\n',first_char);returnval['message']=response.substring(first_char,last_char);first_char=last_char+1;returnval['content']=response.substring(first_char);return returnval;}
function ajax_call(){var parameter_list='';for(var i=2;i<arguments.length;i++){parameter_list+=', arguments['+i+']';}
eval('var data = ajax_get_url(arguments[0]'+parameter_list+');');var response=ajax_send(location.pathname,'POST',data,arguments[1]);if(response){var response=ajax_parse_response(response);eval('var response = '+response['content']+';');}
return response;}
function ajax_send(url,method,data,callback){}