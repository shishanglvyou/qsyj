<template>
  <div class="order-view">
    <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-tabs v-model="active">
      <van-tab title="全部">
        <OrderItemView v-for='(order, index) in orderList' :order='order' :key='index'></OrderItemView>
      </van-tab>
      <van-tab title="待付款">
        <OrderItemView v-for='(order, index) in orderList1' :order='order' :key='index'></OrderItemView>
      </van-tab>
      <van-tab title="待发货">
        <OrderItemView v-for='(order, index) in orderList2' :order='order' :key='index'></OrderItemView>
      </van-tab>
      <van-tab title="待收货">
        <OrderItemView v-for='(order, index) in orderList3' :order='order' :key='index'></OrderItemView>
      </van-tab>
      <van-tab title="交易成功">
        <OrderItemView v-for='(order, index) in orderList4' :order='order' :key='index'></OrderItemView>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import OrderItemView from '../OrderItemView/OrderItemView.vue'
  export default{
    name:"orderView",
    props:['orderType'],
    components:{
      OrderItemView
    },
    created() {
      // 数据类型 对应 tab选项卡
      this.active = this.orderType

      // 获取数据
      this.axios.get('/json/order.json')
      .then(res=>{
        // console.log(response.data)
        this.orderList = res.data

        for(let i=0; i<this.orderList.length; i++){
          let order = this.orderList[i]
          if(order.type == 1){
            this.orderList1.push(order)
          } else if (order.type == 2){
            this.orderList2.push(order)
          } else if (order.type == 3){
            this.orderList3.push(order)
          } else if (order.type == 4){
            this.orderList4.push(order)
          }
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    data() {
      return {
        active: 2,
        orderList: [],	// 全部
        orderList1: [],	// 待付款
        orderList2: [],   // 待发货
        orderList3: [],   // 待收货
        orderList4: [],	// 交易成功
      };
    },
    methods:{
      onClickLeft(){
        this.$emit('onBack')
      }
    }
  }
</script>

<style>
  .order-view{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #F2F2F2;
    z-index: 99;
  }

  .order-view .van-tabs__content{
    position: fixed;
    width: 100%;
    height: 100%;
    padding-bottom: 6.1875rem;
    box-sizing: border-box;
    overflow: auto;
  }
</style>
