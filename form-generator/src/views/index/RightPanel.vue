<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <a
        class="document-link"
        target="_blank"
        :href="documentLink"
        title="查看组件文档"
      >
        <i class="el-icon-link" />
      </a>
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <template v-if="activeData">
          <InputMeta
            :active-data="activeData"
            @tag-change="tagChange"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-input' &&
                activeData.type == 'input'
            "
          ></InputMeta>
          <AutocompleteMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-autocomplete'
            "
          ></AutocompleteMeta>
          <TextareaMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-input' &&
                activeData.type == 'textarea'
            "
          ></TextareaMeta>
          <PasswordMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-input' &&
                activeData.type == 'password'
            "
          ></PasswordMeta>
          <CounterMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-input-number'
            "
          ></CounterMeta>
          <SelectMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-select'
            "
          ></SelectMeta>
          <RadioMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-radio-group'
            "
          ></RadioMeta>
          <CheckboxMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-checkbox-group'
            "
          ></CheckboxMeta>
          <SwitchMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-switch'
            "
          ></SwitchMeta>

          <SliderMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-slider'
            "
          ></SliderMeta>

          <TimeMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-time-picker'
            "
          ></TimeMeta>

          <DateMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-date-picker' &&
                activeData.type != 'daterange'
            "
          ></DateMeta>

          <DaterangeMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-date-picker' &&
                activeData.type == 'daterange'
            "
          ></DaterangeMeta>

          <TableMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'form-table'
            "
          ></TableMeta>
          <RateMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' && showField && activeData.tag == 'el-rate'
            "
          ></RateMeta>
          <ColorMeta
            :active-data="activeData"
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-color-picker'
            "
          ></ColorMeta>

          <RowMeta
            v-if="
              activeData.layout === 'rowFormItem' &&
                currentTab === 'field' &&
                showField
            "
            :active-data="activeData"
          ></RowMeta>

          <TinymceMeta
            v-if="
              currentTab === 'field' && showField && activeData.tag == 'tinymce'
            "
            :active-data="activeData"
          ></TinymceMeta>

          <UploadMeta
            v-if="
              currentTab === 'field' &&
                showField &&
                activeData.tag == 'el-upload'
            "
            :active-data="activeData"
          ></UploadMeta>

          <el-form
            v-show="currentTab === 'field' && showField"
            size="small"
            label-width="90px"
          >
            <el-divider>基本信息</el-divider>
            <el-form-item label="组件类型">
              <el-select
                v-model="activeData.tagIcon"
                placeholder="请选择组件类型"
                :style="{ width: '100%' }"
                @change="tagChange"
              >
                <el-option-group
                  v-for="group in tagList"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.tagIcon"
                  >
                    <svg-icon class="node-icon" :icon-class="item.tagIcon" />
                    <span> {{ item.label }}</span>
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item v-if="activeData.prop !== undefined" label="字段名">
              <el-input
                v-model="activeData.prop"
                placeholder="请输入字段名（v-model）"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.componentName !== undefined"
              label="组件名"
            >
              {{ activeData.componentName }}
            </el-form-item>
            <el-form-item v-if="activeData.label !== undefined" label="标题">
              <el-input
                v-model="activeData.label"
                placeholder="请输入标题"
                @input="changeRenderKey"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.placeholder !== undefined"
              label="占位提示"
            >
              <el-input
                v-model="activeData.placeholder"
                placeholder="请输入占位提示"
                @input="changeRenderKey"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.startPlaceholder !== undefined"
              label="开始占位"
            >
              <el-input
                v-model="activeData.startPlaceholder"
                placeholder="请输入占位提示"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.endPlaceholder !== undefined"
              label="结束占位"
            >
              <el-input
                v-model="activeData.endPlaceholder"
                placeholder="请输入占位提示"
              />
            </el-form-item>
            <el-form-item v-if="activeData.span !== undefined" label="表单栅格">
              <el-slider
                v-model="activeData.span"
                :max="24"
                :min="1"
                :marks="{ 12: '' }"
                @change="spanChange"
              />
            </el-form-item>
            <el-form-item
              v-if="
                activeData.layout === 'rowFormItem' &&
                  activeData.gutter !== undefined
              "
              label="栅格间隔"
            >
              <el-input-number
                v-model="activeData.gutter"
                :min="0"
                placeholder="栅格间隔"
              />
            </el-form-item>
            <el-form-item
              v-if="
                activeData.layout === 'rowFormItem' &&
                  activeData.type !== undefined
              "
              label="布局模式"
            >
              <el-radio-group v-model="activeData.type">
                <el-radio-button label="default" />
                <el-radio-button label="flex" />
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="
                activeData.justify !== undefined && activeData.type === 'flex'
              "
              label="水平排列"
            >
              <el-select
                v-model="activeData.justify"
                placeholder="请选择水平排列"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in justifyOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                activeData.align !== undefined && activeData.type === 'flex'
              "
              label="垂直排列"
            >
              <el-radio-group v-model="activeData.align">
                <el-radio-button label="top" />
                <el-radio-button label="middle" />
                <el-radio-button label="bottom" />
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="activeData.labelWidth !== undefined"
              label="标签宽度"
            >
              <!-- <el-input
                v-model.number="activeData.labelWidth"
                type="number"
                placeholder="请输入标签宽度"
              /> -->
              <el-input-number
                :style="{ width: '100%' }"
                v-model.number="activeData.labelWidth"
                :min="0"
                label="请输入标签宽度"
              ></el-input-number>
            </el-form-item>

            <el-form-item
              v-if="activeData.style && activeData.style.width !== undefined"
              label="组件宽度"
            >
              <el-input
                v-model="activeData.style.width"
                placeholder="请输入组件宽度"
                clearable
              />
            </el-form-item>
            <el-form-item v-if="activeData.prop !== undefined" label="默认值">
              <el-input
                :value="setDefaultValue(activeData.defaultValue)"
                placeholder="请输入默认值"
                @input="onDefaultValueInput"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-checkbox-group'"
              label="至少应选"
            >
              <el-input-number
                :value="activeData.min"
                :min="0"
                placeholder="至少应选"
                @input="$set(activeData, 'min', $event ? $event : undefined)"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-checkbox-group'"
              label="最多可选"
            >
              <el-input-number
                :value="activeData.max"
                :min="0"
                placeholder="最多可选"
                @input="$set(activeData, 'max', $event ? $event : undefined)"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.slots && activeData.slots.prepend !== undefined"
              label="前缀"
            >
              <el-input
                v-model="activeData.slots.prepend"
                placeholder="请输入前缀"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.slots && activeData.slots.append !== undefined"
              label="后缀"
            >
              <el-input
                v-model="activeData.slots.append"
                placeholder="请输入后缀"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.prefixIcon !== undefined"
              label="前图标"
            >
              <el-input
                v-model="activeData.prefixIcon"
                placeholder="请输入前图标名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-thumb"
                  @click="openIconsDialog('prefixIcon')"
                >
                  选择
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="activeData.suffixIcon !== undefined"
              label="后图标"
            >
              <el-input
                v-model="activeData.suffixIcon"
                placeholder="请输入后图标名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-thumb"
                  @click="openIconsDialog('suffixIcon')"
                >
                  选择
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="
                activeData.icon !== undefined && activeData.tag === 'el-button'
              "
              label="按钮图标"
            >
              <el-input
                v-model="activeData.icon"
                placeholder="请输入按钮图标名称"
              >
                <el-button
                  slot="append"
                  icon="el-icon-thumb"
                  @click="openIconsDialog('icon')"
                >
                  选择
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-cascader'"
              label="选项分隔符"
            >
              <el-input
                v-model="activeData.separator"
                placeholder="请输入选项分隔符"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.autosize !== undefined"
              label="最小行数"
            >
              <el-input-number
                v-model="activeData.autosize.minRows"
                :min="1"
                placeholder="最小行数"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.autosize !== undefined"
              label="最大行数"
            >
              <el-input-number
                v-model="activeData.autosize.maxRows"
                :min="1"
                placeholder="最大行数"
              />
            </el-form-item>
            <el-form-item v-if="isShowMin" label="最小值">
              <el-input-number v-model="activeData.min" placeholder="最小值" />
            </el-form-item>
            <el-form-item v-if="isShowMax" label="最大值">
              <el-input-number v-model="activeData.max" placeholder="最大值" />
            </el-form-item>
            <el-form-item
              v-if="activeData.height !== undefined"
              label="组件高度"
            >
              <el-input-number
                v-model="activeData.height"
                placeholder="高度"
                @input="changeRenderKey"
              />
            </el-form-item>
            <el-form-item v-if="isShowStep" label="步长">
              <el-input-number v-model="activeData.step" placeholder="步数" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-input-number'"
              label="精度"
            >
              <el-input-number
                v-model="activeData.precision"
                :min="0"
                placeholder="精度"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-input-number'"
              label="按钮位置"
            >
              <el-radio-group v-model="activeData.controlsPosition">
                <el-radio-button label="">
                  默认
                </el-radio-button>
                <el-radio-button label="right">
                  右侧
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="activeData.maxlength !== undefined"
              label="最多输入"
            >
              <el-input
                v-model="activeData.maxlength"
                placeholder="请输入字符长度"
              >
                <template slot="append">
                  个字符
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="activeData.activeText !== undefined"
              label="开启提示"
            >
              <el-input
                v-model="activeData.activeText"
                placeholder="请输入开启提示"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.inactiveText !== undefined"
              label="关闭提示"
            >
              <el-input
                v-model="activeData.inactiveText"
                placeholder="请输入关闭提示"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.activeValue !== undefined"
              label="开启值"
            >
              <el-input
                :value="setDefaultValue(activeData.activeValue)"
                placeholder="请输入开启值"
                @input="onSwitchValueInput($event, activeValue)"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.inactiveValue !== undefined"
              label="关闭值"
            >
              <el-input
                :value="setDefaultValue(activeData.inactiveValue)"
                placeholder="请输入关闭值"
                @input="onSwitchValueInput($event, inactiveValue)"
              />
            </el-form-item>
            <el-form-item
              v-if="
                activeData.type !== undefined &&
                  'el-date-picker' === activeData.tag
              "
              label="时间类型"
            >
              <el-select
                v-model="activeData.type"
                placeholder="请选择时间类型"
                :style="{ width: '100%' }"
                @change="dateTypeChange"
              >
                <el-option
                  v-for="(item, index) in dateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="activeData.name !== undefined"
              label="文件字段名"
            >
              <el-input
                v-model="activeData.name"
                placeholder="请输入上传文件字段名"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.accept !== undefined"
              label="文件类型"
            >
              <el-select
                v-model="activeData.accept"
                placeholder="请选择文件类型"
                :style="{ width: '100%' }"
                clearable
              >
                <el-option label="图片" value="image/*" />
                <el-option label="视频" value="video/*" />
                <el-option label="音频" value="audio/*" />
                <el-option label="excel" value=".xls,.xlsx" />
                <el-option label="word" value=".doc,.docx" />
                <el-option label="pdf" value=".pdf" />
                <el-option label="txt" value=".txt" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="activeData.fileSize !== undefined"
              label="文件大小"
            >
              <el-input
                v-model.number="activeData.fileSize"
                placeholder="请输入文件大小"
              >
                <el-select
                  slot="append"
                  v-model="activeData.sizeUnit"
                  :style="{ width: '66px' }"
                >
                  <el-option label="KB" value="KB" />
                  <el-option label="MB" value="MB" />
                  <el-option label="GB" value="GB" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="activeData.action !== undefined"
              label="上传地址"
            >
              <el-input
                v-model="activeData.action"
                placeholder="请输入上传地址"
                clearable
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.listType !== undefined"
              label="列表类型"
            >
              <el-radio-group v-model="activeData.listType" size="small">
                <el-radio-button label="text">
                  text
                </el-radio-button>
                <el-radio-button label="picture">
                  picture
                </el-radio-button>
                <el-radio-button label="picture-card">
                  picture-card
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="
                activeData.type !== undefined && activeData.tag === 'el-button'
              "
              label="按钮类型"
            >
              <el-select v-model="activeData.type" :style="{ width: '100%' }">
                <el-option label="primary" value="primary" />
                <el-option label="success" value="success" />
                <el-option label="warning" value="warning" />
                <el-option label="danger" value="danger" />
                <el-option label="info" value="info" />
                <el-option label="text" value="text" />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="activeData.buttonText !== undefined"
              v-show="'picture-card' !== activeData.listType"
              label="按钮文字"
            >
              <el-input
                v-model="activeData.buttonText"
                placeholder="请输入按钮文字"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-button'"
              label="按钮文字"
            >
              <el-input
                v-model="activeData.slots.default"
                placeholder="请输入按钮文字"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.rangeSeparator !== undefined"
              label="分隔符"
            >
              <el-input
                v-model="activeData.rangeSeparator"
                placeholder="请输入分隔符"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.pickerOptions !== undefined"
              label="时间段"
            >
              <el-input
                v-model="activeData.pickerOptions.selectableRange"
                placeholder="请输入时间段"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.format !== undefined"
              label="时间格式"
            >
              <el-input
                :value="activeData.format"
                placeholder="请输入时间格式"
                @input="setTimeValue($event)"
              />
            </el-form-item>
            <template
              v-if="
                ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(
                  activeData.tag
                ) > -1
              "
            >
              <el-divider>选项</el-divider>
              <draggable
                :list="activeData.options"
                :animation="340"
                group="selectItem"
                handle=".option-drag"
              >
                <div
                  v-for="(item, index) in activeData.options"
                  :key="index"
                  class="select-item"
                >
                  <div class="select-line-icon option-drag">
                    <i class="el-icon-s-operation" />
                  </div>
                  <el-input
                    v-model="item.label"
                    placeholder="选项名"
                    size="small"
                  />
                  <el-input
                    placeholder="选项值"
                    size="small"
                    :value="item.value"
                    @input="setOptionValue(item, $event)"
                  />
                  <div
                    class="close-btn select-line-icon"
                    @click="activeData.options.splice(index, 1)"
                  >
                    <i class="el-icon-remove-outline" />
                  </div>
                </div>
              </draggable>
              <div style="margin-left: 20px;">
                <el-button
                  style="padding-bottom: 0"
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  @click="addSelectItem"
                >
                  添加选项
                </el-button>
              </div>
              <el-divider />
            </template>

            <template
              v-if="['el-cascader', 'el-table'].includes(activeData.tag)"
            >
              <el-divider>选项</el-divider>
              <el-form-item v-if="activeData.dataType" label="数据类型">
                <el-radio-group v-model="activeData.dataType" size="small">
                  <el-radio-button label="dynamic">
                    动态数据
                  </el-radio-button>
                  <el-radio-button label="static">
                    静态数据
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>

              <template v-if="activeData.dataType === 'dynamic'">
                <el-form-item label="接口地址">
                  <el-input
                    v-model="activeData.url"
                    :title="activeData.url"
                    placeholder="请输入接口地址"
                    clearable
                    @blur="$emit('fetch-data', activeData)"
                  >
                    <el-select
                      slot="prepend"
                      v-model="activeData.method"
                      :style="{ width: '85px' }"
                      @change="$emit('fetch-data', activeData)"
                    >
                      <el-option label="get" value="get" />
                      <el-option label="post" value="post" />
                      <el-option label="put" value="put" />
                      <el-option label="delete" value="delete" />
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item label="数据位置">
                  <el-input
                    v-model="activeData.dataPath"
                    placeholder="请输入数据位置"
                    @blur="$emit('fetch-data', activeData)"
                  />
                </el-form-item>

                <template v-if="activeData.props && activeData.props.props">
                  <el-form-item label="标签键名">
                    <el-input
                      v-model="activeData.props.props.label"
                      placeholder="请输入标签键名"
                    />
                  </el-form-item>
                  <el-form-item label="值键名">
                    <el-input
                      v-model="activeData.props.props.value"
                      placeholder="请输入值键名"
                    />
                  </el-form-item>
                  <el-form-item label="子级键名">
                    <el-input
                      v-model="activeData.props.props.children"
                      placeholder="请输入子级键名"
                    />
                  </el-form-item>
                </template>
              </template>

              <!-- 级联选择静态树 -->
              <el-tree
                v-if="activeData.dataType === 'static'"
                draggable
                :data="activeData.options"
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent"
              />
              <div
                v-if="activeData.dataType === 'static'"
                style="margin-left: 20px"
              >
                <el-button
                  style="padding-bottom: 0"
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  @click="addTreeItem"
                >
                  添加父级
                </el-button>
              </div>
              <el-divider />
            </template>

            <el-form-item
              v-if="activeData.optionType !== undefined"
              label="选项样式"
            >
              <el-radio-group v-model="activeData.optionType">
                <el-radio-button label="default">
                  默认
                </el-radio-button>
                <el-radio-button label="button">
                  按钮
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="activeData.activeColor !== undefined"
              label="开启颜色"
            >
              <el-color-picker v-model="activeData.activeColor" />
            </el-form-item>
            <el-form-item
              v-if="activeData.inactiveColor !== undefined"
              label="关闭颜色"
            >
              <el-color-picker v-model="activeData.inactiveColor" />
            </el-form-item>

            <el-form-item
              v-if="
                activeData.showLabel !== undefined &&
                  activeData.labelWidth !== undefined
              "
              label="显示标签"
            >
              <el-switch v-model="activeData.showLabel" />
            </el-form-item>
            <el-form-item
              v-if="activeData.showPassword !== undefined"
              label="显示密码"
            >
              <el-switch v-model="activeData.showPassword" />
            </el-form-item>
            <el-form-item
              v-if="activeData.branding !== undefined"
              label="品牌烙印"
            >
              <el-switch
                v-model="activeData.branding"
                @input="changeRenderKey"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.allowHalf !== undefined"
              label="允许半选"
            >
              <el-switch v-model="activeData.allowHalf" />
            </el-form-item>
            <el-form-item
              v-if="activeData.showText !== undefined"
              label="辅助文字"
            >
              <el-switch
                v-model="activeData.showText"
                @change="rateTextChange"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.showScore !== undefined"
              label="显示分数"
            >
              <el-switch
                v-model="activeData.showScore"
                @change="rateScoreChange"
              />
            </el-form-item>
            <el-form-item
              v-if="activeData.showStops !== undefined"
              label="显示间断点"
            >
              <el-switch v-model="activeData.showStops" />
            </el-form-item>
            <el-form-item
              v-if="activeData.range !== undefined"
              label="范围选择"
            >
              <el-switch v-model="activeData.range" @change="rangeChange" />
            </el-form-item>
            <el-form-item
              v-if="
                activeData.border !== undefined &&
                  activeData.optionType === 'default'
              "
              label="是否带边框"
            >
              <el-switch v-model="activeData.border" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-color-picker'"
              label="颜色格式"
            >
              <el-select
                v-model="activeData.colorFormat"
                placeholder="请选择颜色格式"
                :style="{ width: '100%' }"
                clearable
                @change="colorFormatChange"
              >
                <el-option
                  v-for="(item, index) in colorFormatOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="
                activeData.size !== undefined &&
                  (activeData.optionType === 'button' ||
                    activeData.border ||
                    activeData.tag === 'el-color-picker' ||
                    activeData.tag === 'el-button')
              "
              label="组件尺寸"
            >
              <el-radio-group v-model="activeData.size">
                <el-radio-button label="medium">
                  中等
                </el-radio-button>
                <el-radio-button label="small">
                  较小
                </el-radio-button>
                <el-radio-button label="mini">
                  迷你
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              v-if="activeData.showWordLimit !== undefined"
              label="输入统计"
            >
              <el-switch v-model="activeData.showWordLimit" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-input-number'"
              label="严格步数"
            >
              <el-switch v-model="activeData.stepStrictly" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-cascader'"
              label="任选层级"
            >
              <el-switch v-model="activeData.props.props.checkStrictly" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-cascader'"
              label="是否多选"
            >
              <el-switch v-model="activeData.props.props.multiple" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-cascader'"
              label="展示全路径"
            >
              <el-switch v-model="activeData.showAllLevels" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-cascader'"
              label="可否筛选"
            >
              <el-switch v-model="activeData.filterable" />
            </el-form-item>
            <el-form-item
              v-if="activeData.clearable !== undefined"
              label="能否清空"
            >
              <el-switch v-model="activeData.clearable" />
            </el-form-item>
            <el-form-item
              v-if="activeData.showTip !== undefined"
              label="显示提示"
            >
              <el-switch v-model="activeData.showTip" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-upload'"
              label="多选文件"
            >
              <el-switch v-model="activeData.multiple" />
            </el-form-item>
            <el-form-item
              v-if="activeData.autoUpload !== undefined"
              label="自动上传"
            >
              <el-switch v-model="activeData.autoUpload" />
            </el-form-item>
            <el-form-item
              v-if="activeData.readonly !== undefined"
              label="是否只读"
            >
              <el-switch v-model="activeData.readonly" />
            </el-form-item>
            <el-form-item
              v-if="activeData.disabled !== undefined"
              label="是否禁用"
            >
              <el-switch v-model="activeData.disabled" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-select'"
              label="能否搜索"
            >
              <el-switch v-model="activeData.filterable" />
            </el-form-item>
            <el-form-item
              v-if="activeData.tag === 'el-select'"
              label="是否多选"
            >
              <el-switch
                v-model="activeData.multiple"
                @change="multipleChange"
              />
            </el-form-item>

            <template v-if="activeData.layoutTree">
              <el-divider>布局结构树</el-divider>
              <el-tree
                :data="[activeData]"
                :props="layoutTreeProps"
                node-key="renderKey"
                default-expand-all
                draggable
              >
                <span slot-scope="{ node, data }">
                  <span class="node-label">
                    <svg-icon
                      class="node-icon"
                      :icon-class="data ? data.tagIcon : data.tagIcon"
                    />
                    {{ node.label }}
                  </span>
                </span>
              </el-tree>
            </template>

            <template v-if="Array.isArray(activeData.rules)">
              <el-divider>验证信息</el-divider>
              <div
                v-for="(item, index) in activeData.rules"
                :key="index"
                class="reg-item"
              >
                <span class="close-btn" @click="removeCurrentRule(index)">
                  <i class="el-icon-close" />
                </span>
                <el-form-item label="必选">
                  <form-control
                    v-model="item.required"
                    type="select"
                    :options="requiredOptions"
                  ></form-control>
                </el-form-item>
                <el-form-item label="规则类型">
                  <form-control
                    v-model="item.method"
                    :options="validRuleOptions"
                    @change="handleValieRuleChange(item)"
                    type="select"
                  ></form-control>
                </el-form-item>
                <el-form-item label="触发器">
                  <form-control
                    v-model="item.trigger"
                    :options="triggerOptions"
                    multiple
                    type="select"
                  ></form-control>
                </el-form-item>
                <template v-if="item.method">
                  <el-form-item label="类型">
                    <form-control
                      v-model="item.type"
                      type="select"
                      :options="asyncValidatorProvideTypes"
                      placeholder="请选择数据类型"
                    />
                  </el-form-item>
                  <el-form-item label="表达式">
                    <el-input v-model="item.pattern" placeholder="请输入正则" />
                  </el-form-item>
                  <el-form-item label="错误提示" style="margin-bottom:0">
                    <el-input
                      v-model="item.message"
                      placeholder="请输入错误提示"
                    />
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item label="验证器">
                    <form-control
                      type="textarea"
                      v-model="item.validator"
                    ></form-control>
                  </el-form-item>
                </template>
              </div>
              <div style="margin-left: 20px">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  @click="addValidateRule"
                >
                  添加规则
                </el-button>
              </div>
            </template>
            <template v-if="activeData.events">
              <div>
                <el-divider>事件</el-divider>
              </div>
              <div
                v-for="eventItem in activeData.events"
                :key="eventItem.type"
                class="reg-item"
              >
                <span class="close-btn" @click="removeCurrentEvent(index)">
                  <i class="el-icon-close" />
                </span>
                <el-form-item label="事件类型">
                  <form-control
                    v-model="eventItem.type"
                    type="select"
                    :options="getControlEvents(activeData.tag)"
                  ></form-control>
                </el-form-item>
                <el-form-item label="处理器">
                  <form-control
                    v-model="eventItem.handler"
                    placeholder="请输入事件处理器"
                    type="textarea"
                  ></form-control>
                </el-form-item>
              </div>
              <div style="margin-left: 20px">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  @click="addEvent"
                >
                  添加事件
                </el-button>
              </div>
            </template>
          </el-form>
          <!-- 表单属性 -->
          <form-meta
            v-show="currentTab === 'form'"
            :form-conf="formConf"
          ></form-meta>
        </template>
        <div v-else class="empty-panel">
          从左侧拖入或点选组件进行表单设计
        </div>
      </el-scrollbar>
    </div>

    <monaco-editor-dialog
      @monaco-change="broadcastEvent"
      ref="monacoEditor"
    ></monaco-editor-dialog>
    <treeNode-dialog
      :visible.sync="dialogVisible"
      title="添加选项"
      @commit="addNode"
    />
    <icons-dialog
      :visible.sync="iconsVisible"
      :current="activeData && activeData[currentIconModel]"
      @select="setIcon"
    />
  </div>
</template>

<script>
import InputMeta from "@/components/setting-controls/InputMeta.vue";
import AutocompleteMeta from "@/components/setting-controls/AutoCompleteMeta.vue";
import TextareaMeta from "@/components/setting-controls/TextareaMeta.vue";
import PasswordMeta from "@/components/setting-controls/PasswordMeta.vue";
import CounterMeta from "@/components/setting-controls/CounterMeta.vue";
import SelectMeta from "@/components/setting-controls/SelectMeta.vue";
import FormControl from "@/components/controls/FormControl.vue";
import RadioMeta from "@/components/setting-controls/RadioMeta.vue";
import CheckboxMeta from "@/components/setting-controls/CheckboxMeta.vue";
import SwitchMeta from "@/components/setting-controls/SwitchMeta.vue";
import SliderMeta from "@/components/setting-controls/SliderMeta.vue";
import TimeMeta from "@/components/setting-controls/TimeMeta.vue";
import TimerangeMeat from "@/components/setting-controls/TimerangeMeta.vue";
import RateMeta from "@/components/setting-controls/RateMeta.vue";
import ColorMeta from "@/components/setting-controls/ColorMeta.vue";
import DateMeta from "@/components/setting-controls/DateMeta.vue";
import DaterangeMeta from "@/components/setting-controls/DaterangeMeta.vue";
import RowMeta from "@/components/setting-controls/RowMeta.vue";
import TinymceMeta from "@/components/setting-controls/TinymceMeta.vue";
import UploadMeta from "@/components/setting-controls/UploadMeta.vue";
import FormMeta from "@/components/setting-controls/FormMeta.vue";
import TableMeta from "@/components/setting-controls/TableMeta.vue";
const MonacoEditorDialog = () =>
  import("@/components/controls/MonacoEditorDialog.vue");
import TreeNodeDialog from "@/views/index/TreeNodeDialog";
import { isNumberStr } from "@/utils/index";
import IconsDialog from "./IconsDialog";
import {
  inputComponents,
  selectComponents,
  layoutComponents
} from "@/components/generator/config";
import { saveFormConf } from "@/utils/storage";

import {
  validRuleOptions,
  defaultRule,
  triggerOptions,
  getControlEvents,
  asyncValidatorProvideTypes,
  requiredOptions
} from "@/config";

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ["tinymce"];

export default {
  components: {
    TreeNodeDialog,
    MonacoEditorDialog,
    IconsDialog,
    FormControl,
    FormMeta,
    InputMeta,
    TextareaMeta,
    PasswordMeta,
    CounterMeta,
    SelectMeta,
    RadioMeta,
    CheckboxMeta,
    SwitchMeta,
    SliderMeta,
    TimeMeta,
    RateMeta,
    ColorMeta,
    DateMeta,
    DaterangeMeta,
    RowMeta,
    AutocompleteMeta,
    TinymceMeta,
    UploadMeta,
    TableMeta
  },
  provide() {
    var _this = this;
    return {
      panel: _this
    };
  },
  props: ["showField", "activeData", "formConf"],
  data() {
    return {
      validRuleOptions,
      triggerOptions,
      asyncValidatorProvideTypes,
      requiredOptions,
      currentTab: "field",
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: "日(date)",
          value: "date"
        },
        {
          label: "周(week)",
          value: "week"
        },
        {
          label: "月(month)",
          value: "month"
        },
        {
          label: "年(year)",
          value: "year"
        },
        {
          label: "日期时间(datetime)",
          value: "datetime"
        }
      ],
      dateRangeTypeOptions: [
        {
          label: "日期范围(daterange)",
          value: "daterange"
        },
        {
          label: "月范围(monthrange)",
          value: "monthrange"
        },
        {
          label: "日期时间范围(datetimerange)",
          value: "datetimerange"
        }
      ],
      colorFormatOptions: [
        {
          label: "hex",
          value: "hex"
        },
        {
          label: "rgb",
          value: "rgb"
        },
        {
          label: "rgba",
          value: "rgba"
        },
        {
          label: "hsv",
          value: "hsv"
        },
        {
          label: "hsl",
          value: "hsl"
        }
      ],
      justifyOptions: [
        {
          label: "start",
          value: "start"
        },
        {
          label: "end",
          value: "end"
        },
        {
          label: "center",
          value: "center"
        },
        {
          label: "space-around",
          value: "space-around"
        },
        {
          label: "space-between",
          value: "space-between"
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data;
          return data.componentName || `${config.label}: ${data.prop}`;
        }
      },
      currentUser: null
    };
  },
  computed: {
    monacoEditor() {
      return this.$refs.monacoEditor;
    },
    documentLink() {
      return this.activeData
        ? this.activeData.document
        : "https://element.eleme.cn/#/zh-CN/component/installation";
    },
    dateOptions() {
      if (!this.activeData) {
        return [];
      }
      if (
        this.activeData.type !== undefined &&
        this.activeData.tag === "el-date-picker"
      ) {
        if (this.activeData.startPlaceholder === undefined) {
          return this.dateTypeOptions;
        }
        return this.dateRangeTypeOptions;
      }
      return [];
    },
    tagList() {
      return [
        {
          label: "输入型组件",
          options: inputComponents
        },
        {
          label: "选择型组件",
          options: selectComponents
        }
      ];
    },
    activeTag() {
      return this.activeData && this.activeData.tag;
    },
    isShowMin() {
      return ["el-input-number", "el-slider"].indexOf(this.activeTag) > -1;
    },
    isShowMax() {
      return (
        ["el-input-number", "el-slider", "el-rate"].indexOf(this.activeTag) > -1
      );
    },
    isShowStep() {
      return ["el-input-number", "el-slider"].indexOf(this.activeTag) > -1;
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val);
      },
      deep: true
    }
  },
  methods: {
    broadcastEvent(content) {
      if (!this.currentUser) {
        return;
      }
      this.currentUser.$emit("monaco-change", content);
      this.currentUser = null;
    },
    setAsCurrentUser(user) {
      this.currentUser = user;
    },
    getControlEvents,
    handleValieRuleChange(item) {
      if (item.method) {
        item.validator = "";
      }
    },
    removeCurrentEvent(index) {
      this.activeData.events.splice(index, 1);
    },
    removeCurrentRule(index) {
      this.activeData.rules.splice(index, 1);
    },
    addEvent() {
      this.activeData.events.push({
        type: "",
        handler: ""
      });
    },
    addValidateRule() {
      var newRule = defaultRule();
      this.activeData.rules.push(newRule);
    },
    addSelectItem() {
      this.activeData.options.push({
        label: "",
        value: ""
      });
    },
    addTreeItem() {
      ++this.idGlobal;
      this.dialogVisible = true;
      this.currentNode = this.activeData.options;
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i
              on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i
              on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      );
    },
    append(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      this.dialogVisible = true;
      this.currentNode = data.children;
    },
    remove(node, data) {
      this.activeData.defaultValue = []; // 避免删除时报错
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    addNode(data) {
      this.currentNode.push(data);
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val;
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(",");
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === "boolean") {
        return `${val}`;
      }
      return val;
    },
    onDefaultValueInput(str) {
      if (Array.isArray(this.activeData.defaultValue)) {
        // 数组
        this.$set(
          this.activeData,
          "defaultValue",
          str.split(",").map(val => (isNumberStr(val) ? +val : val))
        );
      } else if (["true", "false"].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData, "defaultValue", JSON.parse(str));
      } else {
        // 字符串和数字
        this.$set(
          this.activeData,
          "defaultValue",
          isNumberStr(str) ? +str : str
        );
      }
    },
    onSwitchValueInput(val, name) {
      if (["true", "false"].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val));
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val);
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === "week" ? dateTimeFormat.date : val;
      this.$set(this.activeData, "defaultValue", null);
      this.$set(this.activeData, "value-format", valueFormat);
      this.$set(this.activeData, "format", val);
    },
    spanChange(val) {
      this.formConf.span = val;
    },
    multipleChange(val) {
      this.$set(this.activeData, "defaultValue", val ? [] : "");
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val);
    },
    rangeChange(val) {
      this.$set(
        this.activeData,
        "defaultValue",
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      );
    },
    rateTextChange(val) {
      if (val) this.activeData.showScore = false;
    },
    rateScoreChange(val) {
      if (val) this.activeData.showText = false;
    },
    colorFormatChange(val) {
      this.activeData.defaultValue = null;
      this.activeData.showAlpha = val.indexOf("a") > -1;
      this.activeData.renderKey = +new Date(); // 更新renderKey,重新渲染该组件
    },
    openMonacoDialog(content) {
      this.monacoEditor && this.monacoEditor.openDialog(content);
    },
    openIconsDialog(model) {
      this.iconsVisible = true;
      this.currentIconModel = model;
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val;
    },
    tagChange(target) {
      // var iComponents = Object.values(inputComponents);
      // var sComponents = Object.values(selectComponents);
      // let target = iComponents.find(item => item.tagIcon === tagIcon);
      // if (!target) target = sComponents.find(item => item.tagIcon === tagIcon);
      this.$emit("tag-change", target);
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.tag)) {
        this.activeData.renderKey = +new Date();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}

.empty-panel {
  text-align: center;
  margin-top: 100px;
}
</style>
