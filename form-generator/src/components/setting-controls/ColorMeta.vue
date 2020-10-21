<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 22:09:00
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-20 11:24:36
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
    <el-form-item label="默认值">
      <el-input
        v-model.number="activeData.defaultValue"
        placeholder="请输入默认值"
      ></el-input>
    </el-form-item>
    <el-form-item label="颜色格式">
      <el-select
        v-model="activeData.colorFormat"
        placeholder="请选择颜色格式"
        :style="{ width: '100%' }"
        clearable
        @change="colorFormatChange"
      >
        <el-option
          v-for="(item, index) in colorFormatOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="组件尺寸">
      <el-radio-group v-model="activeData.size">
        <el-radio-button label="medium">
          中等
        </el-radio-button>
        <el-radio-button label="small">
          较小
        </el-radio-button>
        <el-radio-button label="mini">
          迷你
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="activeData.showLabel" />
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
}
</script>
