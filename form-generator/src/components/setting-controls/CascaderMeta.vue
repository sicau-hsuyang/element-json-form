<!--
 * @Author: JohnYang
 * @Date: 2020-10-26 16:23:25
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 16:25:09
-->
<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "CascadeMeta"
})
export default class CascaderMeta extends BaseControl {
  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}

        {this.createFooter(h)}
      </el-form>
    );
  }
}
</script>
