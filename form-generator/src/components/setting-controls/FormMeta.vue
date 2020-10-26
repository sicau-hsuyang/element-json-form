<!--
 * @Author: JohnYang
 * @Date: 2020-10-21 16:16:35
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 13:29:52
-->
<template>
  <el-form size="small" label-width="90px">
    <el-divider>基本信息</el-divider>
    <el-form-item label="表单名">
      <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
    </el-form-item>
    <el-form-item label="表单尺寸">
      <el-radio-group v-model="formConf.size">
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
    <el-form-item label="标签对齐">
      <el-radio-group v-model="formConf.labelPosition">
        <el-radio-button label="left">
          左对齐
        </el-radio-button>
        <el-radio-button label="right">
          右对齐
        </el-radio-button>
        <el-radio-button label="top">
          顶部对齐
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number
        v-model.number="formConf.labelWidth"
        :min="0"
        label="请输入标签宽度"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="栅格间隔">
      <el-input-number
        v-model="formConf.gutter"
        :min="0"
        placeholder="栅格间隔"
      />
    </el-form-item>
    <el-form-item label="禁用表单">
      <el-switch v-model="formConf.disabled" />
    </el-form-item>
    <el-form-item label="表单按钮">
      <el-switch v-model="formConf.formBtns" />
    </el-form-item>
    <el-form-item label="显示未选中组件边框">
      <el-switch v-model="formConf.unFocusedComponentBorder" />
    </el-form-item>
    <el-divider>生命周期(非必须)</el-divider>
    <el-form-item label="created">
      <el-input
        v-model="formConf.created"
        @focus="handleFocus('created')"
        type="textarea"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    <el-form-item label="mounted">
      <el-input
        v-model="formConf.mounted"
        type="textarea"
        @focus="handleFocus('mounted')"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
    <el-form-item label="beforeDestroy">
      <el-input
        v-model="formConf.beforeDestroy"
        @focus="handleFocus('beforeDestroy')"
        type="textarea"
        placeholder="请输入"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import Component from "vue-class-component";
import { Inject, Prop } from "vue-property-decorator";

@Component({
  name: "FormMeta"
})
export default class FormMeta extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  formConf;

  @Inject("panel")
  panel;

  currentProp;

  handleFocus(prop) {
    this.currentProp = prop;
    this.panel && this.panel.openMonacoDialog(this.formConf[this.currentProp]);
  }
}
</script>
