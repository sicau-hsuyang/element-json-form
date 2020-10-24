<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 20:50:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 20:20:16
-->
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <ElementJsonForm v-bind="{ ...demo }" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ElementJsonForm from "@/components/ElementJsonForm/form.vue";
@Component({
  components: {
    ElementJsonForm
  }
})
export default class App extends Vue {
  demo = {
    props: {
      mobile: {
        label: "单行文本",
        labelWidth: 0,
        showLabel: true,
        tag: "el-input",
        type: "input",
        layout: "colFormItem",
        span: 24,
        rules: [],
        events: [
          {
            type: "change",
            handler: ""
          }
        ],
        slots: {
          prepend: "",
          append: ""
        },
        placeholder: "请输入手机号单行文本",
        style: {
          width: "100%"
        },
        clearable: true,
        prefixIcon: "el-icon-mobile",
        suffixIcon: "",
        maxlength: 11,
        showWordLimit: true,
        readonly: false,
        disabled: false
      },
      field107: {
        label: "单行带建议",
        labelWidth: 0,
        showLabel: true,
        tag: "el-autocomplete",
        layout: "colFormItem",
        span: 24,
        rules: [],
        events: [],
        slots: {
          prepend: "",
          append: ""
        },
        placeholder: "请输入单行带建议",
        style: {
          width: "100%"
        },
        clearable: true,
        prefixIcon: "",
        suffixIcon: "",
        maxlength: null,
        showWordLimit: true,
        readonly: false,
        disabled: false
      },
      field108: {
        label: "单行文本",
        labelWidth: 0,
        showLabel: true,
        tag: "el-input",
        type: "input",
        layout: "colFormItem",
        span: 24,
        rules: [],
        events: [],
        slots: {
          prepend: "",
          append: ""
        },
        placeholder: "请输入单行文本",
        style: {
          width: "100%"
        },
        clearable: true,
        prefixIcon: "",
        suffixIcon: "",
        maxlength: null,
        showWordLimit: true,
        readonly: false,
        disabled: false
      },
      field109: {
        label: "开关",
        tag: "el-switch",
        defaultValue: false,
        showLabel: true,
        labelWidth: 0,
        layout: "colFormItem",
        rules: [],
        events: [],
        style: {},
        disabled: false,
        activeText: "",
        inactiveText: "",
        activeColor: null,
        inactiveColor: null,
        activeValue: true,
        inactiveValue: false
      },
      row110: {
        layout: "rowFormItem",
        layoutTree: true,
        type: "default",
        justify: "start",
        align: "top",
        span: 24,
        componentName: "row110",
        children: [
          {
            label: "评分",
            tag: "el-rate",
            tagIcon: "rate",
            defaultValue: 0,
            span: 12,
            showLabel: true,
            labelWidth: 0,
            layout: "colFormItem",
            rules: [],
            events: [],
            document: "https://element.eleme.cn/#/zh-CN/component/rate",
            style: {},
            max: 5,
            allowHalf: false,
            showText: false,
            showScore: false,
            disabled: false,
            formId: 112,
            renderKey: "1121603280345020",
            prop: "field112"
          },
          {
            label: "颜色选择",
            tag: "el-color-picker",
            tagIcon: "color",
            span: 12,
            defaultValue: "#cccccc",
            showLabel: true,
            labelWidth: 0,
            layout: "colFormItem",
            rules: [],
            events: [],
            document: "https://element.eleme.cn/#/zh-CN/component/color-picker",
            showAlpha: false,
            colorFormat: "",
            disabled: false,
            size: "medium",
            formId: 111,
            renderKey: "1111603279668844",
            prop: "field111"
          }
        ]
      }
    },
    config: {
      formRef: "elForm",
      formModel: "formData",
      size: "medium",
      labelPosition: "right",
      labelWidth: 100,
      formRules: "rules",
      gutter: 15,
      disabled: false,
      span: 24,
      formBtns: true,
      unFocusedComponentBorder: true
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
