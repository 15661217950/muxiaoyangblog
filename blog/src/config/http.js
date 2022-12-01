/*
 * @Author: zheng yong tao
 * @Date: 2022-01-15 23:22:04
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-03 22:23:32
 * @Description:
 */
import Vue from "vue";
import VueResource from "vue-resource";
import { requestLog, responseLog } from "../util/console";
import { key } from "./config";
Vue.use(VueResource);
export class myHttp {
  constructor(_this) {
    this.that = _this;
  }
  async httpGet(path, params) {
    let cars = JSON.stringify(params);
    let encrypts = this.$aes.encrypt(cars, key);
    if (location.href.startsWith("http://localhost")) {
      requestLog("request-get", path.split("/").pop(), params);
    }
    let res = await this.$http.get(
      path,
      { params: { param: encrypts } },
      { emulateJSON: true }
    );

    let dess = "";
    try {
      dess = this.$aes.decrypt(res.body, key);
      dess = JSON.parse(dess);
    } catch (err) {
      dess = { code: 0, msg: "操作失败" };
    }

    if (location.href.startsWith("http://localhost"))
      responseLog("response-get", path.split("/").pop(), dess);
    return Promise.resolve(dess);
  }

  async httpPost(path, params) {
    let cars = JSON.stringify(params);
    let encrypts = this.$aes.encrypt(cars, key);
    if (location.href.startsWith("http://localhost"))
      requestLog("request-post", path.split("/").pop(), params);

    let res = await this.$http.post(
      path,
      { param: encrypts },
      { emulateJSON: true }
    );

    let dess = "";
    try {
      dess = this.$aes.decrypt(res.body, key);
      dess = JSON.parse(dess);
    } catch (err) {
      dess = { code: 0, msg: "操作失败" };
    }

    if (location.href.startsWith("http://localhost"))
      responseLog("response-post", path.split("/").pop(), dess);
    return Promise.resolve(dess);
  }
}
