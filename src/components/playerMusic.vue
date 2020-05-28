<template>
<div id="playerMusic">
    <ul>
        <li v-for="(music,index) in  allmusic" :key="index" @dblclick="playThisMusic(music.id,index)"  >
            <div class="row">
                <div class="col-md-7">
                    <input type="checkbox"><span class="musicName" :title="music.name">{{music.name}}</span>
                </div>
                <div class="col-md-2">
                    <span class="musicName" :title="music.artists[0].name"><p>{{music.artists[0].name}}</p></span>
                </div>
                <div class="col-md-2">
                    <span>{{musicDuration(music.duration)}}</span>
                </div>
               
            </div>
        </li> 
    </ul>
</div>
</template>

<script>

import {timeformat} from '../js/timeFormat'

//引入歌词滚动方法
// import scrollLyric from '../js/scrollLyric'
 import {initLyric} from '../js/initLyric'


export default {
        computed: {
            allmusic(){ 
               // console.log( this.$store.state.musicList);
                return  this.$store.state.musicList
            },
        },
        methods: {
            playThisMusic(musicid,index){
                this.$store.state.musicurl = undefined
                this.$store.state.musicindex = index
                //console.log('一一一')
                this.getmusic(musicid)       
            },

            //使用async异步执行函数，确保在得到所有歌曲信息后，歌曲开始播放后，才开始让歌词滚动
            //如果不能保证歌曲信息完全获取到，那么可能因为获取不到歌词，而无法添加歌词滚动方法
            async getmusic(musicid)
            {
                //console.log('二二二')
                await this.$store.dispatch('playThisMusic', musicid)
                //console.log('三三三')


                //在每次播放歌曲前，初始化歌词滚动的状态
                initLyric(this.$store.state.musiclyric)

            },
            musicDuration(duration){
                let length = String(duration)
                return timeformat(Number(length.substring(0,3)))
            // musicDuration(music.duration)
            },
            
        }
}
   
</script>

<style>

#playerMusic ul{
    list-style: none;
    margin-left: 20px;
}
#playerMusic ul li{
    margin: 10px 0;  
    cursor: pointer;
}
.musicName ,.albumName{
    overflow: hidden;
    white-space: nowrap;   
}
/* .musicName > p:hover{
    animation: scrollName 5s linear infinite;
} */

#playerMusic ul li:visited{
    background-color: gray;
}

@keyframes scrollName {
    from{
        transform:translateX(0px)
    }
    to{
        transform:translateX(-100%)
    }
}
</style>