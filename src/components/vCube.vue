<template>
  <div class="cube">
    <div class="cube__display">{{ first }}</div>
    <div @click.stop="shuffleCubes" class="cube__btn">Бросить<br />кубики</div>
    <div class="cube__display">{{ second }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first: 0,
      second: 0,
    }
  },

  methods: {
    shuffleCubes() {
      this.first = Math.round(Math.random() * 5) + 1
      this.second = Math.round(Math.random() * 5) + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.cube {
  grid-row-start: 4;
  grid-row-end: 5;
  grid-column: 2 / 12;
  display: flex;
  justify-content: center;
  align-content: center;
  grid-gap: 8px;
  width: 100%;
  height: 100%;
  // flex: 1 1 auto;

  &__display,
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100%;
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