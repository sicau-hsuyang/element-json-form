/*
 * @Author: JohnYang
 * @Date: 2020-10-13 20:50:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 10:38:21
 */
import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
import ElementJsonForm from "@/components/ElementJsonForm/index";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ElementJsonForm);

new Vue({
  render: h => h(App)
}).$mount("#app");
