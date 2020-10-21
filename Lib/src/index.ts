/*
 * @Author: JohnYang
 * @Date: 2020-10-13 20:58:18
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-14 22:55:54
 */
import { VueConstructor } from "vue";
import FormGenerator from "./index.vue";
export default {
  install(Vue: VueConstructor) {
    Vue.component("ElFormGenerator", FormGenerator);
  }
};
