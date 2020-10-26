/*
 * @Author: JohnYang
 * @Date: 2020-10-13 20:50:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 21:20:07
 */
import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
// import ElFormGenerator from "@/components/Demo/index";
import ElementUI from "element-ui";
import ElFormGenerator from "@/components/ElFormGenerator/index";
// import ElFormGenerator from "@/components/ElFormGenerator/dist/index.js";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ElFormGenerator);
// Vue.component("ElFormGenerator", ElFormGenerator);

new Vue({
  render: h => h(App)
}).$mount("#app");
