<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 12:45:50
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 14:14:20
-->
<script>
function compare(a, b) {
  // 如果是基础类型 直接比较，否则需要递归比较
  if (typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.every((x, idx) => {
        return compare(x, b[idx]);
      });
    } else {
      return compare(Object.values(a), Object.values(b));
    }
  }
  return a === b;
}

export default {
  name: "FormCheck",
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  render(h) {
    var { style, ...rest } = this.$attrs;
    return (
      <el-checkbox-group
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
        {this.getOptions(h, this.$attrs)}
      </el-checkbox-group>
    );
  },
  methods: {
    getOptions(h, conf) {
      const list = [];
      conf.options.forEach(item => {
        if (conf.optionType === "button") {
          list.push(
            <el-checkbox-button label={item.value}>
              {item.label}
            </el-checkbox-button>
          );
        } else {
          list.push(
            <el-checkbox label={item.value} border={conf.border}>
              {item.label}
            </el-checkbox>
          );
        }
      });
      return list;
    }
  }
};
</script>
