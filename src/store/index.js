import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    user
  },
  getters
})

export default store