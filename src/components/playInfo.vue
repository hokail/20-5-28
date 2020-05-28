<template>
    <div id="info">
        
            <div id="detail">
                <img :src = picurl alt="歌曲图片" class="musicPic">
                <p>歌曲名：{{musicname}}</p>
                <p>歌手名：{{singer}}</p>
                <p>专辑名：{{musicname}}</p>
            </div>
           
            <div id="doc">
                    <p>歌词</p>
                    <div id="lyricscroll">
                        <ul >
                            <li v-for="(lyric,index) in  musiclyric" :key="index">
                                <p :class="$store.state.currentIndex === index+1  ? 'lineHight' : ''">{{thelyric(lyric,index)}}</p>
                            </li>
                        </ul>
                    </div>
            </div>
    </div>
</template>

<script>

import defPicUrl from '../assets/imgs/huaji.jpg'
import {isEmpty} from '../js/isEmpty'

   export default {
        computed: {
            picurl(){
                // console.log( 111+ this.$store.state.singer);
                return !isEmpty(this.$store.state.picurl) ? this.$store.state.picurl : defPicUrl
            },
             musicname(){
                return !isEmpty(this.$store.state.musicname) ? this.$store.state.musicname : '佚名'
            },
             singer(){
                return !isEmpty(this.$store.state.singer) ? this.$store.state.singer : '佚名'
            },
             musicname(){
                return !isEmpty(this.$store.state.musicname) ? this.$store.state.musicname : '佚名'
            },
            //获取歌词并按句分割成数组，数组元素中包含了每一句的时间和内容
            musiclyric(){
                let alllyrics = this.$store.state.musiclyric
                return alllyrics.split('\n')
            },
        },
        methods: {
            //把歌词中的时间和内容分开,从而获取到每一句歌词的内容，因为函数有参数，而计算属性方法不能带参数，因此写在metbhods中
            thelyric(lyric){
                let p = lyric.indexOf(']')
                return  lyric.substring(p+1)
            }
        }
        //当druation小于下一个时间时，去掉transfroms动画，当相等时，加上动画，移动一行，然后index + 1 ，继续和下一句比较
   }
</script>

<style>
#info{
    height: 680px;
    width: 400px;
    text-align: center;
    position: relative;
}

#info > #detail{
    position: relative;
    top:70px
}

#info > #detail > .musicPic{
    height: 200px;
    width: 200px;
}

#info > #doc{
    position: relative;
    top: 150px;
    text-align: center;
    height: 200px;
}
#info > #doc > #lyricscroll{
    height: 180px;
    overflow-y: scroll;
}

#doc > ul > li{
    list-style: none;
}
.lineHight{
    color: red;
}
</style>