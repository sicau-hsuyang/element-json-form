<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 20:02:43
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 23:27:33
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "SliderMeta"
})
export default class SliderMeta extends BaseControl {
  rangeChange(val) {
    this.$set(
      this.activeData,
      "defaultValue",
      val ? [this.activeData.min, this.activeData.max] : this.activeData.min
    );
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="最小值">
          <el-input-number v-model={this.activeData.min} placeholder="最小值" />
        </el-form-item>
        <el-form-item label="最大值">
          <el-input-number v-model={this.activeData.max} placeholder="最大值" />
        </el-form-item>
        <el-form-item label="步长">
          <el-input-number v-model={this.activeData.step} placeholder="步数" />
        </el-form-item>
        <el-form-item label="显示间断点">
          <el-switch v-model={this.activeData.showStops} />
        </el-form-item>
        <el-form-item label="范围选择">
          <el-switch
            v-model={this.activeData.range}
            on-change={() => {
              this.rangeChange();
            }}
          />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
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
