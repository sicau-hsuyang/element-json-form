<!--
 * @Author: JohnYang
 * @Date: 2020-10-21 15:16:43
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 16:56:07
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
        @change="spanChange"
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
        :value="setDefaultValue(activeData.defaultValue)"
        placeholder="请输入默认值"
        @input="onDefaultValueInput"
      />
    </el-form-item>
    <el-form-item label="文件字段名">
      <el-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-select
        v-model="activeData.accept"
        placeholder="请选择文件类型"
        :style="{ width: '100%' }"
        clearable
      >
        <el-option label="图片" value="image/*" />
        <el-option label="视频" value="video/*" />
        <el-option label="音频" value="audio/*" />
        <el-option label="excel" value=".xls,.xlsx" />
        <el-option label="word" value=".doc,.docx" />
        <el-option label="pdf" value=".pdf" />
        <el-option label="txt" value=".txt" />
      </el-select>
    </el-form-item>
    <el-form-item label="文件大小">
      <el-input
        v-model.number="activeData.fileSize"
        placeholder="请输入文件大小"
      >
        <el-select
          slot="append"
          v-model="activeData.sizeUnit"
          :style="{ width: '66px' }"
        >
          <el-option label="KB" value="KB" />
          <el-option label="MB" value="MB" />
          <el-option label="GB" value="GB" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item label="上传地址">
      <el-input
        v-model="activeData.action"
        placeholder="请输入上传地址"
        clearable
      />
    </el-form-item>
    <el-form-item label="列表类型" label-width="85px">
      <el-radio-group v-model="activeData.listType" size="small">
        <el-radio-button label="text">
          text
        </el-radio-button>
        <el-radio-button label="picture">
          picture
        </el-radio-button>
        <el-radio-button label="picture-card">
          picture-card
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-show="'picture-card' !== activeData.listType"
      label="按钮文字"
    >
      <el-input v-model="activeData.buttonText" placeholder="请输入按钮文字" />
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="activeData.showLabel" />
    </el-form-item>
    <el-form-item label="显示提示">
      <el-switch v-model="activeData.showTip" />
    </el-form-item>
    <el-form-item label="多选文件">
      <el-switch v-model="activeData.multiple" />
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
    /> </el-form
></template>

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "UploadMeta"
})
export default class UploadMeta extends BaseControl {}
</script>
