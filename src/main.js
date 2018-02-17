// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Buefy from 'buefy'
import './buefy-custom.scss'

Vue.config.productionTip = false

Vue.use(Buefy, { defaultIconPack: 'fa' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
