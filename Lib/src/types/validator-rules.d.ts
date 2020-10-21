/*
 * @Author: JohnYang
 * @Date: 2020-10-12 22:53:28
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 09:32:07
 */
export type ValidatorFunction = (
  rule: IValidatorRule,
  value: any,
  callback: Function,
  model: object
) => void | string;

export interface IValidatorRule {
  required?: boolean;

  type?: string;

  validator?: ValidatorFunction;

  pattern?: RegExp;

  len?: number;

  message?: string;

  trigger?: string | string[];
}

export type ValidatorRules = IValidatorRule | IValidatorRule[];
