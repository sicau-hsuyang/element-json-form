<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 13:33:13
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-19 14:06:10
-->
<script>
import {
  requiredOptions,
  validRuleOptions,
  triggerOptions,
  defaultRule,
  asyncValidatorProvideTypes
} from "@/config";
import FormControl from "@/components/controls/FormControl.vue";
export default {
  name: "RulesControl",
  components: {
    FormControl
  },
  props: {
    activeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeCurrentRule(index) {
      this.activeData.rules.splice(index, 1);
    },
    addValidateRule() {
      var newRule = defaultRule();
      this.activeData.rules.push(newRule);
    },
    getItems(h) {
      return this.activeData.rules.map((item, index) => {
        return (
          <div>
            <span
              class="close-btn"
              on-click={() => {
                this.removeCurrentRule(index);
              }}
            >
              <i class="el-icon-close" />
            </span>
            <el-form-item label="必选">
              <form-control
                v-model={item.required}
                type="select"
                options={requiredOptions}
              ></form-control>
            </el-form-item>
            <el-form-item label="规则类型">
              <form-control
                v-model={item.method}
                options={validRuleOptions}
                on-change={() => {
                  this.handleValieRuleChange(item);
                }}
                type="select"
              ></form-control>
            </el-form-item>
            <el-form-item label="触发器">
              <form-control
                v-model={item.trigger}
                options={triggerOptions}
                multiple
                type="select"
              ></form-control>
            </el-form-item>

            {item.method && (
              <el-form-item label="类型">
                <form-control
                  v-model={item.type}
                  type="select"
                  options={asyncValidatorProvideTypes}
                  placeholder="请选择数据类型"
                />
              </el-form-item>
            )}

            {item.method && (
              <el-form-item label="表达式">
                <el-input v-model={item.pattern} placeholder="请输入正则" />
              </el-form-item>
            )}

            {item.method && (
              <el-form-item label="错误提示" style="margin-bottom:0">
                <el-input v-model={item.message} placeholder="请输入错误提示" />
              </el-form-item>
            )}

            {!item.method && (
              <el-form-item label="验证器">
                <form-control
                  type="textarea"
                  v-model={item.validator}
                ></form-control>
              </el-form-item>
            )}
          </div>
        );
      });
    }
  },
  render(h) {
    return (
      <div>
        <el-divider>验证信息</el-divider>
        {this.getItems(h)}
        <div style="margin-left: 20px">
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            on-click={() => {
              this.addValidateRule();
            }}
          >
            添加规则
          </el-button>
        </div>
      </div>
    );
  }
};
</script>
