$(function(){
    let arr = [];
    let arrs = ['a','d','s','h'];
    let flag = [];
    let poke = $('.poke');
    let first = null;
    let rightbtn = $('.right');
    let leftbtn = $('.left');

    for(let i = 0; i < 52;i++){

        let color = arrs[Math.floor(Math.random()*4)],
            num = Math.floor(Math.random()*13+1);

        do{
            color = arrs[Math.floor(Math.random()*4)],
                num = Math.floor(Math.random()*13+1);

        }while(flag[color +'_'+ num]);

        arr.push({color,num});
        flag[color +'_'+ num] = 'true';
    }
    let index = 0;
    for(let i = 0;i < 7; i++){
        for(let j = 0; j <= i;j++){

            let divs = $('<div>');
            let left = 350 - 50*i + 100*j;
            let top = 50*i;
            divs
                .addClass('pai')
                .data('num',arr[index]['num'])
                .attr('id',`${i}_${j}`)
                // .html(arr[index].color+'--'+arr[index].num)
                .css({backgroundImage:`url(img/${arr[index].color}${arr[index].num}.JPG)`})
                .appendTo('.poke')
                .delay(150*i).animate({left,top,opacity:1});
            index++;
        }
    }

    for(;index < 52;index++){
        let divs = $('<div>');
        // console.log(index);
        let left = 100;
        divs
            .addClass('pai')
            .addClass('leftp')
            .data('num',arr[index]['num'])
            .attr('id',-2+'-2'+-2)
            // .html(arr[index].color + '--' +arr[index].num)
            .css({backgroundImage:`url(img/${arr[index].color}${arr[index].num}.JPG)`})
            .appendTo('.poke')
            .delay(50*index).animate({left,top:'500',opacity:1})
    }

    poke.on('click','.pai',function () {
        let coords = $(this).attr('id').split('_');
        if($(`#${coords[0]*1+1}_${coords[1]*1}`).length || $(`#${coords[0]*1+1}_${coords[1]*1+1}`).length){
            return;
        }
        if($(this).hasClass('active')){
            $(this).animate({top:'+=20'})
        }else{
            $(this).animate({top:'-=20'})
        }
        $(this).toggleClass('active');


        if(!first){
            first = $(this);
        }else{
            if(first.data('num')+$(this).data('num')==14){
                $('.active').animate({
                    top:1,
                    left:700
                },function () {
                    $(this).remove()
                })
            }else{
                $('.active').animate({'top':'+=20'}).queue(function () {
                    $(this).removeClass('active');
                    $(this).dequeue();
                })
            }
            first = null;
        }
    })

    let zIndex=0;

    rightbtn.on('click',function(){
        zIndex++;
        if(!$('.leftp').length){
            return;
        }
        $('.leftp')
        .css({zIndex})
        .last()
        .removeClass('leftp')
        .addClass('rightp')
        .animate({left:600})
    })
    leftbtn.on('click', function () {
            if(!$('.rightp').length){
                return;
            }
            $('.rightp').each(function (index,obj) {
                let zindex = $('.leftp').eq(-1).css('zIndex')*1+1;
                $(this).delay(index*10).css({zIndex:zindex}).animate({left:'100'},function(){
                    $(this).removeClass('rightp').addClass('leftp');
                })
            })
        })
})
