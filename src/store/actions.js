
import {SEARCHNAME,PLAYTHISMUSIC} from './mutation-type'
import axios from 'axios'

const getMusicListUrl = "https://autumnfish.cn/search?keywords="
const getMusicUrlById = "https://autumnfish.cn/song/url?id="
const getMusicInfoById = "https://autumnfish.cn/song/detail?ids="
const getMusicLyricById = "https://autumnfish.cn/lyric?id="


export default {
    searchMusic({commit},keyWord){
        let musicList
        axios.get( getMusicListUrl + keyWord).then(function(response){
            musicList = response.data.result.songs
            //成功之后就提交给mutations，不能写在外面，因为axios是异步的，写在外边会先可能会先执行commit，然后回调函数才会执行完毕，这时传递的musicList为undefined
            commit(SEARCHNAME,{musicList})
			},function(error){
				
            })
    },
     playThisMusic({commit},musicid){
        
        //这里使用async，让函数返回一个promise对象
        return new Promise(function(resolve,reject){
            //让axios同时执行多个请求，当所有的请求都完成后，才会执行then,收到的是一个响应对象，顺序和发送请求的顺序相同
            axios.all([
                axios.get( getMusicUrlById + musicid ),
                axios.get( getMusicInfoById + musicid ),
                axios.get( getMusicLyricById + musicid )
            ]).then(axios.spread(function (response1,response2,response3 ){
                let musicurl = response1.data.data[0].url;
                let picurl = response2.data.songs[0].al.picUrl;
                let musicname = response2.data.songs[0].name;
                let singer = response2.data.songs[0].ar[0].name;
                let musiclyric = response3.data.lrc.lyric
                commit(PLAYTHISMUSIC,{musicurl,picurl,musicname,singer,musiclyric})
                //console.log('四四四');
                resolve()
            }))               
        })
            
    },
   
}