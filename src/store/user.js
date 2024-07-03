import { setStore, getStore } from '@/utils/store'
import { login, getUserInfo } from '@/api/user'
import md5 from 'js-md5';
import {loginone} from '@/api/user.js'
const user = {
  state: {
    userInfo: {},
    token: getStore({ name: 'token' }) || '',
  },
  actions: {
    //根据用户账号登录
    Login ({ commit }, userInfo) {
      const user = {
        account:userInfo.account,
        password:md5(userInfo.password)
      };
      return new Promise((resolve,reject) => {
        login(user.account, user.password).then(res => {
          const data = res.data.data;
          
          commit('SET_TOKEN', data.token);
          resolve()
        }).catch(err => {
          reject(err);
        })
      })
    },
    //根据用户账号登录
    Login2 ({ commit }, openToken) {
      return new Promise((resolve,reject) => {
        loginone(openToken).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data.token);
          resolve()
        }).catch(err => {
          reject(err);
        })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = res.data.data;
          commit('SET_USERIFNO', data);
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore({ name: 'token', content: state.token })
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  }

}
export default user