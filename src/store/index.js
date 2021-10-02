import { createStore } from 'vuex'

export default createStore({
  state: {
    players: [{
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
    }, {
      name: '',
      position: 0,
      cash: 500,
      enterprises: [],
    }],
  },
  mutations: {
  },
  actions: {
    movePlayer({ state }, payload) {
      const { idx, shift } = payload
      state.players[idx].position += shift
    }
  },
  getters: {
    players: (state) => state.players,
    position: (state) => map(state.players, (player) => player.position),
    name: (state) => map(state.players, (player) => player.name),
    cash: (state) => map(state.players, (player) => player.cash),
    enterprise: (state) => map(state.players, (player) => player.enterprise),
  }
})
