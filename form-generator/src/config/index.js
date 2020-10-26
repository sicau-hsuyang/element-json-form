/*
 * @Author: JohnYang
 * @Date: 2020-10-15 08:00:48
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 21:09:06
 */

export * from "./fragment";

const controlEventsMap = {
  "el-input": ["change", "clear", "blur"],
  "el-autocomplete": ["select", "change"],
  "el-input-number": ["change", "focus", "blur"],
  "el-slider": ["input", "change"],
  "el-radio-group": ["change"],
  "el-checkbox-group": ["change"],
  "el-switch": ["change"],
  "el-time-picker": ["change", "blur", "focus"],
  "el-date-picker": ["change", "blur", "focus"],
  "el-rate": ["change"],
  "el-color-picker": ["change", "active-change"]
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

export const asyncValidatorProvideTypes = [
  "string",
  "number",
  "boolean",
  "array"
].map(x => {
  return {
    label: x,
    value: x
  };
});

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

export const dateTimeFormat = {
  date: "yyyy-MM-dd",
  week: "yyyy 第 WW 周",
  month: "yyyy-MM",
  year: "yyyy",
  datetime: "yyyy-MM-dd HH:mm:ss",
  daterange: "yyyy-MM-dd",
  monthrange: "yyyy-MM",
  datetimerange: "yyyy-MM-dd HH:mm:ss"
};

export const defaultPropMapping = {
  label: "标题",
  showLabel: true,
  disabled: false,
  placeholder: "",
  span: 24,
  labelWidth: 0,
  style: {
    width: "100%"
  },
  defaultValue: ""
};
