/*
 * @Descripttion: 
 * @Author: meixinqiu
 * @Date: 2021-05-28 16:26:43
 * @LastEditTime: 2021-05-28 17:26:46
 */
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'normalize.css';
import '@/assets/style/index.scss';

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
