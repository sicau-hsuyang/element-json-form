/*
 * @Author: JohnYang
 * @Date: 2020-10-15 09:29:11
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-15 09:37:51
 */
export interface IControlEvent {
  type: string;

  handler: Function;
}

export type EventHandler = (propValue, model, controlRefs) => void;
