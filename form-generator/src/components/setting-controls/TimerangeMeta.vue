<!--
 * @Author: JohnYang
 * @Date: 2020-10-19 20:21:40
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-24 11:39:32
-->
<template> </template>

<script>
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
import { dateTimeFormat } from "@/config";
@Component({
  name: "TimerangeMeta"
})
export default class TimerangeMeta extends BaseControl {
  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h, false)}
        <el-form-item label="开始占位">
          <el-input
            v-model={this.activeData.startPlaceholder}
            placeholder="请输入占位提示"
          />
        </el-form-item>
        <el-form-item label="结束占位">
          <el-input
            v-model={this.activeData.endPlaceholder}
            placeholder="请输入占位提示"
          />
        </el-form-item>
        <el-form-item label="时间段">
          <el-input
            v-model={this.activeData.pickerOptions.selectableRange}
            placeholder="请输入时间段"
          />
        </el-form-item>
        <el-form-item label="分隔符">
          <el-input
            v-model={this.activeData.rangeSeparator}
            placeholder="请输入分隔符"
          />
        </el-form-item>
        <el-form-item label="时间格式">
          <el-input
            value={this.activeData.format}
            placeholder="请输入时间格式"
          />
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="显示清空">
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
