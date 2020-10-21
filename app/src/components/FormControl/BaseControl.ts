/*
 * @Author: JohnYang
 * @Date: 2020-10-15 12:19:30
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 12:37:51
 */
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "BaseControl"
})
export default class BaseControl extends Vue {
  @Prop({
    required: true
  })
  value!: any;

  content: any = "";

  created() {
    this.content = this.value;
    this.setWatch();
  }

  setWatch() {
    this.$watch("value", function() {
      this.content = this.value;
    });
    this.$watch("content", function() {
      this.$emit("input", this.content);
    });
  }
}
