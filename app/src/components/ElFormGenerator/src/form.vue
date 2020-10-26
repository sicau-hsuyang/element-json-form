<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 21:05:39
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 20:31:33
-->
<script lang="tsx">
import Vue, { CreateElement, Component as VueComponent } from "vue";
import Component from "vue-class-component";
import { Prop, Provide, Watch } from "vue-property-decorator";
import {
  IFormItem,
  IFormJson,
  IFormConfig,
  IFormModel,
  IValidatorRule,
  ValidatorRules
} from "../types";
import { Col, Row, Form, FormItem } from "element-ui";
import FormControl from "./form-control";
import { default as ElementJsonFormItem } from "./form-item.vue";

@Component({
  name: "FormGenerator",
  components: {
    ElCol: Col,
    ElRow: Row,
    ElForm: Form,
    ElFormItem: FormItem,
    ElementJsonFormItem,
    FormControl
  }
})
export default class FormGenerator extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  props!: IFormJson;

  @Prop({
    required: false,
    default: () => {
      return {};
    }
  })
  value!: IFormModel;

  @Prop({
    type: Object,
    required: false
  })
  config!: IFormConfig;

  rules: {
    [prop: string]: IValidatorRule | IValidatorRule[];
  } = {};

  @Provide("model")
  model: IFormModel = {};

  instances: {
    [prop: string]: VueComponent;
  } = {};

  selfProps: IFormJson = {};

  created() {
    this.buildFormItem();
    // this.$watch("model", console.log, {
    //   deep: true
    // });
  }

  @Provide("form")
  get form() {
    return this;
  }

  @Watch("props")
  onPropsChange() {
    this.transformProps();
    this.mergeValue();
    this.mergeRules();
    this.buildFormItem();
  }

  /**
   * 递归的转化props
   */
  mergeProps(propValues) {
    propValues.forEach(item => {
      if (Array.isArray(item.children)) {
        this.mergeProps(item.children);
      } else {
        this.$set(this.selfProps, item.prop, item);
      }
    });
  }

  /**
   * 将props转化成内部的props并且维护起来
   */
  transformProps() {
    this.mergeProps(
      Object.entries(this.props).map(([prop, value]) => {
        return {
          ...value,
          prop
        };
      })
    );
  }

  getInitValue(prop: string, item: any) {
    //以value为准
    if (typeof this.model[prop] !== "undefined") {
      return this.model[prop];
    } else if (
      this.selfProps[prop] &&
      typeof this.selfProps[prop].defaultValue !== "undefined"
    ) {
      return this.selfProps[prop].defaultValue;
    } else if (item && typeof item.defaultValue !== "undefined") {
      return item.defaultValue;
    }
    return this.selfProps[prop] && this.selfProps[prop].multiple ? [] : "";
  }

  _setModel(modelsValue) {
    modelsValue.forEach((item: any) => {
      if (Array.isArray(item.children)) {
        this._setModel(item.children);
      } else {
        this.$set(this.model, item.prop, this.getInitValue(item.prop, item));
      }
    });
  }

  setModel() {
    this._setModel(
      Object.entries(this.selfProps).map(([prop, item]) => {
        return {
          ...item,
          prop
        };
      })
    );
  }

  _setRules(propsValue) {
    propsValue.forEach(value => {
      if (Array.isArray(value.children)) {
        this._setRules(value.children);
      } else {
        this.$set(
          this.rules,
          value.prop,
          this.selfProps[value.prop].rules || []
        );
      }
    });
  }

  setRules() {
    this._setRules(
      Object.entries(this.selfProps).map(([prop, value]) => {
        return {
          prop,
          ...value
        };
      })
    );
    this.coverRules();
  }

  /**
   * 合并value，以value的初始值为准
   */
  mergeValue() {
    Object.entries(this.value).forEach(([prop, value]) => {
      this.$set(this.model, prop, value);
    });
  }

  mergeRules() {
    var rules: {
      [prop: string]: ValidatorRules;
    } = this.$attrs.rules as any;
    if (!rules) {
      return;
    }
    Object.entries(rules).forEach(([prop, rules]) => {
      var propRule = this.selfProps[prop].rules;
      // 把attrs上的rule覆盖给item上的rule
      if (Array.isArray(rules)) {
        propRule = rules;
      }
      // 如果两者都是对象的话
      else if (typeof rules == "object" && !Array.isArray(propRule)) {
        Object.assign(propRule, rules);
      }
    });
  }

  removeComment(str) {
    return str
      .replace(/\/\/\[\w\W]*(?<=\n)/g, "")
      .replace(/\/\*[\w\W]*\*\//g, "")
      .replace(/^\n/, "");
  }

  parseFunc(str): Function {
    var func;
    try {
      func = new Function("return " + this.removeComment(str))();
    } catch (exp) {
      console.error(exp);
      func = function() {
        console.warn(str);
      };
    }
    return func;
  }

  buildFormItem() {
    this.transformProps();
    this.mergeValue();
    this.setModel();
    this.setRules();
    this.coverRules();
    this.coverEvents();
  }

  /**
   * 将外界的rule转变为el-form-item 可以识别的rule
   */
  transformRule(rule: IValidatorRule) {
    if (typeof rule.validator !== "undefined") {
      //转化函数
      var validator: any = rule.validator;
      if (typeof validator === "string" && validator !== "") {
        validator = this.parseFunc(validator);
      }
      //转化api
      if (typeof validator === "function") {
        rule.validator = (rule, value, callback) => {
          return validator(rule, value, callback, this.model);
        };
      }
    }
  }

  coverRules() {
    Object.entries(this.rules).forEach(([prop, rule]) => {
      if (Array.isArray(rule)) {
        rule.forEach(item => {
          this.transformRule(item);
        });
      } else {
        this.transformRule(rule);
      }
    });
  }

  /**
   * 从后台读取的内容 进行反序列化
   */
  coverEvents() {
    var _this = this;
    Object.entries(this.selfProps).forEach(([prop, item]) => {
      if (!item.events) {
        return;
      }
      var events: {
        [prop: string]: Function;
      } = {};
      Object.entries(item.events).forEach(([eventName, func]) => {
        if (typeof func === "string") {
          var newFunc: Function = this.parseFunc(func);
          events[eventName] = function() {
            return newFunc.apply(_this, [
              _this.model[prop],
              _this.model,
              _this.instances
            ]);
          };
        } else {
          events[eventName] = function() {
            return func.apply(_this, [
              _this.model[prop],
              _this.model,
              _this.instances
            ]);
          };
        }
      });
      this.selfProps[prop].events = events;
    });
  }

  render(h: CreateElement) {
    //渲染的先后顺序的问题
    var { labelWidth } = this.config as any;
    return (
      <el-form
        {...{
          attrs: this.$attrs,
          props: {
            ...this.$attrs,
            ...this.config,
            labelWidth: labelWidth ? `${labelWidth}px` : null,
            model: this.model,
            rules: this.rules
          },
          on: {
            ...this.$listeners
          }
        }}
      >
        {Object.entries(this.selfProps).map(([prop, item]) => {
          var props: any = {};
          if (typeof this.model[prop] !== "undefined") {
            props.value = this.model[prop];
          }

          return (
            <element-json-form-item
              {...{
                props: {
                  ...props
                },
                on: {
                  input: (val: any) => {
                    if (item.layout !== "rowFormItem") {
                      this.model[prop] = val;
                    }
                  },
                  create: ins => {
                    this.instances[ins.prop] = ins.value;
                  }
                }
              }}
              key={prop}
              item={{ ...item, prop }}
            />
          );
        })}
      </el-form>
    );
  }
}
</script>
