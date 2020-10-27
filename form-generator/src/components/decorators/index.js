/*
 * @Author: JohnYang
 * @Date: 2020-10-26 17:13:58
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-27 21:42:23
 */

import { parseFunc } from "@/utils";

export function toString(val) {
  return String(val);
}

export function toNumber(val) {
  var numVal = Number.parseFloat(val);
  return Number.isNaN(numVal) ? 0 : numVal;
}

export function toBoolean(val) {
  return !!val;
}

export function toObject(val) {
  return new Object(val);
}

export function toFunction(val) {
  return parseFunc(val);
}

export var transformRules = [
  {
    label: "默认",
    value: null
  },
  {
    label: "Boolean",
    value: "toBoolean"
  },
  {
    label: "Number",
    value: "toNumber"
  },
  {
    label: "Object",
    value: "toObject"
  },
  {
    label: "String",
    value: "toString"
  },
  {
    label: "Function",
    value: "toFunction"
  }
];
