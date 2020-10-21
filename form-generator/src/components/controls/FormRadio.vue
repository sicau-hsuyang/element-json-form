<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 12:39:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 14:08:36
-->

<script>
export default {
  name: "FormRadio",
  props: {
    value: {
      required: true
    }
  },
  created() {
    this.content = this.value;
  },
  render(h) {
    var { style, ...rest } = this.$attrs;
    return (
      <el-radio-group
        {...{
          props: {
            ...rest,
            value: this.value
          },
          attrs: {
            ...rest
          },
          on: {
            ...this.$listeners,
            input: val => {
              this.$emit("input", val);
            }
          },
          style: {
            ...style
          }
        }}
        v-model={this.content}
      >
        {this.options(h, this.$attrs)}
      </el-radio-group>
    );
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    options(h, conf) {
      const list = [];
      conf.options.forEach(item => {
        if (conf.optionType === "button") {
          list.push(
            <el-radio-button label={item.value}>{item.label}</el-radio-button>
          );
        } else {
          list.push(
            <el-radio label={item.value} border={conf.border}>
              {item.label}
            </el-radio>
          );
        }
      });
      return list;
    }
  }
};
</script>
