<template>
  <div class="player">
    <p class="name">Игрок: {{ name }}</p>
    <p class="cash">Бюджет: {{ cash }}</p>
    <p class="pos">Позиция: {{ position }}</p>
    <p class="skip">Отдых: {{ skip }}</p>
  </div>
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
    },
    position: {
      type: Number,
      default: 0,
    },
    skip: {
      type: Number,
      default: 0,
    },
  }
}
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: #fff;
  grid-row: 2 / 4;

  &-2,
  &-3 {
    grid-row: 5 / 7;
  }

  &-0,
  &-2, {
    grid-column: 2 / 7;
  }

  &-1,
  &-3 {
    grid-column: 7 / 12;
  }

  & p {
    padding: 5px 0;
    color: #fff;
    font-size: 18px;
  }
}
</style>