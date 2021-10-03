<template>
  <main class="board">
    <template v-for="cell in cells" :key="cell.ind">
      <v-cell v-bind="cell" />
    </template>
    <template v-for="(player, idx) in playersPlug" :key="idx">
      <v-player :class="`player-${idx}`" v-bind="player" :idx="idx" />
    </template>
    <v-cube @thow="thowHandler" :values="cubes" />
    <event-list />
  </main>
</template>

<script>
import cells from '@/cells.js'
import vCell from '@/components/vCell.vue'
import vCube from '@/components/vCube.vue'
import vPlayer from '@/components/vPlayer.vue'
import EventList from '@/components/EventList.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    vCell,
    vCube,
    vPlayer,
    EventList,
  },

  setup() {
    return {
      cells
    }
  },

  created() {
    if (this.username.length == 0) {
      this.$router.push({ name: 'lobby' })
    }

    this.socket.on('throw', (values) => {
      this.cubes = values
    })
  },

  data() {
    return {
      round: 0,
      cubes: [0, 0],
    }
  },

  computed: {
    ...mapGetters(['players', 'username', 'socket']),

    currentIndex() {
      return this.round % 4
    },

    currentPlayer() {
      return this.players[this.currentIndex]
    },

    playersPlug() {
      const plug = [...this.players]
      if (this.players.length < 4) {
        while (plug.length < 4) {
          const playerModel = {
            name: '',
            cash: 0,
            enterprise: [],
            skip: 0,
          }
          plug.push(playerModel)
        }
      }
      return plug
    }
  },

  methods: {
    ...mapActions(['movePlayer', 'getTax', 'changeCash', 'changeSkip']),

    thowHandler() {
      this.socket.emit('throw')
    }
  }
}
</script>

<style lang="scss">
#app {
  padding: 20px;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.board {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 5px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: 2px solid;
  background-color: #378805;
  box-shadow: 4px 4px 21px 5px rgba(0, 0, 0, 0.2);
}
</style>
