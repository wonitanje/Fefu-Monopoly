<template>
  <div class="cube">
    <div ref="cube1" class="cube__display">{{ values[0] }}</div>
    <div @click.stop="shuffleCubes" class="cube__btn">Бросить<br />кубики</div>
    <div ref="cube2" class="cube__display">{{ values[1] }}</div>
  </div>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      default: [0, 0]
    }
  },

  emits: ['thow'],

  setup() {
    return {
      mixing: false,
    }
  },

  updated() {
    this.mixing = false
  },

  methods: {
    async shuffleCubes() {
      let iter = 0
      const shuffle = () => {
        iter++
        this.$refs.cube1.textContent = Math.round(Math.random() * 5) + 1
        this.$refs.cube2.textContent = Math.round(Math.random() * 5) + 1
        if (iter == 12) {
          this.$emit('thow')
        }
        if (this.mixing) {
          setTimeout(shuffle, iter * iter * 5)
        }
      }
      
      this.mixing = true
      shuffle()
    }
  },
}
</script>

<style lang="scss" scoped>
.cube {
  grid-row: 4 / 5;
  grid-column: 2 / 8;
  display: flex;
  justify-content: center;
  align-content: center;
  grid-gap: 8px;
  width: 100%;
  height: 100%;

  &__display,
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    border: 2px solid #212121;
  }

  &__display {
    background-color: #fff;
    font-size: 30px;
  }

  &__btn {
    background-color: red;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>