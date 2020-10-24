<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 12:55:02
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 16:56:15
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

  currentKey = "";

  open(icon) {
    this.panel.openIconsDialog(icon);
  }

  created() {
    this.setEventListener();
  }

  setEventListener() {
    this.panel &&
      this.$on("monaco-change", content => {
        if (this.currentKey === "fetchSuggestions") {
          this.activeData[this.currentKey] = content;
        } else {
          this.activeData.slots[this.currentKey] = content;
        }
      });
  }

  setInit() {
    var content = "";
    if (this.currentKey === "fetchSuggestions") {
      content = this.activeData[this.currentKey];
    } else {
      content = this.activeData.slots[this.currentKey];
    }
    return String(content);
  }

  handleFocus(prop) {
    this.currentKey = prop;
    if (this.panel) {
      this.panel.openMonacoDialog(this.setInit() || fetchSuggestionsFragment);
      this.panel.setAsCurrentUser(this);
    }
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="fetchSuggestions" label-width="120px">
          <el-input
            value={
              typeof this.activeData.fetchSuggestions == "string"
                ? this.activeData.fetchSuggestions
                : String(this.activeData.fetchSuggestions)
            }
            placeholder="请输入fetchSuggestions"
            on-focus={() => {
              this.handleFocus("fetchSuggestions");
            }}
            type="textarea"
          />
        </el-form-item>
        {this.activeData.slots && (
          <el-form-item label="插槽:prepend" label-width="100px">
            <el-input
              v-model={this.activeData.slots.prepend}
              placeholder="请输入前缀"
              type="textarea"
              on-focus={() => {
                this.handleFocus("prepend");
              }}
            />
          </el-form-item>
        )}
        {this.activeData.slots && (
          <el-form-item label="插槽:append" label-width="100px">
            <el-input
              v-model={this.activeData.slots.append}
              placeholder="请输入后缀"
              type="textarea"
              on-focus={() => {
                this.handleFocus("append");
              }}
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
