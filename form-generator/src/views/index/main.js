/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 20:53:16
 */
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import "@/styles/index.scss";
import "@/icons";
import axios from "axios";
import Tinymce from "@/components/tinymce/index.vue";

Vue.component("tinymce", Tinymce);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => {
    return h(App);
  }
}).$mount("#app");
