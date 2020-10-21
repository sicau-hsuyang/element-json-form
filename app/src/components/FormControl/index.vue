<!--
 * @Author: JohnYang
 * @Date: 2020-10-15 10:05:07
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 12:21:12
-->

<script lang="tsx">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import Input from "./Input.vue";
import BaseControl from "./BaseControl";

@Component({
  name: "FormControl",
  components: {
    Input
  }
})
export default class FormControl extends BaseControl {
  @Prop({
    type: String,
    required: true
  })
  tag!: string;

  render(h: CreateElement) {
    if (this.tag == "el-input") {
      return (
        <Input
          {...{
            props: this.$attrs,
            attrs: this.$attrs,
            on: {
              ...this.$listeners
            },
            scopedSlots: {
              ...this.$scopedSlots
            }
          }}
          v-model={this.content}
        />
      );
    }
  }
}
</script>
