<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 12:55:02
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 22:59:36
-->

<script>
import Component from "vue-class-component";
import { Inject } from "vue-property-decorator";
import BaseControl from "./BaseControl.vue";

@Component({
  name: "PasswordMeta"
})
export default class PasswordMeta extends BaseControl {
  @Inject("panel")
  panel;

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        {this.activeData.slots && (
          <el-form-item label="插槽:prepend">
            <el-input
              v-model={this.activeData.slots.prepend}
              placeholder="请输入前缀"
              type="textarea"
            />
          </el-form-item>
        )}
        {this.activeData.slots && (
          <el-form-item label="插槽:append">
            <el-input
              v-model={this.activeData.slots.append}
              placeholder="请输入后缀"
              type="textarea"
            />
          </el-form-item>
        )}
        <el-form-item label="前图标">
          <el-input
            v-model={this.activeData.prefixIcon}
            placeholder="请输入前图标名称"
          >
            <el-button
              slot="append"
              icon="el-icon-thumb"
              on-click={() => {
                this.panel.openIconsDialog("prefixIcon");
              }}
            >
              选择
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="后图标">
          <el-input
            v-model={this.activeData.suffixIcon}
            placeholder="请输入后图标名称"
          >
            <el-button
              slot="append"
              icon="el-icon-thumb"
              on-click={() => {
                this.panel.openIconsDialog("suffixIcon");
              }}
            >
              选择
            </el-button>
          </el-input>
        </el-form-item>
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
        <el-form-item label="显示密码">
          <el-switch v-model={this.activeData.showPassword} />
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
