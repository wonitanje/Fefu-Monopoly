<template>
  <main class="board">
    <v-cell v-for="(cell, idx) in cells" :key="idx" v-bind="cell" />
    <v-player class="player player-top player-left" />
    <v-player class="player player-top player-right" />
    <v-player class="player player-bot player-left" />
    <v-player class="player player-bot player-right" />
  </main>
</template>

<script>
import cells from '@/cells.js'
import vCell from '@/components/vCell.vue'
import vCube from '@/components/vCube.vue'
import vPlayer from '@/components/vPlayer.vue'

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
