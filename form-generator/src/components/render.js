/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 21:31:09
 */
import { deepClone, parseFunc } from "@/utils";
import FormRadio from "@/components/controls/FormRadio.vue";
import FormControl from "@/components/controls/FormControl.vue";
import FormCheck from "@/components/controls/FormCheck.vue";
import FormUpload from "@/components/controls/FormUpload.vue";

export default {
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  components: {
    FormControl,
    FormRadio,
    FormCheck,
    FormUpload
  },
  render(h) {
    const conf = deepClone(this.conf);
    var tag = conf.tag;
    var type = conf.type;
    var events = {};
    switch (tag) {
      case "el-input":
        tag = "form-control";
        break;
      case "el-select":
        type = "select";
        tag = "form-control";
        break;
      case "el-time-picker":
        tag = "form-control";
        type = "time";
        break;
      case "el-date-picker":
        type = "date";
        tag = "form-control";
        break;
      case "el-autocomplete":
        tag = "el-autocomplete";
        if (
          conf.fetchSuggestions &&
          typeof conf.fetchSuggestions === "string"
        ) {
          conf.fetchSuggestions = parseFunc(conf.fetchSuggestions);
        }
        break;
      case "el-radio-group":
        tag = "form-radio";
        break;
      case "el-checkbox-group":
        tag = "form-check";
        break;
      case "el-upload":
        tag = "form-upload";
        break;
    }
    const { style, className, ...rest } = conf;

    return h(tag, {
      props: {
        ...rest,
        type,
        value: conf.defaultValue
      },
      attrs: {
        ...rest
      },
      class: className,
      style: {
        ...style
      },
      on: {
        ...events,
        input: val => {
          this.$emit("input", val);
        }
      }
    });
  }
};
