<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:09:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 22:46:24
-->

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";

@Component({
  name: "DateMeta"
})
export default class DateMeta extends BaseControl {
  dateTypeOptions = [
    {
      label: "日(date)",
      value: "date"
    },
    {
      label: "周(week)",
      value: "week"
    },
    {
      label: "月(month)",
      value: "month"
    },
    {
      label: "年(year)",
      value: "year"
    },
    {
      label: "日期时间(datetime)",
      value: "datetime"
    }
  ];

  get dateOptions() {
    if (!this.activeData) {
      return [];
    }
    if (this.activeData.type !== undefined) {
      if (this.activeData.startPlaceholder === undefined) {
        return this.dateTypeOptions;
      }
      return this.dateRangeTypeOptions;
    }
    return [];
  }

  dateTypeChange(val) {
    this.setTimeValue(dateTimeFormat[val], val);
  }

  setTimeValue(val, type) {
    const valueFormat = type === "week" ? dateTimeFormat.date : val;
    this.$set(this.activeData, "defaultValue", null);
    this.$set(this.activeData, "valueFormat", valueFormat);
    this.$set(this.activeData, "format", val);
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-form-item label="时间类型">
          <el-select
            v-model={this.activeData.type}
            placeholder="请选择时间类型"
            style={{ width: "100%" }}
            on-change={() => {
              this.dateTypeChange();
            }}
          >
            {this.dateOptions.map((item, index) => {
              return (
                <el-option key={index} label={item.label} value={item.value} />
              );
            })}
          </el-select>
        </el-form-item>
        <el-form-item label="时间格式">
          <el-input
            value={this.activeData.format}
            placeholder="请输入时间格式"
            on-input={$event => {
              this.setTimeValue($event);
            }}
          />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="是否只读">
          <el-switch v-model={this.activeData.readonly} />
        </el-form-item>
        <el-form-item label="是否清空">
          <el-switch v-model={this.activeData.clearable} />
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
