<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 14:33:47
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-27 21:55:03
-->
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { isNumberStr } from "@/utils/index";
import RulesControl from "./RulesControl.vue";
import EventsControl from "./EventsControl.vue";
import FormControl from "@/components/controls/FormControl.vue";
import {
  inputComponents,
  selectComponents,
  layoutComponents
} from "@/components/generator/config";
import { transformRules } from "@/components/decorators";
@Component({
  name: "BaseControl",
  components: {
    RulesControl,
    EventsControl,
    FormControl
  }
})
export default class BaseControl extends Vue {
  tagList = [
    {
      label: "输入型组件",
      options: inputComponents
    },
    {
      label: "选择型组件",
      options: selectComponents
    }
  ];

  @Prop({
    required: true,
    type: Object
  })
  activeData;

  setDefaultValue(val) {
    if (Array.isArray(val)) {
      return val.join(",");
    }
    // if (['string', 'number'].indexOf(typeof val) > -1) {
    //   return val
    // }
    if (typeof val === "boolean") {
      return `${val}`;
    }
    return val;
  }

  addValidateRule() {
    var newRule = defaultRule();
    this.activeData.rules.push(newRule);
  }

  tagChange(tagIcon) {
    var iComponents = Object.values(inputComponents);
    var sComponents = Object.values(selectComponents);
    let target = iComponents.find(item => item.tagIcon === tagIcon);
    if (!target) target = sComponents.find(item => item.tagIcon === tagIcon);
    this.$emit("tag-change", target);
  }

  onDefaultValueInput(str) {
    if (Array.isArray(this.activeData.defaultValue)) {
      // 数组
      this.$set(
        this.activeData,
        "defaultValue",
        str.split(",").map(val => (isNumberStr(val) ? +val : val))
      );
    } else if (["true", "false"].indexOf(str) > -1) {
      // 布尔
      this.$set(this.activeData, "defaultValue", JSON.parse(str));
    } else {
      // 字符串和数字
      this.$set(this.activeData, "defaultValue", isNumberStr(str) ? +str : str);
    }
  }

  createHeader(h, showPlaceholder = true) {
    var eles = [];
    eles.push(<el-divider>基本信息</el-divider>);
    eles.push(
      <el-form-item label="组件类型">
        <el-select
          v-model={this.activeData.tagIcon}
          placeholder="请选择组件类型"
          style={{ width: "100%" }}
          on-change={() => {
            this.tagChange();
          }}
        >
          {this.tagList.map(group => {
            return (
              <el-option-group key={group.label} label={group.label}>
                {Object.values(group.options).map(item => {
                  return (
                    <el-option
                      key={item.label}
                      label={item.label}
                      value={item.tagIcon}
                    >
                      <svg-icon class="node-icon" icon-class={item.tagIcon} />
                      <span> {item.label}</span>
                    </el-option>
                  );
                })}
              </el-option-group>
            );
          })}
        </el-select>
      </el-form-item>
    );
    eles.push(
      <el-form-item label="字段名">
        <el-input
          v-model={this.activeData.prop}
          placeholder="请输入字段名（v-model）"
        />
      </el-form-item>
    );
    eles.push(
      <el-form-item label="标题">
        <el-input v-model={this.activeData.label} placeholder="请输入标题" />
      </el-form-item>
    );
    showPlaceholder &&
      eles.push(
        <el-form-item label="占位提示">
          <el-input
            v-model={this.activeData.placeholder}
            placeholder="请输入占位提示"
          />
        </el-form-item>
      );
    eles.push(
      <el-form-item label="组件样式">
        <form-control
          style={{ width: "100%" }}
          v-model={this.activeData.className}
          type="select"
          multiple
          filterable
          allow-create
        ></form-control>
      </el-form-item>
    );
    eles.push(
      <el-form-item label="表单栅格">
        <el-slider
          v-model={this.activeData.span}
          max={24}
          min={1}
          marks={{ 12: "" }}
        />
      </el-form-item>
    );
    eles.push(
      <el-form-item label="标签宽度">
        <el-input-number
          v-model={this.activeData.labelWidth}
          min={0}
          label="请输入标签宽度"
        ></el-input-number>
      </el-form-item>
    );
    if (this.activeData.style) {
      eles.push(
        <el-form-item label="组件宽度">
          <el-input
            v-model={this.activeData.style.width}
            placeholder="请输入组件宽度"
            clearable
          />
        </el-form-item>
      );
    }
    eles.push(
      <el-form-item label="默认值">
        <el-input
          value={this.setDefaultValue(this.activeData.defaultValue)}
          placeholder="请输入默认值"
          on-input={() => {
            this.onDefaultValueInput();
          }}
        />
      </el-form-item>
    );
    eles.push(
      <el-form-item label="类型转换">
        <el-select
          v-model={this.activeData.transformRule}
          placeholder="请选择类型"
          style={{ width: "100%" }}
        >
          {transformRules.map(item => {
            return (
              <el-option
                key={item.label}
                label={item.label}
                value={item.value}
              ></el-option>
            );
          })}
        </el-select>
      </el-form-item>
    );
    return eles;
  }

  createFooter(h) {
    var eles = [];
    Array.isArray(this.activeData.rules) &&
      eles.push(<rules-control active-data={this.activeData} />);
    Array.isArray(this.activeData.events) &&
      eles.push(<events-control active-data={this.activeData} />);

    return eles;
  }
}
</script>
