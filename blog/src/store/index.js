/*
 * @Author: zheng yong tao
 * @Date: 2022-03-03 21:48:31
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-03 21:49:16
 * @Description:
 */
import Vue from "vue";
import vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import state from "./states";
import getters from "./getters";
// import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);
export default new vuex.Store({
  actions,
  mutations,
  state,
  getters
  // plugins: [createPersistedState()]
});
