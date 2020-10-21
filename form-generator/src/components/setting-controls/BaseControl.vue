<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 14:33:47
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 15:15:21
-->
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { isNumberStr } from "@/utils/index";
import RulesControl from "./RulesControl.vue";
import EventsControl from "./EventsControl.vue";
import {
  inputComponents,
  selectComponents,
  layoutComponents
} from "@/components/generator/config";
@Component({
  name: "BaseControl",
  components: {
    RulesControl,
    EventsControl
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

  spanChange(val) {
    this.activeData.span = val;
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
}
</script>
