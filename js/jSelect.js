/**
 * jquery.jSelect.js v1.1
 * Date: 2016-01-07 
 * Author: jinchangjiang <1003219989@qq.com>
 */
(function($){
	$.fn.jSelect=function(options){
		// 默认配置
		options=$.extend({
			"isShowVal":false
		},options);
		var _this=$(this),
            handle=(new Date()).getTime().toString(36),
            _style='<style type="text/css">html{_overflow:hidden}body{margin:0;padding:0;_overflow:auto;_height:100%}ul,li{margin:0;padding:0;}.jSelect{left:0px;position:fixed;top:0px;height:100%;width:100%;color:#000;*color:#b52007;background:rgba(0,0,0,0.3);background-color:#000\0;_position:absolute;*background:#000;filter:alpha(opacity=60);display:none;}.jSelect .container{position:absolute;top:20px;left:50%;margin-left:-305px;width:615px;height:80px;background-color:#ffffff;overflow-x:hidden;overflow-y:auto;}.jSelect .container .item{border:1px solid rgb(229,229,229);list-style:none;cursor:default;margin:1px;width:194px;height:40px;text-align:center;display:inline-block;float:left;}.jSelect .container .item .val{height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.jSelect .container .item .text{height:20px;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;}.jSelect .container .item .noVText{height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;}</style>',
            _replace=$('<input type="text"  value="" >'),
            _replace_hidden=$('<input type="hidden"  value="">'),
            html='<div id="'+handle+'" class="jSelect"><ul class="container">';
        function copy(){
        	var attr=_this[0].attributes;
	        for(var i=0;i<attr.length;i++){
	        	if(attr[i].name=="name")
	        		continue
	        	_replace.attr(attr[i].name,_this.attr(attr[i].name));
	        };
	        _replace_hidden.attr("name",_this.attr("name"));
	        _this.after(_replace_hidden);
            _this.replaceWith(_replace);
            getData();
        }
        function getData(){
            $.each(_this.find("option"),function(k,v){
                var name=$(v).html().replace(/\s/g,"").replace($(v).val()+"-","");
                html+='<li val="'+$(v).val()+'" name="'+name+'" class="item">';
            	if(options.isShowVal){
            		html+='<div class="val">'+$(v).val()+'</div>'+
                    '<div class="text">'+name+'</div>';
            	}else{
            		html+='<div class="noVText">'+name+'</div>';
            	} 
                html+='</li>';
            });
            html+="</ul></div>";
            $(document.body).append(html);
            $("#"+handle).height($(window).height());
            $("#"+handle).width("100%");
            $("#"+handle +" .container").height($(window).height()-50);
        }
        function event(){
            _replace.focus(function(){
                $("#"+handle).show();
            });
            $("#"+handle).delegate("li","click",function(){
                _replace_hidden.val($(this).attr("val"));
                _replace.val((options.isShowVal?($(this).attr("val")+"-"):"")+$(this).attr("name"));
                $("#"+handle).hide();
            });
            $("#"+handle).click(function(){
                $("#"+handle).hide();
            });
            $("#"+handle).find("ul li").hover(function(){
                $(this).css({"background-color":"#e5e5e5"});
            },function(){
                $(this).css({"background-color":""});
            });
            _replace_hidden.val(_this.val());
            _replace.val((options.isShowVal?(_this.val()+"-"):"")+_this.find("option:selected").text());
        }
        function init(){
        	$("head").append(_style);
        	copy();
        	event();
        }
        init();
	}
})(jQuery)
