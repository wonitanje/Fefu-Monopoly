<template>
  <div class="chip">
    <template v-for="(player, ind) in players" :key="ind">
      <div
        v-if="player.position % 34 == idx"
        class="chip__item"
        :class="`player-color-${ind}`"
      >
        {{ ind + 1 }}
      </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
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
  }
}
</style>