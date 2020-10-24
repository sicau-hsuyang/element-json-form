<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:09:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 23:07:29
-->
<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";

@Component({
  name: "RateMeta"
})
export default class RateMeta extends BaseControl {
  rateTextChange(val) {
    if (val) this.activeData.showScore = false;
  }

  rateScoreChange(val) {
    if (val) this.activeData.showText = false;
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="最大值">
          <el-input-number v-model={this.activeData.max} placeholder="最大值" />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="允许半选">
          <el-switch v-model={this.activeData.allowHalf} />
        </el-form-item>
        <el-form-item label="辅助文字">
          <el-switch
            v-model={this.activeData.showText}
            on-change={() => {
              this.rateTextChange();
            }}
          />
        </el-form-item>
        <el-form-item label="显示分数">
          <el-switch
            v-model={this.activeData.showScore}
            on-change={() => {
              this.rateScoreChange();
            }}
          />
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
