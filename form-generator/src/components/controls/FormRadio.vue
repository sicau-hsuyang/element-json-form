<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 12:39:37
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-18 13:17:12
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
  watch: {
    value() {
      this.content = this.value;
    },
    content() {
      this.$emit("input", this.value);
    }
  },
  render(h) {
    return (
      <el-radio-group v-model={this.content}>
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
