
import {SEARCHNAME,PLAYTHISMUSIC} from './mutation-type'



export default {
    [SEARCHNAME](state,{musicList}){
        state.musicList = musicList
    },
    [PLAYTHISMUSIC](state,{musicurl,picurl,musicname,singer,musiclyric}){
        state.musicurl = musicurl
        state.picurl = picurl
        state.singer = singer
        state.musicname = musicname
        state.musiclyric = musiclyric
    },
}