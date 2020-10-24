<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 12:55:02
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 22:27:25
-->
<script>
import BaseControl from "@/components/setting-controls/BaseControl";
import Component from "vue-class-component";
import { Inject } from "vue-property-decorator";
import FormControl from "@/components/controls/FormControl.vue";
import { fetchSuggestionsFragment } from "@/config";
@Component({
  name: "AutoComplete",
  components: {
    FormControl
  }
})
export default class AutoCompleteMeta extends BaseControl {
  @Inject("panel")
  panel;

  open(icon) {
    this.panel.openIconsDialog(icon);
  }

  setEventListener() {
    this.panel &&
      this.$on("change", content => {
        this.activeData.fetchSuggestions = content;
      });
  }

  handleFocus() {
    this.panel.openMonacoDialog(fetchSuggestionsFragment);
    this.setEventListener();
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="占位提示">
          <el-input
            v-model={this.activeData.placeholder}
            placeholder="请输入占位提示"
          />
        </el-form-item>
        {this.activeData.slots && (
          <el-form-item label="插槽:prepend" label-width="100px">
            <el-input
              v-model={this.activeData.slots.prepend}
              placeholder="请输入前缀"
              type="textarea"
            />
          </el-form-item>
        )}
        {this.activeData.slots && (
          <el-form-item label="插槽:append" label-width="100px">
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
                this.open("prefixIcon");
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
                this.open("suffixIcon");
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
