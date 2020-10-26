/*
 * @Author: JohnYang
 * @Date: 2020-10-26 17:13:58
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-26 17:15:46
 */
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
