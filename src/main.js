import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles/style.scss'
// import index from './directive/index'
import load from './directive/loadmore'
// Vue.use(index)
Vue.use(load)
Vue.use(ElementUI,{
  size:'small'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
