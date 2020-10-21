<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 20:50:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 20:13:59
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <ElementJsonForm :props="props" :layout="layout" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ElementJsonForm from "@/components/ElementJsonForm/index.vue";
@Component({
  components: {
    ElementJsonForm
  }
})
export default class App extends Vue {
  props: any = {
    userName: {
      label: "用户名",
      tag: "el-input",
      type: "input",
      rules: [
        {
          required: true,
          trigger: ["change", "blur"],
          validator: `function(rule, value, callback, model) {
            if (value !== model.password) {
              callback(new Error("用户名和密码不一致"));
            } else {
              callback();
            }
          }`
        }
      ],
      events: {
        change: `function change(val, model, controlRefs) {
          this.model.password = "yangxu";
          console.log(this.model);
        }`
      }
    },
    password: {
      label: "密码",
      tag: "el-input",
      type: "input",
      defaultValue: "1234"
    }
  };

  layout = {
    gutter: 20,
    labelWidth: "150px"
  };
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
