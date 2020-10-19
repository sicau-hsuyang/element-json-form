<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 12:55:02
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-19 14:41:35
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
    <el-form-item v-if="activeData.slots" label="插槽:prepend">
      <el-input
        v-model="activeData.slots.prepend"
        placeholder="请输入前缀"
        type="textarea"
      />
    </el-form-item>
    <el-form-item v-if="activeData.slots" label="插槽:append">
      <el-input
        v-model="activeData.slots.append"
        placeholder="请输入后缀"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="前图标">
      <el-input v-model="activeData.prefixIcon" placeholder="请输入前图标名称">
        <el-button
          slot="append"
          icon="el-icon-thumb"
          @click="
            () => {
              panel.openIconsDialog('prefixIcon');
            }
          "
        >
          选择
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="后图标">
      <el-input v-model="activeData.suffixIcon" placeholder="请输入后图标名称">
        <el-button
          slot="append"
          icon="el-icon-thumb"
          @click="
            () => {
              panel.openIconsDialog('suffixIcon');
            }
          "
        >
          选择
        </el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="最多输入">
      <el-input v-model="activeData.maxlength" placeholder="请输入字符长度">
        <template slot="append">
          个字符
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="activeData.showLabel" />
    </el-form-item>
    <el-form-item label="输入统计">
      <el-switch v-model="activeData.showWordLimit" />
    </el-form-item>
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>

    <el-form-item label="是否只读">
      <el-switch v-model="activeData.readonly" />
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
import BaseControl from "@/components/setting-controls/BaseControl";
import Component from "vue-class-component";
import { Inject } from "vue-property-decorator";

@Component({
  name: "InputMeta"
})
export default class InputMeta extends BaseControl {
  @Inject("panel")
  panel;
}
</script>
