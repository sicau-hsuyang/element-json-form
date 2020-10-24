<!--
 * @Author: JohnYang
 * @Date: 2020-08-24 10:55:45
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-20 09:47:33
-->
<template>
  <div>
    <base-table-column-helper
      v-if="typeof config.render === 'function'"
      v-bind="{ $h: config.render }"
      :row="row"
      :index="index"
    />
    <div
      v-else-if="typeof config.html === 'function'"
      v-html="config.html(prop === 'operation' ? row : row[prop], row, index)"
    ></div>
    <span v-else>
      {{
        typeof config.formatter === 'function'
          ? renderContent(
              config.formatter(
                prop === 'operation' ? row : row[prop],
                row,
                index
              )
            )
          : renderContent(prop === 'operation' ? row : row[prop], row, index)
      }}
    </span>
  </div>
</template>

<script>
  import BaseTableColumnHelper from './table-column-helper'
  import DefaultConfig from './default-config'
  export default {
    name: 'TableColumnWrapper',
    components: {
      BaseTableColumnHelper,
    },
    props: {
      config: {
        required: true,
      },
      prop: {
        required: true,
      },
      row: {
        required: true,
      },
      index: {
        required: false,
      },
    },
    methods: {
      renderContent(content) {
        return typeof content !== 'undefined'
          ? content
          : DefaultConfig.EmptyValue
      },
    },
  }
</script>

<style></style>
