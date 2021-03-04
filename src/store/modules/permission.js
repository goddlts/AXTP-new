import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/menu'
import { traverseRoutes } from '@/utils/menu'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }) {
    return new Promise((resolve, reject) => {
      getRoutes().then(res => {
        if (res.code === 200) {
          const routes = traverseRoutes(res.data)
          commit('SET_ROUTES', routes)
          resolve(routes)
        } else {
          reject(res.message || new Error('get routes error'))
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
