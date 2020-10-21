import { IValidatorRule } from "./validator-rules";

/*
 * @Author: JohnYang
 * @Date: 2020-10-13 21:56:19
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 20:14:57
 */
export interface IFormItem {
  label: string;

  type?: string;

  multi?: boolean;

  slot?: string;

  defaultValue?: any;

  span?: number;

  events: {
    [prop: string]: Function;
  };

  rules?: IValidatorRule | IValidatorRule[];

  [prop: string]: any;
}

export interface IFormModel {
  [prop: string]: any | any[];
}

export interface IFormLayout {
  gutter: number;
}

export interface IFormJson {
  [prop: string]: IFormItem;
}
