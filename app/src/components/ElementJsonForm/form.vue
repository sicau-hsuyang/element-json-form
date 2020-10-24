<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 21:05:39
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 20:35:54
-->
<script lang="tsx">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop, Provide, Watch } from "vue-property-decorator";
import {
  IFormItem,
  IFormJson,
  IFormConfig,
  IFormModel,
  IValidatorRule,
  ValidatorRules
} from "../../types";
import { Col, Row, Form, FormItem } from "element-ui";
import FormControl from "@/components/FormControl/index.vue";
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

  model: IFormModel = {};

  created() {
    this.buildFormItemProp();
  }

  @Provide("form")
  get form() {
    return this;
  }

  @Watch("props")
  onPropsChange() {
    this.mergeValue();
    this.mergeRules();
    this.buildFormItemProp();
  }

  getInitValue(prop: string, item: any) {
    //以value为准
    if (typeof this.model[prop] !== "undefined") {
      return this.model[prop];
    } else if (
      this.props[prop] &&
      typeof this.props[prop].defaultValue !== "undefined"
    ) {
      return this.props[prop].defaultValue;
    } else if (item && typeof item.defaultValue !== "undefined") {
      return item.defaultValue;
    }
    return this.props[prop] && this.props[prop].multiple ? [] : "";
  }

  _setModel(arr) {
    if (!Array.isArray(arr)) {
      return;
    }
    arr.forEach((item: any) => {
      if (Array.isArray(item.children)) {
        this._setModel(item.children);
      } else {
        this.$set(this.model, item.prop, this.getInitValue(item.prop, item));
      }
    });
    console.log(this.model);
  }

  setModel() {
    this._setModel(
      Object.entries(this.props).map(([prop, item]) => {
        return {
          ...item,
          prop
        };
      })
    );
    // Object.keys(this.props).forEach((prop: any) => {
    //   if (Array.isArray(this.props[prop].children)) {
    //     //递归的设置 并且收集model
    //     this.temp(this.props[prop].children);
    //   } else {
    //     this.$set(this.model, prop, this.getInitValue(prop));
    //   }
    // });
  }

  _setRules() {}

  setRules() {
    // todo
    Object.keys(this.props).forEach(prop => {
      this.$set(this.rules, prop, this.props[prop].rules || []);
    });
  }

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
      var propRule = this.props[prop].rules;
      // 把attrs上的rule覆盖给item上的rule
      if (Array.isArray(rules)) {
        propRule = rules;
      } else if (typeof rules == "object") {
        Object.assign(propRule, rules);
      }
    });
  }

  parseFunc(str): Function {
    return new Function("return " + str)();
  }

  buildFormItemProp() {
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
    if (typeof rule.validator === "function") {
      var validator = rule.validator;

      if (typeof validator === "string" && validator !== "") {
        validator = this.parseFunc(validator);
      }
      rule.validator = (rule, value, callback) => {
        return validator(rule, value, callback, this.model);
      };
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
    Object.entries(this.props).forEach(([prop, item]) => {
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
              _this.$refs
            ]);
          };
        } else {
          events[eventName] = function() {
            return func.apply(_this, [
              _this.model[prop],
              _this.model,
              _this.$refs
            ]);
          };
        }
      });
      this.props[prop].events = events;
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
        {Object.entries(this.props).map(([prop, item]) => {
          var props: any = {};
          if (typeof this.model[prop] !== "undefined") {
            props.value = this.model[prop];
          }
          // console.log(this.model, props);
          return (
            <element-json-form-item
              {...{
                props: {
                  ...props
                },
                on: {
                  input: val => {
                    if (item.layout !== "rowFormItem") {
                      this.model[prop] = val;
                    }
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
