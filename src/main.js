// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { L } from 'vue2-leaflet'
import 'leaflet.icon.glyph'
import '../node_modules/leaflet/dist/leaflet.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import DatatableFactory from 'vuejs-datatable/dist/vuejs-datatable.esm.js'
import './assets/pager.css'

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(DatatableFactory)

Vue.config.productionTip = false
Vue.prototype.$serverurl = 'http://localhost:8080'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
