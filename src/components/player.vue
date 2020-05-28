<template>
<div>
    <div  class="audio-wrapper"  >	
        <audio id="audioPlayer" ref="audioPlayer" autoplay="autoplay" :src="musicurl"  >Your browser does not support the audio element.</audio>
        <div class="audio-left"> 
            <img src="../assets/imgs/last.png"  class="musicBtn" @click="playNextMusic($store.state.musicindex - 1)"/>
            <img src="../assets/imgs/play.png"  class="musicBtn" id="playBtn" ref="musicBtn" @click="pause"/>
            <img src="../assets/imgs/next.png"  class="musicBtn" @click="playNextMusic($store.state.musicindex + 1)" />
        </div>
        <div class=" audio-middle ">
            <p  id="playingname">歌曲名</p><!-- 通过vue来绑定歌曲名字 -->
            <p  id="author">歌手</p><!-- 通过vue来绑定歌曲名字 -->
            <div class="progress-bar-bg" id="progressBarBg"><!-- 进度条容器 -->
                <span id="progressDot"></span>
                <!-- progerss-bar类自带了样式，这里使用另一个类名 -->
                <div class="progress-dotbar" id="progressBar">
                </div>
            </div>
            <div class="audio-time">
                <span class="audio-length-total" id="audioTotTime">/00:00</span>
                <span class="audio-length-current" id="audioCurTime">00:00</span>
            </div> 
        </div> 
         <div class="audio-right" id="volume">
            <img src="../assets/imgs/single.png"  />
            <img src="../assets/imgs/history.png"  />
            <img src="../assets/imgs/volume.png"  ref="volumeCon" @click="muted" />
            <div class="volume-bar-bg" @mousedown="changeVol" ref="volumeBarBg"> <!-- 进度条容器 -->
                <span id="volumeDot" ref="volumeDot"></span>
                <div class="volume-bar" ref="volumeBar" >
                </div>
            </div>
        </div>
        
    </div>	
</div>
</template>


<script>

// vue组件中引入外部js，需要使用es6模块导入的方法，不要直接引入js文件
import {progressBarInit} from '../js/progressBar';

//引入按钮图片路径
import mutedBtn from '../assets/imgs/mute.png'
import volumeBtn from '../assets/imgs/volume.png'

//引入歌词滚动方法
import {scrollLyric} from '../js/scrollLyric.js'


export default {
  
    mounted () {
        //歌曲进度条状态变化监听
        progressBarInit()
        //更新音量进度条显示
        this.refVolBar()

        //歌词滚动变化的监听
        //歌词滚动一共分为两个部分，第一部分是初始化歌词滚动条的状态（initLyric.js），第二部分是给audio加监听，使歌词滚动起来（scrollLyric.js）
        scrollLyric()
    },
    computed: {
        musicurl(){
          return   this.$store.state.musicurl
        }
    },
    methods: {
        //点击调音量
        changeVol(e){
            let per = e.offsetX / this.$refs.volumeBarBg.offsetWidth
            this.$refs.audioPlayer.volume = per.toFixed(1)
            this.refVolBar()
        },

        //更新音量进度条显示
        refVolBar(){
            let per = this.$refs.audioPlayer.volume * this.$refs.volumeBarBg.offsetWidth * 1 + 'px'
            this.$refs.volumeBar.style.width = per 
            this.$refs.volumeDot.style.left = per   
        },

        //播放暂停
        pause(){
            let audioPlayer = this.$refs.audioPlayer
            if(!audioPlayer.paused){
                audioPlayer.pause()
            }else{
                audioPlayer.play()
            }
        },

        //静音
        muted(){
            let audioPlayer = this.$refs.audioPlayer
            if(!audioPlayer.muted){
                audioPlayer.muted = true   
                this.$refs.volumeCon.src = mutedBtn
            }else{
                audioPlayer.muted = false 
                this.$refs.volumeCon.src = volumeBtn
            }
        },

        //点击按钮，播放下一首或上一首
        playNextMusic( index ){
                
                
                let musicList = this.$store.state.musicList
 
                if(index < 0 || index > musicList.length - 1){
                    return 
                }
                let musicid = musicList[index].id

                this.$store.state.musicindex = index
                this.$store.state.musicurl = undefined
                 
                this.getmusic(musicid)    
                
        },
        async getmusic(musicid)
        {
            //console.log('二二二')
            await this.$store.dispatch('playThisMusic', musicid)
            //console.log('三三三')
            

            //在每次播放歌曲前，初始化歌词滚动的状态
             initLyric(this.$store.state.musiclyric)
        },
    }
    
}
</script>

<style>
    @import '../css/progressbar.css';
</style>