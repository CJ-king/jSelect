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
        	copy();
        	event();
        }
        init();
	}
})(jQuery)
