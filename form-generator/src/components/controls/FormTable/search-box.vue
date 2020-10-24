<script lang="jsx">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop, Inject } from 'vue-property-decorator'
  @Component({
    name: 'BaseSearch',
  })
  export default class BaseSearch extends Vue {
    @Inject('table')
    table

    /**
     * 表格组件的列配置
     */
    @Prop({
      type: Object,
      required: true,
    })
    columns

    @Prop({
      type: Function,
      required: false,
      default: function () {
        return function () {
          return true
        }
      },
    })
    valid

    searchProps = {}

    /**
     * 由子组件冒泡过来的事件 设置搜索控件的值
     */
    setProps(obj) {
      this.searchProps = Object.assign({}, this.searchProps, obj)
    }

    createControl(h, column) {
      // 如果不是配置的对象的话，说明是最简单的形态
      const defaultShape = (
        <el-input
          placeholder="请输入"
          clearable={true}
          {...{
            attrs: column,
          }}
          v-model={this.searchProps[column.prop]}
        />
      )
      if (typeof column.filterable !== 'object') {
        return defaultShape
      }
      if (typeof column.filterable.render === 'function') {
        return column.filterable.render(h, column.prop)
      } else if (column.filterable.type === 'select') {
        //如果是下拉选项的时候
        return (
          <el-select
            class="full-width"
            {...{
              attrs: column,
            }}
            clearable={true}
            v-model={this.searchProps[column.prop]}
            multiple={column.filterable.multi}
          >
            {Array.isArray(column.filterable.options) &&
              column.filterable.options.map((item) => {
                return <el-option value={item.value} label={item.label} />
              })}
          </el-select>
        )
      } else {
        return defaultShape
      }
    }

    getControlSpan(column) {
      if (
        Object.prototype.toString.call(column.filterable) !== '[object Object]'
      ) {
        return 6
      }
      return column.filterable.span || 6
    }

    render(h) {
      return (
        <el-form inline={true} gutter={30}>
          {Object.entries(this.columns)
            .filter(([prop, column]) => {
              /* 过滤所有filterable为false的配置 和操作列 */
              return prop !== 'operation' && column.filterable
            })
            .map(([prop, column]) => {
              return (
                <el-form-item
                  {...{
                    props: {
                      ...column,
                      labelWidth:
                        typeof column.filterable === 'object' &&
                        typeof column.filterable.labelWidth === 'number'
                          ? column.filterable.labelWidth + 'px'
                          : '100px',
                    },
                  }}
                  label={column.label}
                  key={prop}
                >
                  {this.createControl(h, column)}
                </el-form-item>
              )
            })}

          <el-form-item>
            <el-button
              type="primary"
              on-click={() => {
                this.search()
              }}
            >
              搜索
            </el-button>
            <el-button
              on-click={() => {
                this.reset()
              }}
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      )
    }

    search() {
      // 如果验证不通过的话 不能进行搜索
      // eslint-disable-next-line no-unused-vars
      let { operation, ...pureProps } = this.searchProps
      if (!this.valid(pureProps)) {
        return
      }
      let newProps = {}
      Object.keys(pureProps).forEach((prop) => {
        if (Array.isArray(pureProps[prop]) && pureProps[prop].length) {
          newProps[prop] = pureProps[prop]
        } else if (
          pureProps[prop] !== undefined &&
          pureProps[prop] !== null &&
          pureProps[prop] != ''
        ) {
          newProps[prop] = pureProps[prop]
        }
      })
      this.table && this.table.onSearch(newProps)
    }

    reset() {
      Object.entries(this.columns).map(([prop, column]) => {
        this.searchProps[prop] =
          typeof column.filterable === 'object' && column.filterable.multi
            ? []
            : ''
      })
      this.table && this.table.onSearch()
    }
  }
</script>

<style lang="scss" scoped>
  // .searchbox-container {
  //   width: 100%;
  //   box-sizing: border-box;
  // }

  // .search-control {
  //   display: flex;
  //   height: 60px;
  //   justify-content: center;
  //   align-items: center;
  //   @at-root .full-width {
  //     width: 100%;
  //   }
  //   &.text-left {
  //     justify-content: flex-start;
  //   }
  //   &--form {
  //     flex: 1;
  //   }
  // }
</style>
