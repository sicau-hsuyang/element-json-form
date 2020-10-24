<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 15:52:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 11:35:05
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "TextareaMeta"
})
export default class TextareaMeta extends BaseControl {
  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}

        {this.activeData.autosize && (
          <el-form-item label="最小行数">
            <el-input-number
              v-model={this.activeData.autosize.minRows}
              min={1}
              placeholder="最小行数"
            />
          </el-form-item>
        )}
        {this.activeData.autosize && (
          <el-form-item label="最大行数">
            <el-input-number
              v-model={this.activeData.autosize.maxRows}
              min={1}
              placeholder="最大行数"
            />
          </el-form-item>
        )}

        <el-form-item label="最多输入">
          <el-input
            v-model={this.activeData.maxlength}
            placeholder="请输入字符长度"
          >
            <template slot="append">个字符</template>
          </el-input>
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="输入统计">
          <el-switch v-model={this.activeData.showWordLimit} />
        </el-form-item>
        <el-form-item label="能否清空">
          <el-switch v-model={this.activeData.clearable} />
        </el-form-item>
        <el-form-item label="是否只读">
          <el-switch v-model={this.activeData.readonly} />
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
