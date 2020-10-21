/*
 * @Author: JohnYang
 * @Date: 2020-10-15 09:26:54
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-18 11:55:10
 */

import { IValidatorRule } from "./validator-rules";

export interface InputProps {
  label: string;

  labelWidth?: string;

  showLabel?: boolean;

  changeTag: true;

  tag: string;

  tagIcon: "input";

  defaultValue: any;

  required: true;

  layout: "colFormItem";

  span: 24;

  document: "https://element.eleme.cn/#/zh-CN/component/input";
  // 正则校验规则

  rules?: IValidatorRule[];

  events: [];
}
