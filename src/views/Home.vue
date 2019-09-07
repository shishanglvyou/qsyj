<template>
  <div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white" class="banner-item">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img v-lazy="item.img" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-grid clickable :border="false" :column-num="5">
      <van-grid-item
          icon="home-o"
          text="首页"
          to="/home"
      />
      <van-grid-item
          icon="filter-o"
          text="分类"
          url="/assort"
      />
      <van-grid-item
          icon="search"
          text="搜索"
          url="/search"
      />
      <van-grid-item
          icon="cart-o"
          text="购物车"
          url="/cart"
      />
      <van-grid-item
          icon="contact"
          text="个人中心"
          url="/mine"
      />
    </van-grid>

    <title-view name="单品热卖" icon="star"></title-view>
    <selling-view></selling-view>
    <title-view name="精选活动" icon="gift"></title-view>
    <winnow-view :bigImg="winnowBig1" :contents="winnowContents1"></winnow-view>
    <winnow-view :bigImg="winnowBig2" :contents="winnowContents2"></winnow-view>
    <title-view name="为你推荐" icon="label"></title-view>
    <commend-view></commend-view>
    <transition name='slide-to-left'>
      <goods-detail-view v-if="goodsDetailShow"></goods-detail-view>
    </transition>
  </div>
</template>

<script>
  import titleView from '../components/titleView/titleView'
  import sellingView from '../components/sellingView/sellingView'
  import winnowView from '../components/winnowView/winnowView'
  import commendView from '../components/CommendView/CommendView'
  import goodsDetailView from '../components/GoodsDetailView/GoodsDetailView'

  export default {
    name: 'home',
    data() {
      return {
        title: '全视眼镜商城',
        navViewShow: true,
        banner: [],
        winnowBig1: '',
        winnowContents1: [],
        winnowBig2: '',
        winnowContents2: []
      }
    },
    computed: {
      goodsDetailShow() {
        // 根据状态管理中
        return this.$store.state.goodsDetailShow
      }
    },
    created() {
      this.$emit('onTitle', this.title)
      this.$emit('onNavShow', this.navViewShow)

      this.axios({
        url: '/json/banner.json',
        method: 'get'
      })
      .then(res => {
        this.banner = res.data;
      })
      .catch()

      this.axios({
        url: '/json/winnow.json',
        method: 'get'
      })
      .then(res => {
        this.winnowBig1 = res.data.bigImg1;
        this.winnowContents1 = res.data.winnowItems1;
        this.winnowBig2 = res.data.bigImg2;
        this.winnowContents2 = res.data.winnowItems2;
      })
      .catch()
    },
    components: {
      titleView,
      sellingView,
      winnowView,
      commendView,
      goodsDetailView
    }
  }
</script>
<style scoped>
  .banner {
    padding-top: 3rem;
  }

  .banner-item {
    height: 10rem;
  }

  .van-grid {
    flex-wrap: nowrap;
    margin-top: 5px;
  }

  /* transition name='xxxx'
	* xxx-enter (进入)过渡开始状态
	* xxx-enter-to (进入)过渡结束的状态
	* xxx-enter-active (进入)过渡时间、延迟、曲线
	* xxx-leave (离开)过渡开始状态
	* xxx-leave-to (离开)过渡结束的状态
	* xxx-leave-active (离开)过渡时间、延迟、曲线
	*/
  /* 从右边到左边 */
  .slide-to-left-enter-active,
  .slide-to-left-leave-active{
    transition: all 2s;
  }

  .slide-to-left-enter,
  .slide-to-left-leave-to{
    transform: translateX(100%);
  }


  /* 从底部到顶部 */
  .slide-to-top-enter-active,
  .slide-to-top-leave-active{
    transition: all 2s;
  }

  .slide-to-top-enter,
  .slide-to-top-leave-to{
    transform: translateY(100%);
  }
</style>
