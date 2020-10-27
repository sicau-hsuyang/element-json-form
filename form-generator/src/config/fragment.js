/*
 * @Author: JohnYang
 * @Date: 2020-10-20 19:35:48
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-27 21:17:49
 */
export const fetchSuggestionsFragment = `/**
 * 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
 * @param {String} queryString
 * @param {Function} callback
 */
function fetchSuggestions(queryString, callback) {

}`;

export const slotFragment = `/**
 *  插槽函数
 * @param {CreateElement} h
 * @return {VNode[]}
 */
function slotRender(h) {

}`;

export const validatorFragment = `/**
 * 自定义验证器方法
 * @param {*} rule 当前规则
 * @param {any} value 当前字段对应的值
 * @param {Function} callback 验证的回调函数
 * @param {Object} model 当前form的模型
 */
function validator(rule, value, callback, model) {

}`;

export const formControlEventHandlerFragment = `/**
 * 表格控件触发事件时候的回调函数
 * @param {any} propValue 当前控件绑定的值
 * @param {Object} model 当前form持有的模型
 * @param {VueComponent[]} controlRefs 当前form的表单控件的组件实例数组
 */
function eventHandler(propValue, model, controlRefs) {

}`;

export const fetchRemoteDataSourceFragment = `/**
 * 获取远程的数据
 * @param {any} propValue
 * @param {Object} model
 * @param {Object} controlsRefMap
 */
async function fetchData(propValue, model, controlsRefMap) {

}`;

export const tableGetDataFragment = `/**
 * 获取表格的数据
 * @param {Object} args
 */
function getData(args) {
  return [];
}`;

export const lifecycleFragment = `/**
 * 生命周期
 */
function callback() {

}`;

export const transformFragment = `/*
 * 转换函数
 */
function transform(val) {

}`;
