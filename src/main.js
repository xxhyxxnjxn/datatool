import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import mixins from "./mixins";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.config.productionTip = false

Vue.use(VueMoment, {
  moment,
})

new Vue({
  router,
  store,
  vuetify,
  axios,
  mixins,
  VueMoment,
  render: h => h(App)
}).$mount('#app')


// router.replace('/login');
