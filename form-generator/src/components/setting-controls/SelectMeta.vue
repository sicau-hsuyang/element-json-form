<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 08:43:28
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 11:36:30
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
    <el-divider>选项</el-divider>
    <el-form-item label="数据类型">
      <form-control
        v-model="activeData.remote"
        type="select"
        @change="handleMethodChange"
        :options="options"
      ></form-control>
    </el-form-item>
    <template v-if="activeData.remote">
      <el-form-item label="数据获取">
        <form-control
          v-model="activeData.getOptions"
          type="textarea"
          @focus="handleFocus"
          placeholder="请输入获取数据的函数"
        ></form-control>
      </el-form-item>
    </template>
    <template v-else>
      <draggable
        :list="activeData.options"
        :animation="340"
        group="selectItem"
        handle=".option-drag"
      >
        <div
          v-for="(item, index) in activeData.options"
          :key="index"
          class="select-item"
        >
          <div class="select-line-icon option-drag">
            <i class="el-icon-s-operation" />
          </div>
          <el-input v-model="item.label" placeholder="选项名" size="small" />
          <el-input
            placeholder="选项值"
            size="small"
            :value="item.value"
            @input="setOptionValue(item, $event)"
          />
          <div
            class="close-btn select-line-icon"
            @click="activeData.options.splice(index, 1)"
          >
            <i class="el-icon-remove-outline" />
          </div>
        </div>
      </draggable>
      <div style="margin-left: 20px;">
        <el-button
          style="padding-bottom: 0"
          icon="el-icon-circle-plus-outline"
          type="text"
          @click="addSelectItem"
        >
          添加选项
        </el-button>
      </div>
    </template>
    <el-divider />
    <el-form-item label="显示标签">
      <el-switch v-model="activeData.showLabel" />
    </el-form-item>
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="能否搜索">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <el-form-item label="能否多选">
      <el-switch v-model="activeData.multiple" />
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
import FormControl from "@/components/controls/FormControl.vue";
import Component from "vue-class-component";
import { Inject } from "vue-property-decorator";
import BaseControl from "./BaseControl.vue";
import { fetchRemoteDataSourceFragment } from "@/config";
@Component({
  name: "SelectMeta",
  components: {
    FormControl
  }
})
export default class SelectMeta extends BaseControl {
  @Inject("panel")
  panel;

  currentItem = null;

  options = [
    {
      label: "本地数据源",
      value: false
    },
    {
      label: "远程数据源",
      value: true
    }
  ];

  created() {
    this.subscribeEvent();
  }

  handleFocus() {
    if (this.panel) {
      this.panel.openMonacoDialog(
        this.activeData.getOptions || fetchRemoteDataSourceFragment
      );
      this.panel.setAsCurrentUser(this);
    }
  }

  subscribeEvent() {
    this.$on("monaco-change", content => {
      this.activeData.getOptions = content;
    });
  }

  addSelectItem() {
    this.activeData.options.push({
      label: "",
      value: ""
    });
  }

  handleMethodChange() {
    if (this.activeData.remote) {
      this.activeData.options = [];
    } else {
      this.activeData.getOptions = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
</style>
