<template>
<div class="enl-fontsize">
    <div class="row mainlist">
        <div class="col-md-7">
            <div class="list-header">
                <input type="checkbox"><span>歌曲</span>
            </div>
        </div>
        <div class="col-md-2">
            <span>歌手</span>
        </div>
        <div class="col-md-2">
            <span>时长</span>
        </div>
        
    </div>
    <playerMusic/>
</div>
</template>

<script>
import playerMusic from './playerMusic'
   export default {
    
        components: {
            playerMusic
        },
        computed: {
            allmusic(){
               return  this.$store.state.musicList
                // console.log(this.$store.state.musicList);
            }
        }
   }
</script>

<style>
.mainlist{
    margin-left: 4px;
}
.enl-fontsize{
    font-size: 20px;
}
</style>