<template>
<div id="playerButton">
    <el-button type="" icon="el-icon-search">搜索</el-button>
    <el-button type="" icon="el-icon-download">下载</el-button>
    <el-button type="" icon="el-icon-video-camera-solid">播放MV</el-button>
    <el-button type="" icon="el-icon-picture">封面</el-button>
</div>
</template>

<script>
   export default {
       data(){
            return{

            }
        }
   }
</script>

<style>
#playerButton{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

</style>