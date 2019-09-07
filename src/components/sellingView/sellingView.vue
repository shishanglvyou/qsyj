<template>
  <div class="selling-view">
    <goods-item v-for="(goods,index) in sellings" :key="index" :goods="goods"></goods-item>
  </div>
</template>

<script>
  import goodsItem from '../goodsItem/goodsItem'
  export default {
    name: "sellingView",
    data(){
      return{
        sellings:[]
      }
    },
    created() {
      this.axios({
        url:'/json/selling-list.json',
        method:'get'
      })
      .then(res=>{
        this.sellings=res.data
      })
      .catch(err=>{
        console.log(err);
      })
    },
    components:{
      goodsItem
    }
  }
</script>

<style scoped>
  .selling-view{
    border-top: 0.0625rem solid #bbbbbb;
    border-left: 0.0625rem solid #bbbbbb;
    overflow: hidden;
  }
</style>
