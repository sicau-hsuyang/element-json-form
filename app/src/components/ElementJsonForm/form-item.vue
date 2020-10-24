<!--
 * @Author: JohnYang
 * @Date: 2020-10-21 17:03:59
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 20:20:56
-->
<script>
import FormControl from "@/components/FormControl/index.vue";

const layouts = {
  colFormItem(h, currentItem) {
    const { style, ...config } = currentItem;
    const child = renderChildren.apply(this, arguments);
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) labelWidth = "0";
    return (
      <el-col span={config.span}>
        <el-form-item
          prop={config.prop}
          label-width={labelWidth}
          rules={config.rules}
          label={config.showLabel ? config.label : ""}
        >
          <form-control
            {...{
              props: {
                ...config,
                value: this.value
              },
              attrs: {
                ...config
              },
              style: {
                ...style
              },
              on: {
                ...currentItem.events,
                input: val => {
                  this.$emit("input", val);
                }
              }
            }}
            key={config.prop}
          >
            {child}
          </form-control>
        </el-form-item>
      </el-col>
    );
  },
  rowFormItem(h, currentItem) {
    const { style, ...config } = currentItem;
    let child = renderChildren.apply(this, arguments);
    if (currentItem.type === "flex") {
      child = (
        <el-row
          type={currentItem.type}
          justify={currentItem.justify}
          align={currentItem.align}
        >
          {child}
        </el-row>
      );
    }
    return (
      <el-col span={config.span} style={style}>
        <el-row gutter={config.gutter}>{child}</el-row>
      </el-col>
    );
  },
  raw(h, currentItem) {
    const { style, ...config } = currentItem;

    const child = renderChildren.apply(this, arguments);
    return (
      <form-control
        {...{
          props: {
            ...currentItem,
            value: this.value
          },
          attrs: {
            ...currentItem
          },
          style: {
            ...style
          },
          on: {
            ...currentItem.events,
            input: val => {
              this.$emit("input", val);
            }
          }
        }}
        key={config.renderKey}
      >
        {child}
      </form-control>
    );
  }
};

function renderChildren(h, currentItem) {
  const config = currentItem;
  if (!Array.isArray(config.children)) return null;
  return config.children.map((el, i) => {
    const renderFunc = layouts[el.layout];
    if (renderFunc) {
      return renderFunc.call(this, h, el);
    }
    return layoutIsNotFound.call(this);
  });
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.item.layout}匹配的layout`);
}

export default {
  components: {
    FormControl
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    value: {
      required: false
    }
  },
  render(h) {
    const layout = layouts[this.item.layout];
    if (layout) {
      return layout.call(this, h, this.item);
    }
    return layoutIsNotFound.call(this);
  }
};
</script>
