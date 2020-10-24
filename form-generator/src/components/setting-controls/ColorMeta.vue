<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:09:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 22:42:22
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";

@Component({
  name: "ColorMeta"
})
export default class ColorMeta extends BaseControl {
  colorFormatOptions = [
    {
      label: "hex",
      value: "hex"
    },
    {
      label: "rgb",
      value: "rgb"
    },
    {
      label: "rgba",
      value: "rgba"
    },
    {
      label: "hsv",
      value: "hsv"
    },
    {
      label: "hsl",
      value: "hsl"
    }
  ];

  colorFormatChange(val) {
    this.activeData.defaultValue = null;
    this.activeData.showAlpha = val.indexOf("a") > -1;
    this.activeData.renderKey = +new Date(); // 更新renderKey,重新渲染该组件
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h, false)}
        <el-form-item label="颜色格式">
          <el-select
            v-model={this.activeData.colorFormat}
            placeholder="请选择颜色格式"
            style={{ width: "100%" }}
            clearable
            on-change={() => {
              this.colorFormatChange();
            }}
          >
            {this.colorFormatOptions.map((item, index) => {
              return (
                <el-option key={index} label={item.label} value={item.value} />
              );
            })}
          </el-select>
        </el-form-item>
        <el-form-item label="组件尺寸">
          <el-radio-group v-model={this.activeData.size}>
            <el-radio-button label="medium">中等</el-radio-button>
            <el-radio-button label="small">较小</el-radio-button>
            <el-radio-button label="mini">迷你</el-radio-button>
          </el-radio-group>
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
