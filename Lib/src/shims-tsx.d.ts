/*
 * @Author: JohnYang
 * @Date: 2020-10-13 21:07:06
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-13 21:07:08
 */
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
