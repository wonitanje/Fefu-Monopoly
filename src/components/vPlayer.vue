<template>
  <div class="player">
    <div v-if="name.length > 0" class="player__inner">
      <p class="name">Игрок {{ idx + 1 }}: {{ name }} {{ you }}</p>
      <p class="cash">Бюджет: {{ cash }}</p>
      <p class="pos">Позиция: {{ position }}</p>
      <p class="skip">Отдых: {{ skip }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    idx: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: ''
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
  },

  computed: {
    ...mapGetters(['username']),

    you() {
      if (this.name == this.username) 
        return '(Вы)'
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  grid-row: 2 / 4;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &-2,
  &-3 {
    grid-row: 5 / 7;
  }

  &-0,
  &-2 {
    grid-column: 2 / 5;
  }

  &-1,
  &-3 {
    grid-column: 5 / 9;
  }

  & p {
    padding: 5px 0;
    color: #fff;
    font-size: 18px;
  }
}
</style>