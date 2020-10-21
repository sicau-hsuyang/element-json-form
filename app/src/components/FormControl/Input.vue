<!--
 * @Author: JohnYang
 * @Date: 2020-10-15 09:38:29
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 12:21:27
-->
<script lang="tsx">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ComboControl from "../ComboControl/index.vue";
import BaseControl from "./BaseControl";

@Component({
  name: "Input",
  components: {
    ComboControl
  }
})
export default class Input extends BaseControl {
  @Prop({
    type: String,
    required: true
  })
  type!: string;

  render(h: CreateElement) {
    return (
      <div>
        <el-input
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
      </div>
    );
  }
}
</script>
