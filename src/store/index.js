import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
// import { io } from 'socket.io/client-dist/socket.io.js'
import { io } from 'socket.io/client-dist/socket.io'

export default createStore({
  state: {
    socket: io('http://localhost:3000'),
    username: '',
    players: [],
  },
  mutations: {
    username(state, payload) {
      state.username = payload
    }
  },
  actions: {
    updatePlayers({ state }, payload) {
      state.players = payload
    },

    setUserName({ commit }, payload) {
      console.log('set', payload)
      commit('username', payload)
    },

    movePlayer({ state }, payload) {
      const { key, value } = payload
      state.players[key].position += value
      state.players[key].position %= 33
    },

    changeSkip({ state }, payload) {
      const { key, value } = payload
      state.players[key].skip += value
    },

    changeCash({ state }, payload) {
      const { key, value } = payload
      state.players[key].cash += value
    },
    getTax({ state }, payload) {
      const { key, value } = payload
      state.players[key].cash *= value
    },
  },
  getters: {
    socket: (state) => state.socket,
    username: (state) => state.username,
    players: (state) => state.players,
  },

  plugins: [
    createPersistedState({
      paths: ['username'],
    })
  ],
})
