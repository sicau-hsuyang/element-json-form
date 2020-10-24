/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 23:39:48
 */
import Vue from "vue";
import App from "@/views/index/App.vue";
import router from "@/router";
import "@/styles/index.scss";
import "@/icons";
import axios from "axios";
import FormTable from '@/components/controls/FormTable/table.vue';
import Tinymce from "@/components/tinymce/index.vue";

Vue.component("tinymce", Tinymce);
Vue.component('FormTable', FormTable);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => {
    return h(App);
  }
}).$mount("#app");
