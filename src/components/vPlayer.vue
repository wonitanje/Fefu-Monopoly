<template>
  <div>Игрок</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Игрок'
    },
    cash: {
      type: Number,
      default: 0,
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  // background-color: #fff;

  &-top {
    grid-row: 2 / 4;
  }

  &-bot {
    grid-row: 5 / 7;
  }

  &-left {
    grid-column: 2 / 7;
  }

  &-right {
    grid-column: 7 / 12;
  }
}
</style>