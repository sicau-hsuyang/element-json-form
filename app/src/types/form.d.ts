import { IValidatorRule } from "./validator-rules";

/*
 * @Author: JohnYang
 * @Date: 2020-10-13 21:56:19
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-21 16:48:23
 */
export interface IFormItem {
  label: string;

  tag?: string;

  type?: string;

  multiple?: boolean;

  slot?: string;

  defaultValue?: any;

  span?: number;

  events: {
    [prop: string]: string | Function;
  };

  rules?: IValidatorRule | IValidatorRule[];

  [prop: string]: any;
}

export interface IFormModel {
  [prop: string]: any | any[];
}

export interface IFormConfig {
  gutter: number;
}

export interface IFormJson {
  [prop: string]: IFormItem;
}
