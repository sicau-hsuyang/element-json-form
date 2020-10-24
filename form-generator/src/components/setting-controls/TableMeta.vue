<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:10:04
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 00:38:21
-->

<script>
import BaseControl from "./BaseControl.vue";
import Component from "vue-class-component";
import { Inject } from "vue-property-decorator";
import { tableGetDataFragment } from "@/config";

@Component({
  name: "TableMeta"
})
export default class TableMeta extends BaseControl {
  @Inject("panel")
  panel;

  created() {
    this.setEventListener();
  }

  open() {
    if (this.panel) {
      this.panel.openMonacoDialog(
        String(this.activeData.config.getData) || tableGetDataFragment
      );
      this.panel.setAsCurrentUser(this);
    }
  }

  setEventListener() {
    this.panel &&
      this.$on("change", content => {
        this.activeData.config.getData = content;
      });
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        <el-divider>基本信息</el-divider>
        <el-form-item label="字段名">
          <el-input
            v-model={this.activeData.prop}
            placeholder="请输入字段名（v-model）"
          />
        </el-form-item>
        <el-divider>字段属性</el-divider>

        <el-divider>表格配置</el-divider>
        <el-form-item label="数据源">
          <el-select v-model={this.activeData.remote}>
            <el-option label="本地" value={false}></el-option>
            <el-option label="远程" value={true}></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label={!!this.activeData.remote ? "本地数据" : "远程数据"}
        >
          <el-input
            v-model={this.activeData.getData}
            on-focus={() => {
              this.open();
            }}
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-switch v-model={this.activeData.config.showIndex}></el-switch>
        </el-form-item>
        <el-form-item label="显示选择框">
          <el-switch v-model={this.activeData.config.selection}></el-switch>
        </el-form-item>
        <el-form-item label="显示分页">
          <el-switch v-model={this.activeData.config.pagination}></el-switch>
        </el-form-item>
      </el-form>
    );
  }
}
</script>
