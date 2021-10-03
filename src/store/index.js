import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { io } from 'socket.io/client-dist/socket.io'

export default createStore({
  state: {
    socket: io('http://localhost:3000'),
    username: '',
    players: [],
    events: [],
  },
  mutations: {
    username(state, payload) {
      state.username = payload
    },

    players(state, payload) {
      state.players = payload
    },
  },
  actions: {
    updatePlayers({ commit }, payload) {
      commit('players', payload)
    },

    setUserName({ commit }, payload) {
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

    pushEvent({ state }, payload) {
      state.events.push(payload)
    },

    clearEvents({ state }) {
      state.events = []
    },
  },
  getters: {
    events: (state) => state.events,
    socket: (state) => state.socket,
    username: (state) => state.username,
    players: (state) => state.players,
  },

  plugins: [
    createPersistedState({
      paths: ['username', 'events'],
    })
  ],
})
