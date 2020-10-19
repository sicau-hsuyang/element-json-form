<!--
 * @Author: JohnYang
 * @Date: 2020-08-16 20:23:25
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-18 13:30:22
-->
<script>
export default {
  name: "FormControl",
  props: {
    type: {
      type: [String],
      required: true
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.content = this.value;
  },
  watch: {
    value: function() {
      this.content = this.value;
    },
    content: function() {
      this.$emit("input", this.content);
    }
  },
  methods: {
    createOptions(h, { options, groups }) {
      let results = [];
      if (Array.isArray(options)) {
        results = options.map(opt => {
          let option =
            typeof optionsMapping === "function" ? optionsMapping(opt) : opt;
          return <el-option {...{ attrs: option, props: option }}></el-option>;
        });
      } else if (Array.isArray(groups)) {
        results = groups.map(group => {
          return (
            <el-option-group
              {...{ attrs: group, props: group }}
              label={group.label}
            >
              {group.options.map(opt => {
                let option =
                  typeof optionsMapping === "function"
                    ? optionsMapping(opt)
                    : opt;
                return (
                  <el-option {...{ attrs: option, props: option }}></el-option>
                );
              })}
            </el-option-group>
          );
        });
      }
      return results;
    }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    let { options, groups, optionsMapping, multiple, style } = this.$attrs;
    let controlType = this.type || "input";
    if (controlType === "select") {
      return (
        <el-select
          {...{
            props: {
              ...this.$attrs,
              ...this.$props
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners
            }
          }}
          multiple={multiple}
          v-model={this.content}
          style={{ width: "100%", ...style }}
        >
          {this.createOptions(h, { options, groups })}
        </el-select>
      );
    } else if (
      [
        "date",
        "week",
        "datetime",
        "dates",
        "month",
        "year",
        "daterange",
        "datetimerange"
      ].includes(controlType)
    ) {
      return (
        <el-date-picker
          {...{
            props: {
              ...this.$attrs,
              ...this.$props
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners
            }
          }}
          v-model={this.content}
          type={controlType}
          style={style}
        />
      );
    } else if (controlType === "time") {
      return (
        <el-time-picker
          {...{
            props: {
              ...this.$attrs,
              ...this.$props
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners
            }
          }}
          v-model={this.content}
          type={controlType}
          style={style}
        />
      );
    } else {
      return (
        <el-input
          {...{
            props: {
              ...this.$attrs,
              ...this.$props,
              "show-word-limit": true
            },
            attrs: {
              ...this.$attrs,
              ...this.$props,
              "show-word-limit": true
            },
            on: {
              ...this.$listeners
            }
          }}
          type={controlType}
          v-model={this.content}
          style={style}
        />
      );
    }
  }
};
</script>

<style></style>
