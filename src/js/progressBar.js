import {timeformat} from './timeFormat'

//在js中使用图片资源，需要将图片作为模块导入到js中，否则webpack无法正确将资源打包
import playIcon from '../assets/imgs/play.png' 
import pauseIcon from '../assets/imgs/pause.png' 

export function progressBarInit (){
   
    // const audio = document.querySelector('audio') 
    //使用jquery获取audio需要加上[0]，否则获取到的为undefined,
    //使用 $('#audio') 获取的是一个jquery对象，加上[0]则变为dom对象，只能用dom对象的方法
    const audio = $('#audioPlayer')[0]
    const progressBar = $('#progressBar')
    const progressDot = $('#progressDot')
    const audioCurTime = $('#audioCurTime')
    const audioTotTime = $('#audioTotTime')
    const progressBarBg = $('#progressBarBg')
    const playBtn = $('#playBtn')
   

    // 更新进度条
    function reProgress(audio){
        let per = (audio.currentTime/audio.duration) * 100 + '%'
        progressBar.width(per)
        progressDot.css('left',per)
        audioCurTime.html(timeformat(audio.currentTime))
    }

    //播放结束进度条回到原点
    function musicEnd(){
        progressBar.width(0)
        progressDot.css('left',0)
    }

    audio.addEventListener("canplay",function(){
		$('.musicBtn').css('pointer-events','auto')
    })

    //监听时间和进度条变化
	audio.addEventListener("timeupdate",function(){
		reProgress(audio)
    })
    
	//监听播放结束
	audio.addEventListener("ended",function(){
        musicEnd();
        playBtn.attr('src',playIcon)
    })

    //播放时更新歌曲时间，和按钮
    audio.addEventListener("play",function(){
        audioTotTime.html('/' + timeformat(audio.duration))
        playBtn.attr('src',pauseIcon)
    })

    audio.addEventListener("pause",function(){
        playBtn.attr('src',playIcon)
    })
    
    
    //拖拽更新进度条
    progressDot.mousedown (function(e){ 
        let dotLeft,mouseX,maxLeft,maxRight,distance
        let barLength =  progressBarBg.width()
        if( !audio.paused || audio.currentTime != 0){
            dotLeft =  progressDot.position().left
            mouseX = e.clientX //拖动前位置
            maxLeft = dotLeft //向左拖动最大距离
            maxRight = barLength - dotLeft //向右拖动最大距离    
        } 

        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        document.onmousemove=function(e){
             distance = e.clientX - mouseX
             if(distance > maxRight){
                 distance = maxRight
             }else if( distance < -maxLeft ){
                 distance = -maxLeft
             }
             let barPer = ( distance + dotLeft ) / barLength 
             audio.currentTime = audio.duration * barPer
             reProgress(audio)
        }
        document.onmouseup = function () {
           
              
            document.onmousemove = null;
            document.onmouseup = null;
        };
    })

    
    
    //点击调节进度
    progressBarBg.mousedown(function (e) {
	    // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
	    if (!audio.paused || audio.currentTime != 0) {
			let rate = e.offsetX / progressBarBg.width() 
			audio.currentTime = audio.duration * rate
			reProgress(audio) 
		}
	 })
}
