import Vue from 'vue'
import VueProgressBar from "vue-progressbar";
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
  color: "#28a745",
  failedColor: "red",
  height: "2px"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')