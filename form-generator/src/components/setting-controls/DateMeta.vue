<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:09:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 10:38:10
-->
<template>
  <el-form size="small" label-width="90px">
    <el-divider>基本信息</el-divider>
    <el-form-item label="组件类型">
      <el-select
        v-model="activeData.tagIcon"
        placeholder="请选择组件类型"
        :style="{ width: '100%' }"
        @change="tagChange"
      >
        <el-option-group
          v-for="group in tagList"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.label"
            :label="item.label"
            :value="item.tagIcon"
          >
            <svg-icon class="node-icon" :icon-class="item.tagIcon" />
            <span> {{ item.label }}</span>
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item label="字段名">
      <el-input
        v-model="activeData.prop"
        placeholder="请输入字段名（v-model）"
      />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="activeData.label" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-slider
        v-model="activeData.span"
        :max="24"
        :min="1"
        :marks="{ 12: '' }"
      />
    </el-form-item>

    <el-form-item label="标签宽度">
      <el-input-number
        v-model.number="activeData.labelWidth"
        :min="0"
        label="请输入标签宽度"
      ></el-input-number>
    </el-form-item>
    <el-form-item v-if="activeData.style" label="组件宽度">
      <el-input
        v-model="activeData.style.width"
        placeholder="请输入组件宽度"
        clearable
      />
    </el-form-item>
    <el-form-item label="默认值">
      <el-input
        v-model.number="activeData.defaultValue"
        placeholder="请输入默认值"
      ></el-input>
    </el-form-item>
    <el-form-item label="时间类型">
      <el-select
        v-model="activeData.type"
        placeholder="请选择时间类型"
        :style="{ width: '100%' }"
        @change="dateTypeChange"
      >
        <el-option
          v-for="(item, index) in dateOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="时间格式">
      <el-input
        :value="activeData.format"
        placeholder="请输入时间格式"
        @input="setTimeValue($event)"
      />
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="activeData.showLabel" />
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="activeData.readonly" />
    </el-form-item>
    <el-form-item label="是否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <rules-control
      v-if="Array.isArray(activeData.rules)"
      :active-data="activeData"
    />
    <events-control
      v-if="Array.isArray(activeData.events)"
      :active-data="activeData"
    />
  </el-form>
</template>

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
}
</script>
