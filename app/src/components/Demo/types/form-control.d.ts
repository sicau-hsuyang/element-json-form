/*
 * @Author: JohnYang
 * @Date: 2020-10-13 21:13:03
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-13 21:13:29
 */
export interface IOptions {
  label: string;

  value: string | number;
}

export interface IGroups {
  label: string;

  options: IOptions[];
}
