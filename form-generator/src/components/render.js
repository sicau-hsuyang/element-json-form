/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 14:27:26
 */
import { deepClone } from '@/utils';
import FormRadio from '@/components/controls/FormRadio.vue';
import FormControl from "@/components/controls/FormControl.vue";
import FormCheck from '@/components/controls/FormCheck.vue';
import FormUpload from '@/components/controls/FormUpload.vue';

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

    switch (tag) {
      case 'el-input':
        tag = 'form-control';
        break;
      case 'el-select':
        type = 'select';
        tag = 'form-control';
        break;
      case 'el-time-picker':
        tag = 'form-control';
        type = 'time';
        break;
      case 'el-date-picker':
        type = 'date';
        tag = 'form-control';
        break;
      case 'el-autocomplete':
        tag = 'el-autocomplete';
        break;
      case 'el-radio-group':
        tag = 'form-radio';
        break;
      case 'el-checkbox-group':
        tag = 'form-check';
        break;
      case 'el-upload':
        tag = 'form-upload';
        break;
    }
    const { style, ...rest } = conf;
    return h(tag, {
      props: {
        ...rest,
        type,
        value: conf.defaultValue
      },
      attrs: {
        ...rest
      },
      style: {
        ...style
      },
      on: {
        input: val => {
          this.$emit("input", val);
        }
      }
    });
  }
};
