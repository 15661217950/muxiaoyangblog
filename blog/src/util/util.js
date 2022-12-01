/*
 * @Author: zheng yong tao
 * @Date: 2022-03-06 00:11:11
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-06 00:14:38
 * @Description:
 */

/**
 * @description 获取随机字母
 * @param {Number} size 长度
 * @return {String} size长度的随机字母串
 */
export const getRandomLetter = (size = 8) => {
  let res = "";
  for (let i = 0; i < size; i++) {
    let ind = Math.floor(Math.random() * 26);
    res += String.fromCharCode(ind + 65);
  }
  return res;
};
/**
 * @description 获取随机数字
 * @param {Number} size 长度
 * @return {String} size长度的随机数字串
 */
export const getRandomNumber = (size = 6) => {
  let res = Math.random();
  while (size--) res *= 10;
  return Math.ceil(res);
};
/**
 * @description 获取随机码
 * @param {Number} letterSize 字母长度
 * @param {Number} numberSize 数字长度
 * @return {String} letterSize+numberSize长度的随机数字字母串
 */
export const getUId = (letterSize = 8, numberSize = 6) => {
  let uId =
    getRandomLetter(letterSize) +
    (letterSize > 0 ? "-" : "") +
    getRandomNumber(numberSize);
  return uId;
};
/**
 * @description 表情转码
 * @param {String} strObj 表情字符串
 * @return {String} 转码字符串
 */
export const utf16toEntities = str => {
  if (!str) return str;
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, char => {
    let H;
    let L;
    let code;
    let s;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      s = `&#${code};`;
    } else {
      s = char;
    }
    return s;
  });
  return str;
};
/**
 * @description 表情解码
 * @param {String} strObj 转码字符串
 * @return {String} 解码字符串
 */
export const entitiestoUtf16 = strObj => {
  if (!strObj) return strObj;
  const patt = /&#\d+;/g;
  const arr = strObj.match(patt) || [];
  let H;
  let L;
  let code;
  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i];
    code = code.replace("&#", "").replace(";", "");
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xdc00;
    code = `&#${code};`;
    const s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
};
