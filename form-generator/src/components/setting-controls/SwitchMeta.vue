<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 15:31:18
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 00:02:51
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";

@Component({
  name: "SwitchMeta"
})
export default class SwitchMeta extends BaseControl {
  onSwitchValueInput(val, name) {
    if (["true", "false"].indexOf(val) > -1) {
      this.$set(this.activeData, name, JSON.parse(val));
    } else {
      this.$set(this.activeData, name, isNumberStr(val) ? +val : val);
    }
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="开启提示">
          <el-input
            v-model={this.activeData.activeText}
            placeholder="请输入开启提示"
          />
        </el-form-item>
        <el-form-item label="关闭提示">
          <el-input
            v-model={this.activeData.inactiveText}
            placeholder="请输入关闭提示"
          />
        </el-form-item>
        <el-form-item label="开启值">
          <el-input
            value={this.setDefaultValue(activeData.activeValue)}
            placeholder="请输入开启值"
            on-input={() => {
              this.onSwitchValueInput($event, activeValue);
            }}
          />
        </el-form-item>
        <el-form-item label="关闭值">
          <el-input
            value={this.setDefaultValue(activeData.inactiveValue)}
            placeholder="请输入关闭值"
            on-input={() => {
              this.onSwitchValueInput($event, inactiveValue);
            }}
          />
        </el-form-item>
        <el-form-item label="开启颜色">
          <el-color-picker v-model={this.activeData.activeColor} />
        </el-form-item>
        <el-form-item label="关闭颜色">
          <el-color-picker v-model={this.activeData.inactiveColor} />
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
