<template>
  <div class="search-view">
    <van-search
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <div class="history-view">
      <div class="history-title">
        <h4>最近搜索</h4>
        <span @click="onClear">清空记录</span>
      </div>


      <van-tag @click='onHistoryItem(item)' round v-for="(item, index) in historyList" :key='index'>{{item}}</van-tag>
    </div>


    <!-- 搜索详情 -->
    <SearchDetailView v-if='searchDetailShow' @onBack='onDetailHide' :searchDataList='searchDataList'></SearchDetailView>
  </div>
</template>

<script>
  import SearchDetailView from '../components/SearchDetailView/SearchDetailView.vue'
  import { Toast } from 'vant';
  export default{
    name:'searchView',
    components:{
      SearchDetailView,
    },
    data() {
      return {
        title: '搜索',
        navViewShow: false,
        searchKey: '',
        historyList:[
          '明月',
          '海昌',
          '隐形眼镜'
        ],
        searchDetailShow: false,
        searchDataList: null
      }
    },
    created() {
      this.$emit('onTitle', this.title)
      this.$emit('onNavShow', this.navViewShow)
    },
    methods:{
      onSearch(){
        if(this.searchKey){
          this.searchDetail()
          this.historyList.push(this.searchKey)
        }
      },
      onClear(){
        this.historyList = []
      },
      onHistoryItem(item){
        this.searchKey = item
        this.searchDetail()
      },
      onDetailHide(){
        this.searchDetailShow = false
      },

      closeLoding(){
        // 显示搜索详情页
        this.searchDetailShow = true
      },
      searchDetail(){
        // 加载提示(加载数据)
        Toast.loading({
          mask: true,
          message: '加载中...',
          duration: 0,
          onClose: this.closeLoding	// 关闭后的回调
        });

        // 获取数据
        // 搜索内容
        // 参数: 搜索的关键字searchKey
        console.log('搜索关键字: ' + this.searchKey)
        this.axios.get('/json/search-detail.json')
        .then(res=>{	// 数据已经获取到
          // console.log(response.data)

          this.searchDataList = res.data.list

          // 关闭轻提示
          Toast.clear()
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }

  }
</script>

<style>
  .search-view{
    /* 	position: fixed;
      left: 0;
      top: 0;
      bottom: 0; */
    width: 100%;
    background: #F2F2F2;
  }
  .search-view > .history-view{
    padding: 0 1.25rem;
  }
  .search-view > .history-view > .history-title{
    margin: 1.125rem 0 1.25rem;
    overflow: hidden;
  }
  .search-view > .history-view > .history-title > h4{
    float: left;
    font-size: 1rem;
    font-weight: 800;
  }
  .search-view > .history-view > .history-title > span{
    color: red;
    font-size: 1rem;
    float: right;
  }
  .search-view > .history-view > .van-tag{
    margin: 0 0.625rem;
  }
</style>
