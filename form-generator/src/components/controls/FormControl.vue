<!--
 * @Author: JohnYang
 * @Date: 2020-08-16 20:23:25
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 14:12:05
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
              ...this.$props,
              value: this.value
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners,
              input: val => {
                this.$emit("input", val);
              }
            }
          }}
          multiple={multiple}
          style={style}
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
              ...this.$props,
              value: this.value
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners,
              input: val => {
                this.$emit("input", val);
              }
            }
          }}
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
              ...this.$props,
              value: this.value
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners,
              input: val => {
                this.$emit("input", val);
              }
            }
          }}
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
              value: this.value
            },
            attrs: {
              ...this.$attrs,
              ...this.$props
            },
            on: {
              ...this.$listeners,
              input: val => {
                this.$emit("input", val);
              }
            }
          }}
          type={controlType}
          style={style}
        />
      );
    }
  }
};
</script>
