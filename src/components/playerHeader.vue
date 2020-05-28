<template>
    <div>
      <nav class="navbar 	navbar-inverse navbar-fixed-top ">
      <div class="container   lhead">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
         
          <a class="navbar-brand" href="#">音悦台</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">用户昵称</a></li> 
          </ul>
          <img class="round-img nav navbar-nav navbar-right" src="../assets/imgs/_qiyana.jpg"  alt="">
          
          <form class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" class="form-control search-text pos" placeholder="Search" v-model="keyWord"> 
              <img type="submit" class="btn btn-default search-button pos" src="../assets/imgs/search.png"  @click="searchMusic"/>
            </div>
          </form>
          
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
      </nav>
    </div>
</template>

<script>
   export default {
       data(){
            return{
              keyWord:''
            }
        },
        methods: {
          searchMusic(){
          
            this.$store.dispatch('searchMusic',this.keyWord)
          }
        }
   }
</script>

<style>
.pos{
  position: relative;
}

.round-img{
  height: 40px;
  border-radius: 50%;
  /* 在bootstrap导航栏难以用一个类实现在电脑段和移动段同时居中，所以可在移动端时使用不同的上边距，让图片居中 */
  margin-top: 5.5px;
}

.search-text{
  border-radius: 50px;
 
}
.search-button{
  height: 35px;
  width: 45px;
  width: 105;
  right: 30px;
  border-radius:0 50px 50px 0;
  cursor: pointer;
}

.search-button:active{
  top:0.5px
}


/* 只把需要改变的一部分样式属性写在里面就可以了 */
@media (max-width: 768px){
  .round-img {
  /* 在bootstrap导航栏难以用一个类实现在电脑段和移动段同时居中，所以可在移动端时使用不同的上边距，让图片居中 */
    margin-top: 10px;
}
}

</style>