/**
 * jquery.jSelect.js v0.1
 * Date: 2016-01-07 
 * Author: jinchangjiang <1003219989@qq.com>
 */
(function($){
    $.jSelect=function(obj){
        var _this=$(obj),
            handle=(new Date()).getTime().toString(36),
            _replace=$('<input type="text"  value="" >'),
            _replace_hidden=$('<input type="hidden"  value="">'),
            html='<div id="'+handle+'"  style="text-align: center;display: none;background-color: rgba(0,0,0,0.6);position: fixed;top:0;left: 0;">'+
            '<ul style="position: absolute;top:50px;bottom: 50px;left:50%;margin-left:-305px ;width: 630px;background-color: #ffffff;overflow-x: hidden;overflow-y: auto;">'
                
        function copy(){
            _replace.attr("class",_this.attr("class"));
            _replace.attr("style",_this.attr("style"));
            _replace_hidden.attr("name",_this.attr("name"));
            _this.parent().append(_replace_hidden).append(_replace).end().remove();
            getData();
        }
        function getData(){
            $.each(_this.find("option"),function(k,v){
                var name=$(v).html().replace(/\s/g,"").replace($(v).val()+"-","");
                html+='<li val="'+$(v).val()+'" name="'+name+'" style="border: 1px solid #e5e5e5;cursor: default;margin: 1px;    display: inline-block;width: 196px; height: 40px;text-align: center;">'+
                        '<div style="height: 20px;">'+$(v).val()+'</div>'+
                        '<div style="height: 20px;">'+name+'</div>'+
                    '</li>';
            });
            html+="</ul></div>";
            $(document.body).append(html);
            $("#"+handle).height($(window).height());
            $("#"+handle).width("100%");
        }
        function event(){
            _replace.focus(function(){
                $("#"+handle).show();
            });
            $("#"+handle).delegate("li","click",function(){
                _replace_hidden.val($(this).attr("val"));
                _replace.val($(this).attr("val")+"-"+$(this).attr("name"));
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
            _replace.val(_this.find("option:selected").text());
        }
        copy();
        event();
        
    };
})(jQuery);


