<!--
 * @Author: JohnYang
 * @Date: 2020-10-21 14:20:58
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 11:44:16
-->
<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "TinymceMeta"
})
export default class TinymceMeta extends BaseControl {
  changeRenderKey() {
    this.activeData.renderKey = +new Date();
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h, false)}
        <el-form-item label="组件高度">
          <el-input-number
            value={this.activeData.height}
            placeholder="高度"
            on-input={val => {
              this.activeData.height = val;
              this.changeRenderKey();
            }}
          />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="品牌烙印">
          <el-switch
            value={this.activeData.branding}
            on-input={val => {
              this.activeData.branding = val;
              this.changeRenderKey();
            }}
          />
        </el-form-item>
      </el-form>
    );
  }
}
</script>
