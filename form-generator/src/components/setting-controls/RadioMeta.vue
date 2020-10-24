<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 12:55:02
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 23:04:03
-->
<template> </template>

<script>
import FormControl from "@/components/controls/FormControl.vue";
import Component from "vue-class-component";
import BaseControl from "./BaseControl.vue";
@Component({
  name: "RadioMeta",
  components: {
    FormControl
  }
})
export default class RadioMeta extends BaseControl {
  addSelectItem() {
    this.activeData.options.push({
      label: "",
      value: ""
    });
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}
        <el-divider>选项</el-divider>
        <draggable
          list={this.activeData.options}
          animation={340}
          group="selectItem"
          handle=".option-drag"
        >
          {this.activeData.options.map((item, index) => {
            return (
              <div key={index} class="select-item">
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation" />
                </div>
                <el-input
                  v-model={item.label}
                  placeholder="选项名"
                  size="small"
                />
                <el-input
                  placeholder="选项值"
                  size="small"
                  value={item.value}
                  on-input={$event => {
                    this.setOptionValue(item, $event);
                  }}
                />
                <div
                  class="close-btn select-line-icon"
                  on-click={() => {
                    this.activeData.options.splice(index, 1);
                  }}
                >
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            );
          })}
        </draggable>
        <div style="margin-left: 20px;">
          <el-button
            style="padding-bottom: 0"
            icon="el-icon-circle-plus-outline"
            type="text"
            on-click={() => {
              this.addSelectItem();
            }}
          >
            添加选项
          </el-button>
        </div>
        <el-divider />
        <el-form-item label="选项样式">
          <el-radio-group v-model={this.activeData.optionType}>
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="button">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="是否带边框">
          <el-switch v-model={this.activeData.border} />
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
.option-drag {
  cursor: move;
}
</style>
