/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 17:13:48
 */
export default [
  {
    label: "单行文本",
    prop: "mobile",
    labelWidth: null,
    showLabel: true,
    tag: "el-input",
    type: "text",
    tagIcon: "input",
    defaultValue: undefined,
    layout: "colFormItem",
    span: 24,
    document: "https://element.eleme.cn/#/zh-CN/component/input",
    // 校验规则
    rules: [],
    events: [
      {
        type: "change",
        handler: ""
      }
    ],
    // 组件的插槽属性
    slots: {
      prepend: "",
      append: ""
    },
    placeholder: "请输入手机号",
    style: { width: "100%" },
    clearable: true,
    prefixIcon: "el-icon-mobile",
    suffixIcon: "",
    maxlength: 11,
    showWordLimit: true,
    readonly: false,
    disabled: false
  }
];
