<template>
  <div class="cart-view">
    <CartItemView v-for="(cart, index) in carts" :key="cart.id" :cart='cart' :isChecked='selectList[index]' @onChangeChecked='onItemCheckedChange' :index='index' ref='cartItemView'>
    </CartItemView>

    <!-- 地址选择 -->
    <van-popup v-model="isSubmit" position="bottom">
      <SelectAddrView :addList='addList' @onEditAddr='onEditAddr'></SelectAddrView>
    </van-popup>

    <!-- 地址编辑 -->
    <van-popup v-model="isEdit" position="bottom">
      <EditAddrView :editValue='editValue' @onSaveAddr='onSaveAddr'></EditAddrView>
    </van-popup>

    <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
    >
      <van-checkbox v-model="isAll" class='all-checkbox' checked-color="red" @change='onAllSelect'>全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
  import CartItemView from '../components/CartItemView/CartItemView.vue'
  import SelectAddrView from '../components/SelectAddrView/SelectAddrView.vue'
  import EditAddrView from '../components/EditAddrView/EditAddrView.vue'

  export default{
    name:'cartView',
    components:{
      CartItemView,
      SelectAddrView,
      EditAddrView
    },
    data() {
      return {
        title: '购物车',
        navViewShow: true,
        carts: null,
        isAll: true,
        selectList: [],
        isSubmit: false,
        addList: [],
        isEdit: false,
        editValue: {},
        editIndex: -1
      }
    },
    methods:{
      onSubmit: function(){
        console.log('提交订单')
        this.isSubmit = true
      },
      onItemCheckedChange(isChecked, index){
        // console.log(isChecked, index)
        // 更新状态数组
        // this.selectList[index] = isChecked
        // console.log(this.selectList)

        this.$set(this.selectList, index, isChecked)
      },
      onAllSelect: function(){
        for(let i=0; i<this.selectList.length; i++){
          // this.selectList[i] = this.isAll
          this.$set(this.selectList, i, this.isAll)

          // 需要将对应的状态传递到子组件
          this.$refs.cartItemView[i].onItemViewChange(this.isAll)
        }
      },
      onEditAddr(index){
        this.isEdit = true
        this.editValue = this.addList[index]
        this.editIndex = index
      },
      onSaveAddr(addr){
        // console.log(addr)

        // 更新
        this.$set(this.addList, this.editIndex, addr)
        // 隐藏
        this.isEdit = false
      }
    },
    created() {
      this.$emit('onTitle', this.title)
      this.$emit('onNavShow', this.navViewShow)


      this.axios.get('/json/cart.json')
      .then(res=>{
        // console.log(response.data)
        this.carts = res.data

        // 动态添加
        for(let i=0; i<this.carts.length; i++){
          this.selectList.push(true)
        }
      })
      .catch(err=>{
        console.log(err)
      })

      this.axios.get('/json/user-addr.json')
      .then(res=>{
        // console.log(response.data)
        this.addList = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    computed:{
      totalPrice(){
        let total = 0

        for(let i=0; i<this.selectList.length; i++){
          if(this.selectList[i]){	// 选中
            let price = this.carts[i].price
            let num = this.carts[i].num
            total += price * num
          }
        }

        // 注意显示单位
        return total * 10 * 10
      }
    }
  }
</script>

<style>
  .cart-view{
    padding-top: 2.8125rem;
    padding-bottom: 6.25rem;
    box-sizing: border-box;
  }
  .cart-view > .van-submit-bar{
    bottom: 3.125rem;
  }
  .cart-view .all-checkbox{
    margin-left: 0.9375rem;
  }
</style>
