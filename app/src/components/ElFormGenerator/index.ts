/*
 * @Author: JohnYang
 * @Date: 2020-10-13 20:58:18
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 21:02:27
 */
import { VueConstructor } from "vue";
import FormGenerator from "./src/form.vue";
export default {
  install(Vue: VueConstructor) {
    Vue.component("ElFormGenerator", FormGenerator);
  }
};
