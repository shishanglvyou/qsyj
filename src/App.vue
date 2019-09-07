<template>
  <div id="app">
    <van-nav-bar
        :title="title"
        fixed
        v-show='navViewShow'
    />
    <router-view @onTitle='getTitle' @onNavShow="getShow"></router-view>
    <TabBar/>
  </div>
</template>
<script>
  import TabBar from './components/TabBar/TabBar'
  export default {
    data(){
      return{
        title: '',	// 导航标题(子组件传递过来)
        navViewShow: true,// 导航显示或隐藏
      }
    },
    components:{
      TabBar
    },
    methods:{
      getTitle(title){
        this.title=title;
      },
      getShow(temp){
        this.navViewShow = temp
      },
    },
  }
</script>
<style>
  @import "assets/css/reset.css";
  .van-nav-bar{
    background: red;
    height: 3rem;
  }
  .van-nav-bar__title{
    color: #fff;
  }

  .van-nav-bar .van-icon{
    color: white;
    font-size: 1rem;
  }
</style>
