import { createStore } from 'vuex'

export default createStore({
  state: {
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    role: 0, // 0游客，1超级用户
    user: '',
    username: '',
    is_login: false
  },
  mutations: {
    set_token(state, args) {
      for (let [key,val] of Object.entries(args)) {
        state[key] = val
        sessionStorage.setItem(key, val)
      }

    },
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
    del_user(state) {
      state = {
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        role: 0, // 0游客，1超级用户
        user: '',
        id: '',
        is_login: false
      }
    },
    set_role(state, role) {
      if (role) {
        sessionStorage.setItem('role', role)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})