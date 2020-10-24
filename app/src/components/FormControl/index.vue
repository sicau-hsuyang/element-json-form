<!--
 * @Author: JohnYang
 * @Date: 2020-10-15 10:05:07
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 20:21:48
-->

<script lang="tsx">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import BaseControl from "./BaseControl";

@Component({
  name: "FormControl"
})
export default class FormControl extends Vue {
  @Prop({
    required: true
  })
  value!: any;

  render(h: CreateElement) {
    var { tag, ...rest } = this.$attrs as any;
    return h(tag, {
      props: {
        ...rest,
        value: this.value
      },
      on: {
        ...this.$listeners,
        input: val => {
          this.$emit("input", val);
        }
      },
      scopedSlots: {
        ...this.$scopedSlots
      }
    });
  }
}
</script>
