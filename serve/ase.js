const crypto = require("crypto-js");
const config = require("./config");
const defaultKey = config.AES_conf.key;
/**
 * @util 加密、解密工具类
 */
/**
 * 解密
 * @param dataStr {string}
 * @param key {string}
 * @param iv {string}
 * @return {string}
 */
function Decrypt(dataStr, key = defaultKey) {
  key = crypto.enc.Utf8.parse(key);
  let decrypt = crypto.AES.decrypt(dataStr, key, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  });
  return crypto.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 加密
 * @param dataStr {string}
 * @param key {string}
 * @param iv {string}
 * @return {string}
 */
function Encrypt(dataStr, key = defaultKey) {
  key = crypto.enc.Utf8.parse(key);
  let srcs = crypto.enc.Utf8.parse(dataStr);
  let encrypted = crypto.AES.encrypt(srcs, key, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  });
  return encrypted.toString();
}
module.exports = { Decrypt, Encrypt };
