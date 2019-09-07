import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Tabbar, TabbarItem ,NavBar,Swipe, SwipeItem,Lazyload,Row, Col,Grid, GridItem,Icon,Panel,Button,Stepper,GoodsAction,GoodsActionIcon,GoodsActionButton,Search,Tag,SubmitBar,Checkbox, CheckboxGroup,Popup,AddressList,AddressEdit,Tab, Tabs} from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Swipe).use(SwipeItem).use(Lazyload).use(Row).use(Col).use(Grid).use(GridItem).use(Icon).use(Panel).use(Button).use(Stepper).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Search).use(Tag).use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Popup).use(AddressList).use(AddressEdit).use(Tab).use(Tabs)

Vue.config.productionTip = false

Vue.prototype.axios=axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
