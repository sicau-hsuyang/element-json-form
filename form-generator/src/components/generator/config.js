import { fetchSuggestionsFragment } from "@/config";
// 表单属性【右面板】
export const formConf = {
  formRef: "elForm",
  size: "medium",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
};

export const dataComponents = {
  table: {
    columns: {
      field1: {
        label: "列1"
      },
      field2: {
        label: "列2"
      }
    },
    label: "表格",
    prop: "table",
    tag: "form-table",
    remote: true,
    showLabel: true,
    tagIcon: "table",
    layout: "colFormItem",
    config: {
      selection: true,
      showIndex: true,
      getData: []
    }
  }
};

// 输入型组件 【左面板】
export const inputComponents = {
  input: {
    label: "单行文本",
    labelWidth: null,
    showLabel: true,
    tag: "el-input",
    tagIcon: "input",
    type: "text",
    defaultValue: undefined,
    layout: "colFormItem",
    span: 24,
    document: "https://element.eleme.cn/#/zh-CN/component/input",
    rules: [],
    events: [],
    slots: {
      prepend: "",
      append: ""
    },
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    prefixIcon: "",
    suffixIcon: "",
    maxlength: null,
    showWordLimit: true,
    readonly: false,
    disabled: false
  },
  autocomplete: {
    label: "单行带建议",
    labelWidth: null,
    showLabel: true,
    tag: "el-autocomplete",
    tagIcon: "autocomplete",
    defaultValue: undefined,
    layout: "colFormItem",
    span: 24,
    document: "https://element.eleme.cn/#/zh-CN/component/input",
    rules: [],
    events: [],
    slots: {
      prepend: "",
      append: ""
    },
    placeholder: "请输入",
    style: { width: "100%" },
    fetchSuggestions: fetchSuggestionsFragment,
    clearable: true,
    prefixIcon: "",
    suffixIcon: "",
    maxlength: null,
    showWordLimit: true,
    readonly: false,
    disabled: false
  },
  textarea: {
    label: "多行文本",
    labelWidth: null,
    showLabel: true,
    tag: "el-input",
    tagIcon: "textarea",
    type: "textarea",
    defaultValue: undefined,
    layout: "colFormItem",
    span: 24,
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/input",
    placeholder: "请输入",
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: "100%" },
    maxlength: null,
    showWordLimit: false,
    readonly: false,
    disabled: false
  },
  password: {
    label: "密码",
    showLabel: true,
    labelWidth: null,
    tag: "el-input",
    tagIcon: "password",
    type: "password",
    defaultValue: undefined,
    layout: "colFormItem",
    span: 24,
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/input",
    slots: {
      prepend: "",
      append: ""
    },
    placeholder: "请输入",
    showPassword: true,
    style: { width: "100%" },
    clearable: true,
    prefixIcon: "",
    suffixIcon: "",
    maxlength: null,
    showWordLimit: false,
    readonly: false,
    disabled: false
  },
  counter: {
    label: "计数器",
    showLabel: true,
    labelWidth: null,
    tag: "el-input-number",
    tagIcon: "number",
    defaultValue: undefined,
    span: 24,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/input-number",
    placeholder: "",
    min: undefined,
    max: undefined,
    step: 1,
    stepStrictly: false,
    precision: undefined,
    controlsPosition: "",
    disabled: false
  },
  tinymce: {
    label: "编辑器",
    showLabel: true,
    labelWidth: null,
    tag: "tinymce",
    tagIcon: "rich-text",
    defaultValue: null,
    span: 24,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "http://tinymce.ax-z.cn",
    placeholder: "请输入",
    height: 300, // 编辑器高度
    branding: false // 隐藏右下角品牌烙印
  }
};

// 选择型组件 【左面板】
export const selectComponents = {
  select: {
    label: "下拉选择",
    showLabel: true,
    labelWidth: null,
    tag: "el-select",
    tagIcon: "select",
    layout: "colFormItem",
    span: 24,
    options: [],
    getOptions: "",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/select",
    placeholder: "请选择",
    style: { width: "100%" },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false,
    remote: false
  },
  radio: {
    label: "单选框组",
    labelWidth: null,
    showLabel: true,
    tag: "el-radio-group",
    tagIcon: "radio",
    defaultValue: 1,
    layout: "colFormItem",
    span: 24,
    optionType: "default",
    rules: [],
    events: [],
    border: false,
    document: "https://element.eleme.cn/#/zh-CN/component/radio",
    options: [
      {
        label: "选项一",
        value: 1
      },
      {
        label: "选项二",
        value: 2
      }
    ],
    style: {},
    size: "medium",
    disabled: false
  },
  checkbox: {
    label: "多选框组",
    tag: "el-checkbox-group",
    tagIcon: "checkbox",
    defaultValue: [],
    span: 24,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    optionType: "default",
    rules: [],
    events: [],
    border: false,
    document: "https://element.eleme.cn/#/zh-CN/component/checkbox",
    options: [
      {
        label: "选项一",
        value: 1
      },
      {
        label: "选项二",
        value: 2
      }
    ],
    style: {},
    size: "medium",
    min: null,
    max: null,
    disabled: false
  },
  switch: {
    label: "开关",
    tag: "el-switch",
    tagIcon: "switch",
    defaultValue: false,
    span: 24,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/switch",
    style: {},
    disabled: false,
    activeText: "",
    inactiveText: "",
    activeColor: null,
    inactiveColor: null,
    activeValue: true,
    inactiveValue: false
  },
  slider: {
    label: "滑块",
    tag: "el-slider",
    tagIcon: "slider",
    defaultValue: null,
    span: 24,
    showLabel: true,
    layout: "colFormItem",
    labelWidth: null,
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/slider",
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    showStops: false,
    range: false
  },
  "time-picker": {
    label: "时间选择",
    tag: "el-time-picker",
    type: "time",
    tagIcon: "time",
    defaultValue: null,
    span: 24,
    showLabel: true,
    layout: "colFormItem",
    labelWidth: null,
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/time-picker",
    placeholder: "请选择",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    pickerOptions: {
      selectableRange: "00:00:00-23:59:59"
    },
    format: "HH:mm:ss",
    disabled: false,
    clearable: true,
    format: "HH:mm:ss",
    valueFormat: "HH:mm:ss"
  },
  timerange: {
    label: "时间范围",
    isRange: true,
    tag: "el-time-picker",
    type: "timerange",
    tagIcon: "time-range",
    span: 24,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    defaultValue: null,
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/time-picker",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    isRange: true,
    rangeSeparator: "至",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
    format: "HH:mm:ss",
    valueFormat: "HH:mm:ss"
  },
  "date-picker": {
    label: "日期选择",
    tag: "el-date-picker",
    tagIcon: "date",
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    span: 24,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/date-picker",
    placeholder: "请选择",
    type: "date",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    readonly: false
  },
  daterange: {
    label: "日期范围",
    tag: "el-date-picker",
    tagIcon: "date-range",
    defaultValue: null,
    span: 24,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/date-picker",
    style: { width: "100%" },
    type: "daterange",
    rangeSeparator: "至",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    disabled: false,
    clearable: true,
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    readonly: false
  },
  rate: {
    label: "评分",
    tag: "el-rate",
    tagIcon: "rate",
    defaultValue: 0,
    span: 24,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/rate",
    style: {},
    max: 5,
    allowHalf: false,
    showText: false,
    showScore: false,
    disabled: false
  },
  "color-picker": {
    label: "颜色选择",
    tag: "el-color-picker",
    tagIcon: "color",
    span: 24,
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    layout: "colFormItem",
    rules: [],
    events: [],
    document: "https://element.eleme.cn/#/zh-CN/component/color-picker",
    showAlpha: false,
    colorFormat: "",
    disabled: false,
    size: "medium"
  },
  upload: {
    label: "上传",
    tag: "el-upload",
    tagIcon: "upload",
    layout: "colFormItem",
    defaultValue: null,
    showLabel: true,
    labelWidth: null,
    span: 24,
    showTip: false,
    buttonText: "点击上传",
    rules: [],
    events: [],
    fileSize: 2,
    sizeUnit: "MB",
    document: "https://element.eleme.cn/#/zh-CN/component/upload",
    slots: {
      "list-type": true
    },
    action: "https://jsonplaceholder.typicode.com/posts/",
    disabled: false,
    accept: "",
    name: "file",
    "auto-upload": true,
    "list-type": "text",
    multiple: false
  }
};

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    layout: "rowFormItem",
    tagIcon: "row",
    label: "行容器",
    layoutTree: true,
    document:
      "https://element.eleme.cn/#/zh-CN/component/layout#row-attributes",
    type: "default",
    justify: "start",
    align: "top"
  },
  {
    label: "按钮",
    showLabel: true,
    labelWidth: null,
    tag: "el-button",
    tagIcon: "button",
    span: 24,
    layout: "colFormItem",
    document: "https://element.eleme.cn/#/zh-CN/component/button",
    slots: {
      default: "主要按钮"
    },
    type: "primary",
    icon: "el-icon-search",
    round: false,
    size: "medium",
    plain: false,
    circle: false,
    disabled: false
  }
];
