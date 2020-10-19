<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 12:45:50
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-19 15:29:42
-->
<script>
export default {
  name: "FormCheck",
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      content: []
    };
  },
  created() {
    this.content = this.value;
  },
  watch: {
    value() {
      this.content = this.value;
    },
    content() {
      this.$emit("input", this.content);
    }
  },
  render(h) {
    return (
      <el-checkbox-group
        {...{
          props: {
            ...this.$attrs
          },
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}
        v-model={this.content}
      >
        {this.options(h, this.$attrs)}
      </el-checkbox-group>
    );
  },
  methods: {
    options(h, conf) {
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
