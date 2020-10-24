<script lang="jsx">
  /** eslint-disable */
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import DefaultConfig from './default-config'
  import TableColumnWrapper from './table-column-wrapper.vue'
  @Component({
    name: 'BaseTableColumn',
    components: {
      TableColumnWrapper,
    },
  })
  export default class TableColumn extends Vue {
    @Prop({
      type: String,
      required: true,
    })
    prop

    @Prop({
      type: Object,
      required: true,
    })
    column

    config = DefaultConfig.CreateDefaultTableColumn()

    @Watch('column', {
      deep: true,
    })
    onColumnChange() {
      this.config = Object.assign({}, this.config, this.column || {})
      var defaultConfig = DefaultConfig.CreateDefaultTableColumn()
      if (this.config.columns) {
        if (Array.isArray(this.config.columns)) {
          this.config.columns.forEach((column) => {
            var updateColumn = Object.assign({}, defaultConfig, column || {})
            Object.assign(column, updateColumn)
          })
        } else {
          Object.values(this.config.columns).forEach((column) => {
            var updateColumn = Object.assign({}, defaultConfig, column || {})
            Object.assign(column, updateColumn)
          })
        }
      }
    }

    created() {
      this.config = Object.assign({}, this.config, this.column || {})
      var defaultConfig = DefaultConfig.CreateDefaultTableColumn()
      if (this.config.columns) {
        if (Array.isArray(this.config.columns)) {
          this.config.columns.forEach((column) => {
            var updateColumn = Object.assign({}, defaultConfig, column || {})
            Object.assign(column, updateColumn)
          })
        } else {
          Object.values(this.config.columns).forEach((column) => {
            var updateColumn = Object.assign({}, defaultConfig, column || {})
            Object.assign(column, updateColumn)
          })
        }
      }
    }

    mounted() {
      this.$emit('loaded', this.prop)
    }

    // eslint-disable-next-line no-unused-vars
    render(h) {
      var props = {
        attrs: { ...this.config },
        props: { ...this.config },
      }
      var children = []
      if (this.config.columns) {
        let columns = Array.isArray(this.config.columns)
          ? this.config.columns
          : Object.entries(this.config.columns).map(([prop, value]) => {
              return {
                ...value,
                prop,
              }
            })
        children = columns
          .filter((x) => x.visible)
          .map((column, idx) => {
            var subProps = {
              attrs: {
                ...column,
              },
              props: {
                ...column,
              },
              scopedSlots: {
                default: ({ row, $index }) => {
                  return (
                    <table-column-wrapper
                      prop={column.prop}
                      row={row}
                      index={$index}
                      config={column}
                    />
                  )
                },
              },
            }
            return <el-table-column key={idx} {...subProps}></el-table-column>
          })
      } else {
        props.scopedSlots = {
          default: ({ row, $index }) => {
            return (
              <table-column-wrapper
                prop={this.prop}
                row={row}
                index={$index}
                config={this.config}
              />
            )
          },
        }
      }
      return (
        this.config.visible && (
          <el-table-column {...props}>{children}</el-table-column>
        )
      )
    }
  }
</script>
