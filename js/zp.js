var calender=(function($){
    var showRiLi=function(opt){
        var deft={
            count:1,
            box:'.box'
        };
        //扩充参数
       var data=$.extend({},deft,opt)
       //获取当前日期
       var time=new Date();
       //获取当前年
       var y=time.getFullYear();
       //获取当前月
       var ms=time.getMonth()
       //获取当前星期
       var xing=time.getDate();
        console.log(xing)
       //进行遍历要渲染几个月份
       for(var i=0;i<data.count;i++){
          CreatD(y,ms+i)
       }
       //进行对应标签的渲染
       function CreatD(y,m){
        var ind=0;
        var curx=new Date(y,m).getFullYear();
        var cury=new Date(y,m).getMonth();
        var str=''
          str+='<h2>'+curx+'年'+(cury+1)+'月</h2>';
          for(var j=1;j<=getDa(y,m).first;j++){
           str+='<span class="t"></span>'
          }
         for(var i=1;i<=getDa(y,m).end;i++){

           if(i<xing && ms==cury){
             str+='<span class="pass">'+i+'</span>';
           }else if(i==xing && ms==cury){

                str+='<span class="start">'+i+'</span>';
                ind++;
           }else if(i==xing+1 && ms==cury){

                 str+='<span class="end">'+i+'</span>';

           }else{

                str+='<span class="fu">'+i+'</span>';
           }

          }
          $('.tian').append(str)
       }
     //单击页面中的li
       var indarr={
         start:1,
         end:2
       }
       var sp=$('.tian').find('span')
        for(var j=0;j<sp.length;j++){
        sp.eq(j).attr('data_ind',j+1);
         console.log(sp[j])
      }
      var lis=$('.tian').find('span').not(".pass",".t")
      console.log(lis.length)

      lis.on('click',function(){
        var indexs=Number($(this).attr('data_ind'));
         if(indarr.start&&indarr.end){
             lis.removeClass("start").removeClass("end").removeClass('a')
             $(this).addClass('start')
             indarr.start=$(this).attr('data_ind');
            // console.log(indarr.start)
             indarr.end='';
         }else{
              if(indexs<indarr.start){
               lis.removeClass("start").removeClass("end")
                $(this).addClass('start')
                indarr.start=$(this).attr('data_ind');
                indarr.end='';

              }
              else{
                 lis.removeClass("end")
                 $(this).addClass('end')
                 indarr.end=$(this).attr('data_ind');
                 lis.each(function(i,val){
                  var ind=Number($(this).attr('data_ind'));
                  if(ind>indarr.start&&ind<indarr.end){
                    $(this).addClass("a")
                  }
                 })
              }

          }
       })

       //函数封装；
       function getDa(y,m){
        return {
            first : new Date(y,m,1).getDay(),
            end : new Date(y,m+1,0).getDate(),
         }
       }
    }
    return {
        showRiLi:showRiLi
    }

})(Zepto)