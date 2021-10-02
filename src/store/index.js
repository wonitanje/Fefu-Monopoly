import { createStore } from 'vuex'
// import { io } from 'socket.io/client-dist/socket.io.js'
import { io } from 'socket.io/client-dist/socket.io'

export default createStore({
  state: {
    socket: io('http://localhost:3000'),
    username: '',
    players: [{
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
      skip: 0,
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
      skip: 0,
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
      skip: 0,
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
      skip: 0,
    }],
  },
  mutations: {
  },
  actions: {
    setUserName({ state }, payload) {
      state.username = payload
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
    position: (state) => map(state.players, (player) => player.position),
    name: (state) => map(state.players, (player) => player.name),
    cash: (state) => map(state.players, (player) => player.cash),
    enterprise: (state) => map(state.players, (player) => player.enterprise),
  }
})
