$(function(){
	var sel=$(".any .sel");
	
	var back=$(".any .back");
	var header=$(".header");
	var list=$(".list");
	var righticon=$(".header .righticon");
	var input=$(".list input");
	var right=$(".list .right");
	var ul=$("ul");
	var li=$("li");
	var todos=[];
	var pos;
	
	
	back.on("click",function(){
		sel.fadeToggle("slow","linear");
	})
	
	righticon.on("click",function(){
		header.css("display","none");
		list.css("display","block");
	})
	// 添加内容
	right.on("touchend",function(){
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var todo={
			name:v,
			state:0
		};
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos);
		render();
		input.val('');
	})
	
	function render(){
		ul.empty();
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?'done':'';
			$('<li class="'+c+'"><div class="content">'+todos[i].name+
			'</div><div class="delete">x</div></li>').appendTo(ul);
		}
	}
    if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		render();
	}
    
    //右滑
    ul.on('touchstart','li',function(e){
		pos=e.originalEvent.changedTouches[0].clientX;
	});
	ul.on('touchend','li',function(e){
		var p=e.originalEvent.changedTouches[0].clientX;
	    var index=$(this).index();
	    if(p-pos>50){
	   	  todos[index].state=1;
	   	  $(this).addClass("done");
	    }
	    if(p-pos<-50){
	   	  todos[index].state=0;
	   	  $(this).removeClass("done");
	    }
	   localStorage.todos=JSON.stringify(todos);
	});
	
	// 删除
	 ul.on('touchstart','.delete',function(){
		var li=$(this).closest('li');
		var index=li.index();
		todos.splice(index,1);
		localStorage.todos=JSON.stringify(todos);
		li.addClass('ani-delete');
		li.delay(800).queue(function(){
			$(this).remove().dequeue();
		});
	});
//侧边
    var all=$(".many");
    var footer=$(".sel");
    var divs=$(".sel div");
    footer.on("touchend","div",function(){
  	  var index=divs.index($(this))
  	  divs.removeClass("active")
  	  $(this).addClass("active")
   	  var li=$("li");
   	  li.show();
   	  if($(this).attr("data-role")=="com"){
   		 var done=$("li:not(.done)")
   		 done.hide()
   	  }
     if($(this).attr("data-role")=="now"){
   		var nodone=$(".done")
   		nodone.hide()
   	 }
   })
//清除所有

   var clear=$(".shanchu")
   clear.on("touchend",function(){
   var done=$(".done")
	  done.each(function(i){
		 $(this).delay(i*80).queue(function(){
			 $(this).addClass("active").dequeue()
		 }).delay(800).queue(function(){
			$(this).remove().dequeue();
		 })
	  })
    var newarr=[];
    for(var i=0;i<todos.length;i++){
     	if(todos[i].state!==1){
     		newarr.push(todos[i])
     	}
    } 
     todos=newarr;
     localStorage.todos=JSON.stringify(todos);
})
})
	
	
	
	
	
	

