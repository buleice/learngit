//   获取到所有需要操作的对象
var imgs_div = document.getElementById("imgs");
var nav_div = document.getElementById("nav");
//获取到图片轮播的ul对象数组
var imgsUl = imgs_div.getElementsByTagName("ul")[0];
//获取到远点的ul对象数组
var nav = nav_div.getElementsByTagName("ul")[0];
//上一个
var prious = document.getElementById("preous");
//下一个
var next = document.getElementById("next");

//1、先处理好左右（上一张，下一张）两个按钮的点击事件，点击之后，能够正常的切换当前图片；
prious.onclick = function() {
	//上一张，图片需要向右移动，（X轴正轴方向），所以加1280
	var offset = parseInt(imgsUl.offsetLeft) + 1280;
	imgsUl.style.left = offset + "px";
}
next.onclick = function() {
	//下一张，图片像左移动，（X轴负轴方向），所以减1280
	var offset = parseInt(imgsUl.offsetLeft) - 1280;
	imgsUl.style.left = offset + "px";
}

//2、 在图片切换之后， 控制相对应的圆点标签， 高亮显示当前图片对应的圆点：
//这里封装一个函数， 首先让圆点li标签的所有class都变成hidden, 然后在通过传进来的下标在减去1， 则是当前可见的li标签：

var index = 1; //表示默认当前就是展示的第一张图片
prious.onclick = function() {
	//上一张，图片需要向右移动，（X轴正轴方向），所以加1280
	var offset = parseInt(imgsUl.offsetLeft) + 1280;
	imgsUl.style.left = offset + "px";
	//这里需要判断当前的下标是否小于1，小于了，则说明现在当前是第一张图片，再返回，就是要到第四张图片，让index=4，每次点击之后让index的值减1
	if(index < 1) {
		index = 4;
	}
	index -= 1;
	btnShow(index);
}
next.onclick = function() {
	/*下一张，图片像左移动，（X轴负轴方向），所以减1280*/
	var offset = parseInt(imgsUl.offsetLeft) - 1280;
	imgsUl.style.left = offset + "px";
	//	这里需要判断当前的下标是否大于4，大于了，则说明现在当前是第四张图片，再返下一张，就是要到第一张图片，让index=1，每次点击之后让index的值+1
	if(index > 4) {
		index = 1;
	}
	index += 1;
	btnShow(index);
}

function btnShow(cur_index) {
	var list = nav.children;
	for(var i = 0; i < nav.children.length; i++) {
		nav.children[i].children[0].className = "hidden";
	}
	nav.children[cur_index - 1].children[0].className = "current";
}
/**
3、在1中的切换图片里面添加动画效果：
      在animate函数中，对newLeft(总偏移量)进行判断，如果大于-1280px;说明当前展示的是第一张图片，现在需要改成展示第四张图片，（第四张图片的left值为-1280*4 px）；
      如果小于-5120px,说明当前展示的是第四张图片，现在需要改成展示第一张图片（第一张图片的left值为：-1280px）；
         * */
var animTimer;
prious.onclick = function() {
	index -= 1;
	if(index < 1) {
		index = 4;
	}
	animate(1280);
	btnShow(index);
}
next.onclick = function() {
	initImgs(index);
	index += 1;
	if(index > 4) {
		index = 1;
	}
	animate(-1280);
	btnShow(index);
}

function animate(offset) {
	var newLeft = parseInt(imgsUl.offsetLeft) + offset;
	if(newLeft > -1280) {
		donghua(-5120);
	} else if(newLeft < -5120) {
		donghua(-1280);
	} else {
		donghua(newLeft);
	}

}

function donghua(offset) {
	clearInterval(animTimer);
	animTimer = setInterval(function() {
		//动画原理： 盒子本身的位置 + 步长
		imgsUl.style.left = imgsUl.offsetLeft + (offset - imgsUl.offsetLeft) / 10 + "px";
		//因为采用的动画原理计算方法，得到的值不可能精确到我们需要偏移的像素单位上，所以我这里判断，在还有20px的时候，就让动画停止。
		if(imgsUl.offsetLeft - offset < 10 && imgsUl.offsetLeft - offset > -10) {
			imgsUl.style.left = offset + "px";
			clearInterval(animTimer);
		}
	}, 20);
}


// 4、开启轮播定时器，每隔两秒执行一次，调用“下一张按钮”的onclick；

          var timer;
          function play(){
               timer=setInterval(function(){
                    next.onclick();
               },2000)
          }

//5、如果当前轮播定时器或者动画效果定时器正在执行，点击了“下一张按钮”，会产生时间冲突，所以在，每次点击“下一张/上一张按钮”的时候，清掉所有的动画，并且让当前索引的图片完整的（沾满整个屏幕），显示在界面上

         //其中cur_index，表示是当前图片的index值；
          function initImgs(cur_index){
               clearInterval(timer);
               clearInterval(animTimer);
               var off=cur_index*1280;
               imgsUl.style.left=-off+"px";
          }
//6、给圆点标签，添加onmouseover和out事件；
//        在onmouseover中，因为圆点标签的下标是从0开始的， 而图片轮播的下标的第一张图，我们在开始的时候默认定义为1，所以在调用其他函数的时候，传递过去的i+1


          for(var i=0;i<nav.children.length;i++){
               nav.children[i].index=i;
               var sd=nav.children[i].index;
               nav.children[i].onmouseover=function(){
                    var now_index=this.index;
                    //这里很重要，要让当前的图片的index的值等于鼠标选中的图片 
                    index=this.index+1;
                    initImgs(this.index+1);
                    btnShow(this.index+1);
               }
               nav.children[i].onmouseout=function(){
                    play();
               }
          }