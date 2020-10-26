/*
 * @Author: JohnYang
 * @Date: 2020-10-24 17:37:30
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 17:38:11
 */

import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "FormControl"
})
export default class FormControl extends Vue {
  @Prop({
    required: true
  })
  value!: any;

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
