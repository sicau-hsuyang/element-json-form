<!--
 * @Author: JohnYang
 * @Date: 2020-10-20 13:57:16
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 15:15:42
-->
<template>
  <el-form size="small" label-width="90px">
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
    <el-form-item label="组件名">
      {{ activeData.componentName }}
    </el-form-item>
    <el-form-item label="表单栅格">
      <el-slider
        v-model="activeData.span"
        :max="24"
        :min="1"
        :marks="{ 12: '' }"
      />
    </el-form-item>
    <el-form-item label="布局模式">
      <el-radio-group v-model="activeData.type">
        <el-radio-button label="default" />
        <el-radio-button label="flex" />
      </el-radio-group>
    </el-form-item>
    <template v-if="activeData.type === 'flex'">
      <el-form-item label="水平排列">
        <el-select
          v-model="activeData.justify"
          placeholder="请选择水平排列"
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in justifyOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="垂直排列">
        <el-radio-group v-model="activeData.align">
          <el-radio-button label="top" />
          <el-radio-button label="middle" />
          <el-radio-button label="bottom" />
        </el-radio-group>
      </el-form-item>
    </template>
    <el-divider>布局结构树</el-divider>
    <el-tree
      :data="[activeData]"
      :props="layoutTreeProps"
      node-key="renderKey"
      default-expand-all
      draggable
    >
      <span slot-scope="{ node, data }">
        <span class="node-label">
          <svg-icon
            class="node-icon"
            :icon-class="data ? data.tagIcon : data.tagIcon"
          />
          {{ node.label }}
        </span>
      </span>
    </el-tree>
  </el-form>
</template>

<script>
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "RowMeta"
})
export default class RowMeta extends BaseControl {
  layoutTreeProps = {
    label(data, node) {
      const config = data;
      return data.componentName || `${config.label}: ${data.prop}`;
    }
  };

  justifyOptions = [
    {
      label: "start",
      value: "start"
    },
    {
      label: "end",
      value: "end"
    },
    {
      label: "center",
      value: "center"
    },
    {
      label: "space-around",
      value: "space-around"
    },
    {
      label: "space-between",
      value: "space-between"
    }
  ];
}
</script>
