<template>
<div>
    <div class="container-fluid  two">
        <div class="row">
            <div class="col-md-9 ">
                <playerButtons class="box-border "/>
                <playList class="box-border playList"/>
            </div>
            <div class="col-md-3">
                <playInfo class="box-border playInfo" ref="playInfo"/>
            </div>
      </div>
    </div>
</div>
</template>

<script>

import playerButtons from './playerButtons'
import playList from './playList'
import playInfo from './playInfo'


   export default {
       components: {
         playerButtons,
         playList,
         playInfo 
       },
   }
</script>

<style>
.two{
  margin-top: 70px;
  border: 1px solid black;
  height: 700px;
}
.box-border{
  margin: 10px 0;
  border:1px solid black
}
.playList{
    height: 630px;
    overflow-y: scroll;
}
.playInfo{
  width: 300px;
  height: 500px;
}
</style>