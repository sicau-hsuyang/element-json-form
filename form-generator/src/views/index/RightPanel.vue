<script>
import InputMeta from "@/components/setting-controls/InputMeta.vue";
import AutocompleteMeta from "@/components/setting-controls/AutoCompleteMeta.vue";
import TextareaMeta from "@/components/setting-controls/TextareaMeta.vue";
import PasswordMeta from "@/components/setting-controls/PasswordMeta.vue";
import CounterMeta from "@/components/setting-controls/CounterMeta.vue";
import SelectMeta from "@/components/setting-controls/SelectMeta.vue";
import FormControl from "@/components/controls/FormControl.vue";
import RadioMeta from "@/components/setting-controls/RadioMeta.vue";
import CheckboxMeta from "@/components/setting-controls/CheckboxMeta.vue";
import SwitchMeta from "@/components/setting-controls/SwitchMeta.vue";
import SliderMeta from "@/components/setting-controls/SliderMeta.vue";
import TimeMeta from "@/components/setting-controls/TimeMeta.vue";
import TimerangeMeta from "@/components/setting-controls/TimerangeMeta.vue";
import RateMeta from "@/components/setting-controls/RateMeta.vue";
import ColorMeta from "@/components/setting-controls/ColorMeta.vue";
import DateMeta from "@/components/setting-controls/DateMeta.vue";
import DaterangeMeta from "@/components/setting-controls/DaterangeMeta.vue";
import RowMeta from "@/components/setting-controls/RowMeta.vue";
import TinymceMeta from "@/components/setting-controls/TinymceMeta.vue";
import UploadMeta from "@/components/setting-controls/UploadMeta.vue";
import FormMeta from "@/components/setting-controls/FormMeta.vue";
import TableMeta from "@/components/setting-controls/TableMeta.vue";
const MonacoEditorDialog = () =>
  import("@/components/controls/MonacoEditorDialog.vue");
import TreeNodeDialog from "@/views/index/TreeNodeDialog";
import { isNumberStr } from "@/utils/index";
import IconsDialog from "./IconsDialog";
import {
  inputComponents,
  selectComponents,
  layoutComponents
} from "@/components/generator/config";
import { saveFormConf } from "@/utils/storage";

import {
  validRuleOptions,
  defaultRule,
  triggerOptions,
  getControlEvents,
  asyncValidatorProvideTypes,
  requiredOptions
} from "@/config";

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ["tinymce"];

export default {
  components: {
    TreeNodeDialog,
    MonacoEditorDialog,
    IconsDialog,
    FormControl,
    FormMeta,
    InputMeta,
    TextareaMeta,
    PasswordMeta,
    CounterMeta,
    SelectMeta,
    RadioMeta,
    CheckboxMeta,
    SwitchMeta,
    SliderMeta,
    TimeMeta,
    TimerangeMeta,
    RateMeta,
    ColorMeta,
    DateMeta,
    DaterangeMeta,
    RowMeta,
    AutocompleteMeta,
    TinymceMeta,
    UploadMeta,
    TableMeta
  },
  provide() {
    var _this = this;
    return {
      panel: _this
    };
  },
  props: ["showField", "activeData", "formConf"],
  data() {
    return {
      validRuleOptions,
      triggerOptions,
      asyncValidatorProvideTypes,
      requiredOptions,
      currentTab: "field",
      currentNode: null,
      dialogVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: "日(date)",
          value: "date"
        },
        {
          label: "周(week)",
          value: "week"
        },
        {
          label: "月(month)",
          value: "month"
        },
        {
          label: "年(year)",
          value: "year"
        },
        {
          label: "日期时间(datetime)",
          value: "datetime"
        }
      ],
      dateRangeTypeOptions: [
        {
          label: "日期范围(daterange)",
          value: "daterange"
        },
        {
          label: "月范围(monthrange)",
          value: "monthrange"
        },
        {
          label: "日期时间范围(datetimerange)",
          value: "datetimerange"
        }
      ],
      colorFormatOptions: [
        {
          label: "hex",
          value: "hex"
        },
        {
          label: "rgb",
          value: "rgb"
        },
        {
          label: "rgba",
          value: "rgba"
        },
        {
          label: "hsv",
          value: "hsv"
        },
        {
          label: "hsl",
          value: "hsl"
        }
      ],
      justifyOptions: [
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
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data;
          return data.componentName || `${config.label}: ${data.prop}`;
        }
      },
      currentUser: null
    };
  },
  computed: {
    monacoEditor() {
      return this.$refs.monacoEditor;
    },
    documentLink() {
      return this.activeData
        ? this.activeData.document
        : "https://element.eleme.cn/#/zh-CN/component/installation";
    },
    icon() {
      return this.$refs.icon;
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val);
      },
      deep: true
    }
  },
  render(h) {
    return (
      <div class="right-board">
        <el-tabs v-model={this.currentTab} class="center-tabs">
          <el-tab-pane label="组件属性" name="field" />
          <el-tab-pane label="表单属性" name="form" />
        </el-tabs>
        <div class="field-box">
          <a
            class="document-link"
            target="_blank"
            href={this.documentLink}
            title="查看组件文档"
          >
            <i class="el-icon-link" />
          </a>
          <el-scrollbar class="right-scrollbar">
            {this.createActiveMetaControl(h)}
          </el-scrollbar>
        </div>

        <monaco-editor-dialog
          {...{
            on: {
              "monaco-change": this.broadcastEvent.bind(this)
            }
          }}
          ref="monacoEditor"
        ></monaco-editor-dialog>
        {/*<treeNode-dialog
      :visible.sync="dialogVisible"
      title="添加选项"
      @commit="addNode"
    />*/}
        <icons-dialog
          ref="icon"
          current={this.activeData && this.activeData[this.currentIconModel]}
          on-select={() => {
            this.setIcon();
          }}
        />
      </div>
    );
  },
  methods: {
    findFormControl(tag, type) {
      var map = {
        "el-input": {
          text: "InputMeta",
          password: "PasswordMeta",
          textarea: "TextareaMeta"
        },
        "el-autocomplete": "AutocompleteMeta",
        "el-select": "SelectMeta",
        "el-input-number": "CounterMeta",
        "el-radio-group": "RadioMeta",
        "el-checkbox-group": "CheckboxMeta",
        "el-switch": "SwitchMeta",
        "el-slider": "SliderMeta",
        "el-upload": "UploadMeta",
        "el-time-picker": {
          time: "TimeMeta",
          timerange: "TimerangeMeta"
        },
        "el-date-picker": {
          date: "DateMeta",
          daterange: "DaterangeMeta"
        },
        "el-color-picker": "ColorMeta",
        "form-table": "TableMeta",
        "el-date": "RateMeta",
        tinymce: "TinymceMeta"
      };

      var component = map[tag];

      return typeof component === "object" ? component[type] : component;
    },
    createActiveMetaControl(h) {
      var vNode = null;

      if (!this.activeData) {
        return <div class="empty-panel">从左侧拖入或点选组件进行表单设计</div>;
      }

      if (this.currentTab === "form") {
        vNode = <FormMeta form-conf={this.formConf}></FormMeta>;
      } else if (this.currentTab === "field") {
        var tag = this.findFormControl(
          this.activeData.tag,
          this.activeData.type
        );
        if (this.activeData.layout === "rowFormItem") {
          tag = "RowMeta";
        }
        vNode = h(tag, {
          props: {
            activeData: this.activeData
          }
        });
      }
      return vNode;
    },
    broadcastEvent(content) {
      if (!this.currentUser) {
        return;
      }
      this.currentUser.$emit("monaco-change", content);
      this.currentUser = null;
    },
    setAsCurrentUser(user) {
      this.currentUser = user;
    },
    getControlEvents,
    handleValieRuleChange(item) {
      if (item.method) {
        item.validator = "";
      }
    },
    addTreeItem() {
      ++this.idGlobal;
      this.dialogVisible = true;
      this.currentNode = this.activeData.options;
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i
              on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i
              on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      );
    },
    append(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      this.dialogVisible = true;
      this.currentNode = data.children;
    },
    remove(node, data) {
      this.activeData.defaultValue = []; // 避免删除时报错
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    addNode(data) {
      this.currentNode.push(data);
    },
    spanChange(val) {
      this.formConf.span = val;
    },
    multipleChange(val) {
      this.$set(this.activeData, "defaultValue", val ? [] : "");
    },
    rangeChange(val) {
      this.$set(
        this.activeData,
        "defaultValue",
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      );
    },
    rateTextChange(val) {
      if (val) this.activeData.showScore = false;
    },
    rateScoreChange(val) {
      if (val) this.activeData.showText = false;
    },
    colorFormatChange(val) {
      this.activeData.defaultValue = null;
      this.activeData.showAlpha = val.indexOf("a") > -1;
      this.activeData.renderKey = +new Date(); // 更新renderKey,重新渲染该组件
    },
    openMonacoDialog(content) {
      this.monacoEditor && this.monacoEditor.openDialog(content);
    },
    openIconsDialog(model) {
      this.icon && this.icon.openDialog();
      this.currentIconModel = model;
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val;
    },
    tagChange(target) {
      // var iComponents = Object.values(inputComponents);
      // var sComponents = Object.values(selectComponents);
      // let target = iComponents.find(item => item.tagIcon === tagIcon);
      // if (!target) target = sComponents.find(item => item.tagIcon === tagIcon);
      this.$emit("tag-change", target);
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.tag)) {
        this.activeData.renderKey = +new Date();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
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
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}

.empty-panel {
  text-align: center;
  margin-top: 100px;
}
</style>
