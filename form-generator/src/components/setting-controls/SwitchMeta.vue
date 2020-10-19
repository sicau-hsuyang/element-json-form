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
    <el-form-item v-if="activeData.span !== undefined" label="表单栅格">
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
        :value="setDefaultValue(activeData.defaultValue)"
        placeholder="请输入默认值"
        @input="onDefaultValueInput"
      />
    </el-form-item>
    <el-form-item label="开启提示">
      <el-input v-model="activeData.activeText" placeholder="请输入开启提示" />
    </el-form-item>
    <el-form-item label="关闭提示">
      <el-input
        v-model="activeData.inactiveText"
        placeholder="请输入关闭提示"
      />
    </el-form-item>
    <el-form-item label="开启值">
      <el-input
        :value="setDefaultValue(activeData.activeValue)"
        placeholder="请输入开启值"
        @input="onSwitchValueInput($event, activeValue)"
      />
    </el-form-item>
    <el-form-item label="关闭值">
      <el-input
        :value="setDefaultValue(activeData.inactiveValue)"
        placeholder="请输入关闭值"
        @input="onSwitchValueInput($event, inactiveValue)"
      />
    </el-form-item>
    <el-form-item label="开启颜色">
      <el-color-picker v-model="activeData.activeColor" />
    </el-form-item>
    <el-form-item label="关闭颜色">
      <el-color-picker v-model="activeData.inactiveColor" />
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
  name: "SwitchMeta"
})
export default class SwitchMeta extends BaseControl {
  onSwitchValueInput(val, name) {
    if (["true", "false"].indexOf(val) > -1) {
      this.$set(this.activeData, name, JSON.parse(val));
    } else {
      this.$set(this.activeData, name, isNumberStr(val) ? +val : val);
    }
  }
}
</script>
