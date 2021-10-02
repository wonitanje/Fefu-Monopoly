<template>
  <div class="chip">
    <!-- {{ idx }} -->
    <!-- <div class="chip__block top"> -->
    <template v-for="(player, ind) in players" :key="ind">
      <div
        v-if="player.position % 34 == idx"
        class="chip__item"
        :class="`chip__item-${ind}`"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    idx: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters(['players']),
  }
}
</script>

<style lang="scss" scoped>
.chip {
  padding: 8px;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  width: 100%;
  height: 100%;

  &__block {
    display: flex;
    justify-content: space-between;

    &.top {
      align-items: flex-start;
    }

    &.bot {
      align-items: flex-end;
    }
  }

  &__item {
    width: 1.5em;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    border: 1px solid #212121;

    &:nth-child(3),
    &:nth-child(4) {
      align-self: flex-end;
    }
    &:nth-child(even) {
      justify-self: flex-end;
    }

    &-0 {
      background-color: #0fdb7c;
    }
    &-1 {
      background-color: #df35b4;
    }
    &-2 {
      background-color: #e72d43;
    }
    &-3 {
      background-color: #e7eb1b;
    }
  }
}
</style>