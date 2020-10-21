/*
 * @Author: JohnYang
 * @Date: 2020-10-15 09:26:54
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 10:54:14
 */

import { IValidatorRule } from "./validator-rules";

export interface InputProps {
  
  tag: string;

  label: string;

  labelWidth?: string;

  showLabel?: boolean;

  changeTag: true;

  defaultValue:? any;

  required?: boolean;

  layout?: string;

  span?: number;


  // 正则校验规则

  rules?: IValidatorRule[];

  events?: [];
}
