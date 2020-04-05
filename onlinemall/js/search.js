(function($){
    'use strict';

    var $search = $('.search'),
        $input = $search.find('.search-inputbox'),
        $btn = $search.find('.search-btn'),
        $layer = $search.find('.search-layer'),
        $form = $search.find('.search-form')

    // 验证
    
    $form.on('submit',function(){
        if($.trim($input.val()) === ""){
            return false
        }
    })



    // 自动完成
    $input.on('input',function(){
        var url='https://suggest.taobao.com/sug?_tb_token_=38e4fb37f55b6&__ajax__=1&pid=mm_12238993_43806065_714972723&unid=&clk1=&code=utf-8&_ksTS=1586099746208_5900&callback=jsonp5901&code=utf-8&area=c2c&bucketid=atb_search&q=' + $.trim($input.val())

        $.ajax({
            url:url,
            dataType:'jsonp',
        }).done(function(data){
            console.log(data);
            var html= '',
                dataNum = data['result'].length,
                maxNum = 10;

            if(dataNum === 0){
                $layer.hide().html('');
                return;
            }
            
            for(var i = 0; i < data['result'].length;i++){
                if(i >= maxNum) break;

                html += '<li class="search-layer-item text-ellipsis">'+data['result'][i][0]+'</li>';

            }

            $layer.html(html).show();

        }).fail(function(){
            $layer.hide().html()
        }).always(function(){
            console.log('always');
        })
    })
    // 事件代理：给父元素绑定事件。利用冒泡，来监听子组件事件。
    $layer.on('click','.search-layer-item',function(){
        $input.val($(this).html());
        $form.submit();
    })

    // 显示和隐藏下拉层
    $input.on('focus',function(){
        $layer.show();
    }).on('click',function(){
        return false;
    });
    $(document).on('click',function(){
        $layer.hide();
    })

})(jQuery)