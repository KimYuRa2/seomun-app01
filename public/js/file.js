/* 공지사항 탭 */
$(document).ready(function() {
    $(".cate_list_wrap li").click(function(){
        var idx = $(this).index();
        //alert(idx);
        $(".cate_list_wrap li").removeClass("on");
        $(".cate_list_wrap li").eq(idx).addClass("on");
        $(".notice_wrap").hide();
        $(".notice_wrap").eq(idx).show();
    })
  });