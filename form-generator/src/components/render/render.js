/*
 * @Author: JohnYang
 * @Date: 2020-10-14 22:25:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-19 14:11:41
 */
import { deepClone } from "@/utils/index";
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
    const conf = this.conf;
    var tag = conf.tag;
    var type = conf.type;
    if (['el-input', 'el-select', 'el-time-picker', 'el-date-picker'].includes(conf.tag)) {
      tag = 'form-control';
      if (conf.tag === 'el-select') {
        type = 'select';

      }

      if (conf.tag === 'el-time-picker') {
        type = 'time';
      }
    }

    if (conf.tag === 'el-radio-group') {
      tag = 'form-radio';
    }

    if (conf.tag === 'el-checkbox-group') {
      tag = 'form-check';
    }

    if (conf.tag === 'el-upload') {
      tag = 'form-upload';
    }

    return h(tag, {
      props: {
        ...conf,
        type,
        value: conf.defaultValue
      },
      style: {
        ...conf.style
      },
      attrs: {
        ...conf
      },
      on: {
        input: val => {
          this.$emit("input", val);
        }
      }
    });
  }
};
