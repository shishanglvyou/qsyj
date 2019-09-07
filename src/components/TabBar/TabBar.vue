<template>
  <div style="margin-top:50px;">
    <van-tabbar v-model="active" active-color="red" @change='onClickTabbarItem'>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="filter-o" to="/assort">分类</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    data() {
      return{
        active: 0,
      }
    },
    methods:{
      onClickTabbarItem(){
        // 保存
        window.localStorage.setItem('itemIndex', this.active)
      },
    },
    created() {
      // 获取下标
      let itemIndex = parseInt(window.localStorage.getItem('itemIndex'))
      if(!isNaN(itemIndex)){
        // 从0开始的
        this.active = itemIndex

        // 路径
        let toPath = this.$router.options.routes[itemIndex+1].path

        // 跳转到指定页面中
        this.$router.push({path:toPath})
      }
    }
  }
</script>

<style scoped>

</style>
