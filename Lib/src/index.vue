<!--
 * @Author: JohnYang
 * @Date: 2020-10-13 21:05:39
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 20:14:24
-->
<script lang="tsx">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop, Provide, Watch } from "vue-property-decorator";
import {
  IFormItem,
  IFormJson,
  IFormLayout,
  IFormModel,
  IValidatorRule,
  ValidatorRules
} from "./types";
import { Col, Row, Form, FormItem } from "element-ui";
@Component({
  name: "FormGenerator",
  components: {
    ElCol: Col,
    ElRow: Row,
    ElForm: Form,
    ElFormItem: FormItem
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
  layout!: IFormLayout;

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

  getInitValue(prop: string) {
    //以value为准
    if (typeof this.model[prop] !== "undefined") {
      return this.model[prop];
    } else if (typeof this.props[prop].defaultValue !== "undefined") {
      return this.props[prop].defaultValue;
    }
    return this.props[prop].multi ? [] : "";
  }

  setModel() {
    Object.keys(this.props).forEach(prop => {
      this.$set(this.model, prop, this.getInitValue(prop));
    });
  }

  setRules() {
    Object.keys(this.props).forEach(prop => {
      this.$set(this.rules, prop, this.props[prop].rules);
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

  buildFormItemProp() {
    this.setModel();
    this.setRules();
    this.coverRules();
  }

  /**
   * 将外界的rule转变为el-form-item 可以识别的rule
   */
  transformRule(rule: IValidatorRule) {
    if (typeof rule.validator === "function") {
      var validator = rule.validator;
      if (typeof validator === "string" && validator !== "") {
        validator = new Function(validator) as any;
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

  genFormControl(h: CreateElement, prop: string, item: IFormItem) {
    return (
      <form-control
        ref={prop}
        {...{
          attrs: {
            ...item
          },
          props: {
            ...item
          },
          on: {
            ...item.events
          }
        }}
        v-model={this.model[prop]}
        placeholder={(item.type == "select" ? "请选择" : "请输入") + item.label}
      ></form-control>
    );
  }

  render(h: CreateElement) {
    return (
      <el-form
        {...{
          attrs: this.$attrs,
          props: {
            ...this.$attrs,
            model: this.model,
            rules: this.rules
          },
          on: {
            ...this.$listeners
          }
        }}
      >
        <el-row gutter={this.layout.gutter}>
          {Object.entries(this.props).map(([prop, item]) => {
            return (
              <el-col key={prop} span={item.span || 12}>
                <el-form-item prop={prop} label={item.label} label-suffix="：">
                  {item.slot
                    ? typeof this.$scopedSlots[item.slot] === "function" &&
                      this.$scopedSlots[item.slot]({ model: this.model })
                    : this.genFormControl(h, prop, item)}
                </el-form-item>
              </el-col>
            );
          })}
        </el-row>
      </el-form>
    );
  }
}
</script>
