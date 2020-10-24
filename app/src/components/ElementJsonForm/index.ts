/*
 * @Author: JohnYang
 * @Date: 2020-10-13 20:58:18
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 17:26:20
 */
import { VueConstructor } from "vue";
import FormGenerator from "./form.vue";
export default {
  install(Vue: VueConstructor) {
    Vue.component("ElFormGenerator", FormGenerator);
  }
};
