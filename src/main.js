import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
 
// 引入vuex
import store from './store/store'
Vue.use(VueAxios, axios)
// import vueBus from '@/utils/vueBus'
// import store from './store/index'
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.use(vueBus);
Vue.prototype.$bus = new Vue();
import '@/assets/less/index.less';
new Vue({
  el: '#app', 
  router,
  store,
  components: { App },
  template: '<App/>'
})
