<!--
 * @Author: JohnYang
 * @Date: 2020-10-20 15:57:04
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-20 20:15:23
-->
<template>
  <el-dialog
    class="monaco-dialog"
    @opened="handleOpen"
    :visible.sync="visible"
    title="编辑代码"
  >
    <div ref="monaco" style="height: 600px"></div>
    <div slot="footer">
      <el-button @click="handleSave" size="small" type="primary"
        >保存</el-button
      >
      <el-button @click="handleCancel" size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
export default {
  name: "MonacoEidtorDialog",
  data() {
    return {
      visible: false,
      tempContent: null,
      editor: null
    };
  },
  beforeDestroy() {
    this.destroyEditor();
  },
  methods: {
    handleSave() {
      this.$emit("monaco-change", this.tempContent);
      this.closeDialog();
    },
    handleCancel() {
      this.closeDialog();
    },
    openDialog(content) {
      content && (this.tempContent = content);
      this.visible = true;
    },
    closeDialog() {
      if (this.editor) {
        this.editor.setValue("");
      }
      this.visible = false;
    },
    handleOpen() {
      if (this.editor) {
        this.tempContent && this.editor.setValue(this.tempContent);
        return;
      }
      this.setupEditor();
    },
    destroyEditor() {
      if (this.editor) {
        this.editor.dispose();
        this.editor = null;
      }
    },
    getValue() {
      this.editor && this.editor.getValue();
    },
    setupEditor() {
      var $ele = this.$refs.monaco;
      if (!$ele) {
        return;
      }
      this.editor = monaco.editor.create($ele, {
        theme: "vs-dark",
        language: "javascript"
      });
      if (this.editor) {
        this.editor.setValue(this.tempContent);
        this.editor.onDidChangeModelContent(event => {
          this.tempContent = this.editor.getValue();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.monaco-dialog {
  ::v-deep {
    .el-dialog__body {
      padding: 10px 20px;
    }
  }
}
</style>
