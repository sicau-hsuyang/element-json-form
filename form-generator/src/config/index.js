/*
 * @Author: JohnYang
 * @Date: 2020-10-15 08:00:48
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 12:42:02
 */

const controlEventsMap = {
  "el-input": ["change", "clear", "blur"]
};

export const validRuleOptions = [
  {
    label: "标准验证",
    value: 1
  },
  {
    label: "自定义验证",
    value: 0
  }
];

export const triggerOptions = ["blur", "change"].map(x => {
  return {
    label: x,
    value: x
  };
});

export const asyncValidatorProvideTypes = ["string", "number", "array"].map(
  x => {
    return {
      label: x,
      value: x
    };
  }
);

export const requiredOptions = [
  {
    label: "是",
    value: true
  },
  {
    label: "否",
    value: false
  }
];

export function standardControl(control) {
  return Object.assign(
    {
      label: "控件",
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      defaultValue: undefined,
      required: true,
      layout: "colFormItem",
      span: 24,
      document: "https://element.eleme.cn/#/zh-CN/component/input",
      // 正则校验规则
      rules: [],
      events: []
    },
    control
  );
}

export function defaultRule() {
  return {
    method: 1,
    required: true,
    pattern: "",
    message: "",
    type: "string",
    validator: ""
  };
}

export function getControlEvents(controlType) {
  var eventList = controlEventsMap[controlType] || [];
  return eventList.map(x => {
    return {
      label: x,
      value: x
    };
  });
}
