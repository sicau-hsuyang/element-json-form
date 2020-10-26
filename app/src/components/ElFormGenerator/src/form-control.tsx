/*
 * @Author: JohnYang
 * @Date: 2020-10-24 17:37:30
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 21:07:56
 */

import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";

@Component({
  name: "FormControl"
})
export default class FormControl extends Vue {

  @Inject("form")
  form!: any;

  @Prop({
    required: true
  })
  value!: any;

  mounted() {
    this.$emit("create", {
      prop: this.$attrs.prop,
      value: this.$refs[this.$attrs.prop]
    });
    this.initControl();
  }

  reload() {
    return this.initControl();
  }

  initControl() {
    var { getDataList, prop } = this.$attrs as any;
    if (typeof getDataList === 'function') {
     return getDataList(this.form.model[prop], this.form.model);
    }
    return Promise.resolve(this.form.model);
  }

  render(h: CreateElement) {
    var { tag, style, ...rest } = this.$attrs as any;
    return h(tag, {
      props: {
        ...rest,
        value: this.value
      },
      attrs: {
        ...rest
      },
      ref: rest.prop,
      on: {
        ...this.$listeners,
        input: (val: any) => {
          this.$emit("input", val);
        }
      },
      scopedSlots: {
        ...this.$scopedSlots
      }
    });
  }
}
