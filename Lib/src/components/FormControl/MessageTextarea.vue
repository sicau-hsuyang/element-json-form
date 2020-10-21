<!--
 * @Author: JohnYang
 * @Date: 2020-08-22 10:00:34
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-13 21:11:12
-->
<template>
  <div class="textarea-control" :class="{ 'has-message': showTips }">
    <el-input
      v-bind="$attrs"
      v-model.trim="input"
      type="textarea"
      @input="handleInput"
      :rows="4"
      resize="none"
    ></el-input>
    <span class="textarea-control-tips" v-if="showTips"
      >{{ len }}/{{ maxLength }}</span
    >
  </div>
</template>

<script lang="ts">
import { Input } from "element-ui";
import { Vue, Prop, Watch, Component } from "vue-property-decorator";

@Component({
  name: "MessageTextarea",
  components: {
    ElInput: Input,
  },
})
export default class MessageTextarea extends Vue {
  input: string = "";

  get len() {
    return typeof this.input === "string" ? this.input.length : 0;
  }

  @Prop({
    type: String,
    required: true,
  })
  value!: string;

  @Prop({
    type: Number,
    required: false,
    default: 300,
  })
  maxLength!: number;

  @Prop({
    required: false,
    type: Boolean,
    default: true,
  })
  showTips!: boolean;

  created() {
    this.input = this.value;
    this.setWacth();
  }

  setWacth() {
    this.$watch("value", function () {
      var val = this.value;
      if (typeof val !== "string") {
        val = String(val);
      }
      this.input = val;
    });
  }

  handleInput() {
    if (this.input.length >= this.maxLength) {
      this.input = this.input.substring(0, this.maxLength);
    }
    this.$emit("input", this.input);
  }
}
</script>

<style lang="scss" scoped>
.has-message {
  ::v-deep {
    .el-textarea__inner {
      padding-bottom: 20px;
    }
  }
}

.textarea-control {
  width: 100%;
  position: relative;
  ::v-deep {
    .el-textarea__inner {
      border-radius: unset;
    }
  }
  &-tips {
    position: absolute;
    right: 8px;
    bottom: 5px;
    font-size: 12px;
    font-weight: 400;
    color: #c0c4ccff;
    line-height: 20px;
  }
}
</style>
