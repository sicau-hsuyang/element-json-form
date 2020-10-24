<template>
  <div class="base-table">
    <!--表格的搜索框-->
    <div class="base-table--searchbox" v-if="filterable">
      <slot name="searchbox" :table="baseTable">
        <search-box
          :valid="meta.valid"
          @search="onSearch"
          :columns="columnsProp"
        />
      </slot>
    </div>
    <!--表格的操作列-->
    <div v-if="$slots.toolbar" class="base-table--toolbar">
      <slot name="toolbar" />
    </div>

    <!-- 表格的内容区域 -->
    <div class="base-table--body">
      <el-table
        ref="table"
        v-bind="meta"
        :data="list"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        v-loading="loading"
        element-loading-text="加载数据中..."
        element-loading-spinner="el-icon-loading"
      >
        <!-- 是否展示搜索框 -->
        <el-table-column
          v-if="meta.selection"
          align="center"
          type="selection"
        ></el-table-column>
        <!-- 是否展示序号 -->
        <el-table-column
          v-if="meta.showIndex"
          align="center"
          label="序号"
          width="80px"
          type="index"
        ></el-table-column>
        <table-column
          v-for="(column, prop) in columnsProp"
          :key="prop"
          :column="column"
          :prop="prop"
        />
      </el-table>
    </div>
    <!-- 表格的底部的区域 -->
    <div class="base-table--footer">
      <el-pagination
        class="pagination-bar"
        v-if="meta.pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="meta.pagination.options"
        :total="total"
        layout="total,sizes,prev, pager,next, jumper"
        @size-change="onPageSizeChange"
        @current-change="onCurrentChange"
        prev-text="上一页"
        next-text="下一页"
      />
    </div>
  </div>
</template>

<script lang="jsx">
  import Vue from 'vue'
  import { Component, Prop, Watch, Provide } from 'vue-property-decorator'
  import DefaultConfig from './default-config'
  import TableColumn from './table-column.vue'
  import SearchBox from './search-box.vue'
  @Component({
    name: 'BaseTable',
    components: {
      TableColumn,
      SearchBox,
    },
  })
  export default class Table extends Vue {
    get table() {
      return this.$refs.table
    }

    get pagination() {
      // 如果是对象或者 true的话 显示分页
      return typeof this.meta.pagination === 'object' || this.meta.pagination
    }

    get filterable() {
      // 如果表格配置是true的话 并且有可以显示的列，才显示搜索框
      return (
        this.meta.filterable &&
        Object.values(this.columnsProp).some((item) => {
          // 如果当前列在显示列的话，并且配置了可搜索，才认为可搜索
          return (
            item.visible &&
            (typeof item.filterable === 'object' || item.filterable)
          )
        })
      )
    }

    /**
     * 向后代组件注入可以获取选中数据的方法
     */
    @Provide('getSelection')
    getSelection() {
      return this.selection
    }

    @Provide('table')
    baseTable = this

    /**
     * 用户选中的数据
     */
    selection = []

    /**
     * 表格组件的列配置
     */
    @Prop({
      type: Object,
      required: true,
    })
    columns

    columnsProp = {}

    /**
     * 组件的配置
     */
    @Prop({
      type: Object,
      required: true,
    })
    config

    /**
     * 表格组件的名称
     */
    @Prop({
      type: String,
      required: false,
      default: DefaultConfig.CreateTableName(),
    })
    name

    // 组件内部维持的表格配置
    meta = DefaultConfig.createDefaultTableConfig()

    loading = false

    /**
     * 查询条件
     */
    queryParams = {}

    /**
     * 数据的总量
     */
    total = 0

    /**
     * 当前页
     */
    currentPage = 1

    /**
     * 每页显示的数量
     */
    pageSize = 0

    /**
     * 表格的数据
     */
    list = []

    getTableData() {
      return this.list
    }

    @Watch('config', {
      deep: true,
    })
    onConfigChange() {
      // 当表格配置变化的时候 需要合并表格的配置
      this.mergeTableConfig()
    }

    @Watch('columns', {
      deep: true,
    })
    onColumnsChange() {
      // 当表格列配置变化的时候 需要合并表格列的配置
      this.mergeTableColumnsConfig()
    }

    /**
     * 将组件导向到指定的位置
     */
    navTo(
      { pageSize, pageNum } = {
        pageSize: 10,
        pageNum: 1,
      }
    ) {
      this.pageSize = pageSize
      this.currentPage = pageNum
      this.reload(false)
    }

    /**
     * 回到首页
     */
    backToFirst() {
      this.currentPage = 1
    }

    backToPage(pageNum) {
      this.navTo({ pageSize: this.pageSize, pageNum })
    }

    backToDefault() {
      if (typeof this.meta.pagination === 'boolean') {
        this.pageSize = 10
      } else {
        this.pageSize = this.meta.pagination.options[0]
      }
      this.currentPage = 1
    }

    created() {
      //当组件创建的时候 合并默认配置
      this.mergeTableConfig()
      this.mergeTableColumnsConfig()
      //如果开启了分页的话
      if (this.meta.pagination) {
        //启用默认配置
        this.backToDefault()
        this.total = 0
      }
      this.$on('search', this.onSearch)
    }

    /**
     * 合并外界传入的配置
     */
    mergeTableConfig() {
      this.meta = Object.assign({}, this.meta, this.config || {})
    }

    /**
     * 合并表格列的配置
     */
    mergeTableColumnsConfig() {
      this.columnsProp = {}
      Object.entries(this.columns || {}).forEach(([prop, column]) => {
        this.$set(this.columnsProp, prop, {
          ...DefaultConfig.CreateDefaultTableColumn(),
          ...column,
          // 如果开启了服务端分页的话，当前列就不再使用客户端排序
          sortable:
            this.meta.serverSort && column.sortable
              ? 'custom'
              : column.sortable,
          prop,
        })
      })
    }

    mounted() {
      // 如果立即加载的话 当表格渲染完成的时候 不需要立即加载
      !this.meta.lazyLoad && this.loadData()
    }

    onSelectionChange(selection) {
      this.selection = selection
      this.$emit('selection-change', selection)
    }

    onSortChange(sortParams) {
      let { serverSort } = this.meta
      if (serverSort) {
        Object.assign(this.meta, {
          orderProp: sortParams.prop,
          orderDirection: sortParams.order,
        })
        this.loadData()
      }
    }

    /**
     * 用于被调度的搜索方法
     */
    onSearch(queryParams) {
      this.queryParams = queryParams
      this.loadData()
    }

    onPageSizeChange(val) {
      if (!this.meta.pagination) {
        return
      }
      this.pageSize = val
      this.currentPage = 1
      this.loadData()
    }

    onCurrentChange(val) {
      if (!this.meta.pagination) {
        return
      }
      this.currentPage = val
      this.loadData()
    }

    reload(toFirst) {
      if (this.meta.pagination && toFirst) {
        this.backToFirst()
      }
      this.loadData()
    }

    async loadData() {
      let {
        getData,
        pagination,
        sortOrderMapping,
        orderProp,
        orderDirection,
      } = this.meta
      var searchParams = this.queryParams || {}
      let distParams = Object.assign({}, searchParams, {
        sortParams: {
          orderProp,
        },
      })
      if (pagination) {
        Object.assign(distParams, {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
        })
      }
      if (typeof sortOrderMapping === 'function') {
        Object.assign(distParams, {
          sortParams: {
            orderProp,
            direction: sortOrderMapping(orderDirection),
          },
        })
      }
      // 如果是外界传入的是函数 由于不管是同步还是异步函数 都可以跟await 所以一律认为是异步函数
      if (typeof getData === 'function') {
        this.loading = true
        try {
          let response = await getData(distParams)
          if (response) {
            this.afterRequestEnd(response)
          }
        } catch (exp) {
          console.log('async error:', exp)
        } finally {
          this.loading = false
        }
      } else {
        this.afterRequestEnd(getData)
      }
    }

    afterRequestEnd(resp) {
      if (Array.isArray(resp)) {
        // 如果后台直接返回的是数组的话 说明不需要分页
        this.meta.pagination = false
        this.list = resp
      } else {
        this.total = resp.total
        this.list = resp.data
      }
    }

    clearSort() {
      this.table && this.table.clearSort()
    }

    clearSelection() {
      this.table && this.table.clearSelection()
    }
  }
</script>

<style lang="scss" scoped>
  .base-table {
    &--searchbox {
      padding: 20px 0;
    }
    &--toolbar {
      padding: 10px 0;
      text-align: left;
    }
    &--footer {
      width: 100%;
      padding: 20px 0;
      float: left;
      @at-root .pagination-bar {
        float: right;
      }
    }
  }
</style>
