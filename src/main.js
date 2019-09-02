import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles/style.scss'
import loadmore from './directive/index'
Vue.use(loadmore)
Vue.use(ElementUI,{
  size:'small'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
