<!--
 * @Author: JohnYang
 * @Date: 2020-10-27 20:50:15
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-27 21:24:54
-->
<script>
import Component from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";
import BaseControl from "./BaseControl.vue";
import { transformFragment } from "@/config";
@Component({
  name: "TextMeta"
})
export default class TextMeta extends BaseControl {
  @Prop({
    required: true,
    type: Object
  })
  activeData;

  @Inject("panel")
  panel;

  created() {
    this.subscribeEvent();
  }

  subscribeEvent() {
    this.$on("monaco-change", content => {
      this.activeData.transform = content;
    });
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        <el-form-item label="组件类型">
          <el-select
            v-model={this.activeData.tagIcon}
            placeholder="请选择组件类型"
            style={{ width: "100%" }}
            on-change={() => {
              this.tagChange();
            }}
          >
            {this.tagList.map(group => {
              return (
                <el-option-group key={group.label} label={group.label}>
                  {Object.values(group.options).map(item => {
                    return (
                      <el-option
                        key={item.label}
                        label={item.label}
                        value={item.tagIcon}
                      >
                        <svg-icon class="node-icon" icon-class={item.tagIcon} />
                        <span> {item.label}</span>
                      </el-option>
                    );
                  })}
                </el-option-group>
              );
            })}
          </el-select>
        </el-form-item>
        <el-form-item label="字段名">
          <el-input v-model={this.activeData.prop} placeholder="请输入字段名" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model={this.activeData.label} placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="组件样式">
          <form-control
            style={{ width: "100%" }}
            v-model={this.activeData.className}
            type="select"
            multiple
            filterable
            allow-create
          ></form-control>
        </el-form-item>
        <el-form-item label="表单栅格">
          <el-slider
            v-model={this.activeData.span}
            max={24}
            min={1}
            marks={{ 12: "" }}
          />
        </el-form-item>
        <el-form-item label="标签宽度">
          <el-input-number
            v-model={this.activeData.labelWidth}
            min={0}
            label="请输入标签宽度"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="转换规则">
          <el-input
            type="textarea"
            placeholder="请输入转化规则"
            on-focus={() => {
              this.handleFocus();
            }}
            v-model={this.activeData.transform}
          ></el-input>
        </el-form-item>
        {this.activeData.style && (
          <el-form-item label="组件宽度">
            <el-input
              v-model={this.activeData.style.width}
              placeholder="请输入组件宽度"
              clearable
            />
          </el-form-item>
        )}
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
      </el-form>
    );
  }

  handleFocus() {
    if (this.panel) {
      this.panel.openMonacoDialog(
        this.activeData.tranform || transformFragment
      );
      this.panel.setAsCurrentUser(this);
    }
  }
}
</script>
