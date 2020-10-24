<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 20:21:40
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 11:36:58
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "TimeMeta"
})
export default class TimeMeta extends BaseControl {
  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="时间格式">
          <el-input
            value={this.activeData.format}
            placeholder="请输入时间格式"
          />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="显示清空">
          <el-switch v-model={this.activeData.clearable} />
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch v-model={this.activeData.disabled} />
        </el-form-item>
        {this.createFooter(h)}
      </el-form>
    );
  }
}
</script>
