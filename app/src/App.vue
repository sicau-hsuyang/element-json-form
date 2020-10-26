<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 20:50:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 21:09:03
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <el-form-generator :config="demo.config" :props="demo.props" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {
  demo = {
    props: {
      province: {
        label: "省",
        showLabel: true,
        labelWidth: 0,
        tag: "el-select",
        layout: "colFormItem",
        span: 24,
        options: [],
        getDataList: "",
        rules: [],
        events: {},
        placeholder: "请选择",
        style: {
          width: "100%"
        },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false,
        remote: false,
        className: []
      },
      city: {
        label: "市",
        showLabel: true,
        labelWidth: 0,
        tag: "el-select",
        layout: "colFormItem",
        span: 24,
        options: [],
        getDataList: function() {
          console.log("fetch city");
        },
        rules: [],
        events: {
          change() {
            console.log("city");
          }
        },
        placeholder: "请选择",
        style: {
          width: "100%"
        },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false,
        className: []
      },
      country: {
        label: "县",
        showLabel: true,
        labelWidth: 0,
        tag: "el-select",
        layout: "colFormItem",
        span: 24,
        options: [],
        getDataList: "",
        rules: [],
        events: {},
        placeholder: "请选择",
        style: {
          width: "100%"
        },
        clearable: true,
        disabled: false,
        filterable: false,
        multiple: false,
        remote: false
      },
      password: {
        label: "密码",
        showLabel: true,
        labelWidth: 0,
        tag: "el-input",
        type: "password",
        layout: "colFormItem",
        span: 24,
        rules: [
          {
            method: 1,
            required: true,
            pattern: "",
            message: "请输入密码",
            type: "string",
            validator: "",
            trigger: ["blur", "change"]
          }
        ],
        events: {
          change: function eventHandler(propValue, model, controlRefs) {
            console.log(1);
          }
        },
        slots: {
          prepend: "",
          append: ""
        },
        placeholder: "请输入密码",
        showPassword: true,
        style: {
          width: "100%"
        },
        clearable: true,
        prefixIcon: "",
        suffixIcon: "",
        maxlength: null,
        showWordLimit: false,
        readonly: false,
        disabled: false,
        className: []
      },
      repassword: {
        label: "重复密码",
        showLabel: true,
        labelWidth: 0,
        tag: "el-input",
        type: "password",
        layout: "colFormItem",
        span: 24,
        rules: [
          {
            method: 1,
            required: true,
            pattern: "",
            message: "请再次输入密码",
            type: "string",
            validator: "",
            trigger: ["blur", "change"]
          },
          {
            method: 0,
            required: true,
            pattern: "",
            message: "",
            type: "string",
            validator:
              '/**\n * 自定义验证器方法\n * @param {*} rule 当前规则\n * @param {any} value 当前字段对应的值\n * @param {Function} callback 验证的回调函数\n * @param {Object} model 当前form的模型\n */\nfunction validator(rule, value, callback, model) {\n    if(model.password !== value) {\n       return callback(new Error("两次密码输入不一致"));\n    }\n    callback();\n}',
            trigger: ["blur", "change"]
          }
        ],
        events: {
          change: function eventHandler(propValue, model, controlRefs) {
            console.log(propValue, model, controlRefs);
            console.log(controlRefs.city.$emit("change"));
            model.password = "yangxuxuxuxuxxu";
          }
        },
        slots: {
          prepend: "",
          append: ""
        },
        placeholder: "请再次输入密码",
        showPassword: true,
        style: {
          width: "100%"
        },
        clearable: true,
        prefixIcon: "",
        suffixIcon: "",
        maxlength: null,
        showWordLimit: false,
        readonly: false,
        disabled: false,
        className: []
      }
    },
    config: {
      formRef: "elForm",
      size: "medium",
      labelPosition: "right",
      labelWidth: 100,
      gutter: 15,
      disabled: false,
      span: 24,
      created: "",
      mounted: "",
      beforeDestroy: "",
      formBtns: true
    }
  };

  // props: any = {
  //   userName: {
  //     label: "用户名",
  //     tag: "el-input",
  //     type: "input",
  //     defaultValue: "yangxu",
  //     rules: [
  //       {
  //         required: true,
  //         trigger: ["change", "blur"],
  //         validator: `function(rule, value, callback, model) {
  //           if (value !== model.password) {
  //             callback(new Error("用户名和密码不一致"));
  //           } else {
  //             callback();
  //           }
  //         }`
  //       }
  //     ],
  //     events: {
  //       change: `function change(val, model, controlRefs) {
  //         this.model.password = "yangxu";
  //         console.log(this.model);
  //       }`
  //     }
  //   },
  //   password: {
  //     label: "密码",
  //     tag: "el-input",
  //     type: "input",
  //     defaultValue: "1234"
  //   }
  // };

  // layout = {
  //   gutter: 20,
  //   labelWidth: "150px"
  // };
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
