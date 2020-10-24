<!--
 * @Author: JohnYang
 * @Date: 2020-10-16 08:43:28
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-23 23:22:01
-->
<template> </template>

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

  createList(h) {
    var eles = [];
    eles.push(
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
    );
    eles.push(
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
    );
    return eles;
  }

  render(h) {
    return (
      <el-form size="small" label-width="90px">
        {this.createHeader(h)}

        <el-divider>选项</el-divider>
        <el-form-item label="数据类型">
          <form-control
            v-model={this.activeData.remote}
            type="select"
            on-change={() => {
              this.handleMethodChange();
            }}
            options={this.options}
          ></form-control>
        </el-form-item>
        {this.activeData.remote ? (
          <el-form-item label="数据获取">
            <form-control
              v-model={this.activeData.getOptions}
              type="textarea"
              on-focus={() => {
                this.handleFocus();
              }}
              placeholder="请输入获取数据的函数"
            ></form-control>
          </el-form-item>
        ) : (
          this.createList(h)
        )}
        <el-divider />
        <el-form-item label="显示标签">
          <el-switch v-model={this.activeData.showLabel} />
        </el-form-item>
        <el-form-item label="能否清空">
          <el-switch v-model={this.activeData.clearable} />
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch v-model={this.activeData.disabled} />
        </el-form-item>
        <el-form-item label="能否搜索">
          <el-switch v-model={this.activeData.filterable} />
        </el-form-item>
        <el-form-item label="能否多选">
          <el-switch v-model={this.activeData.multiple} />
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
</style>
