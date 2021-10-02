<template>
  <main class="board">
    <template v-for="cell in cells" :key="cell.ind">
      <v-cell v-bind="cell" />
    </template>
    <template v-for="(player, idx) in players" :key="idx">
      <v-player :class="`player-${idx}`" v-bind="player" />
    </template>
    <v-cube @thow="thowHandler" />
  </main>
</template>

<script>
import cells from '@/cells.js'
import vCell from '@/components/vCell.vue'
import vCube from '@/components/vCube.vue'
import vPlayer from '@/components/vPlayer.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    vCell,
    vCube,
    vPlayer,
  },

  setup() {
    return {
      cells
    }
  },

  data() {
    return {
      round: 0,
    }
  },

  computed: {
    ...mapGetters(['players']),

    currentIndex() {
      return this.round % 4
    },

    currentPlayer() {
      return this.players[this.currentIndex]
    }
  },

  methods: {
    ...mapActions(['movePlayer', 'getTax', 'changeCash', 'changeSkip']),

    thowHandler(num1, num2) {
      console.log(num1, num2, this.currentPlayer)
      const shift = num1 + num2
      if (this.currentPlayer.position + shift > 33)
        this.changeCash({ key: this.currentIndex, value: 150 })
      this.movePlayer({ key: this.currentIndex, value: shift })
      switch (this.currentPlayer.position) {
        case 3:
        case 23:
          this.changeSkip({ key: this.currentIndex, value: 2 })
          console.log('skip', this.currentPlayer.skip)
          this.round++
          return
        case 5:
        case 19:
          var tax = 0.9
        case 31:
          this.getTax({ key: this.currentIndex, value: tax || 0.8 })
          break
        case 8:
        case 14:
        case 28:
          console.log('lotery')
          const earn = Math.round(Math.random() * 100) * 10
          this.changeCash({ key: this.currentIndex, value: earn })
          break

        default:
          break
      }
      console.log('after switch')
      // if ([5, 19, 31].includes(this.currentPlayer.position)) {
      //   const tax = (this.currentPlayer.position == 31) ? 0.8 : 0.9
      //   this.getTax({ key: this.currentIndex, value: tax })
      // }
      // if ([3, 23].includes(this.currentPlayer.position)) {
      //   this.changeSkip({ key: this.currentIndex, value: 2 })
      //   return this.round++
      // }
      if (num1 == num2) {
        return
      }
      this.round++
      while (this.currentPlayer.skip) {
        this.changeSkip({ key: this.currentIndex, value: -1 })
        this.round++
      }
    }
  }
}
</script>

<style lang="scss">
// @import "@/assets/styles/index";

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
  // display: flex;
  // flex-direction: column;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(7, 1fr);
  //
  grid-gap: 5px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  border: 2px solid;
  background-color: #378805;
  box-shadow: 4px 4px 21px 5px rgba(0, 0, 0, 0.2);
}

// display: flex;
//   grid-gap: 5px;
//   justify-content: space-between;
//   height: calc(100% / 7);

//   &.family-b > .cell__familyottom {
//     flex-direction: row-reverse;
//   }
// }
</style>
