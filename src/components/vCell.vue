<template>
  <div class="cell">
    <div
      v-if="family != null"
      class="cell__family"
      :class="`cell__family-${family}`"
    ></div>
    <div v-html="name" class="cell__name" />
    <div v-if="price != null" class="cell__price" :class="inhere">
      {{ price }}р
    </div>
    <v-chip :idx="ind" />
  </div>
</template>

<script>
import vChip from '@/components/vChip.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    ind: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: undefined
    },
    family: {
      type: String,
      default: undefined
    }
  },

  components: {
    vChip,
  },

  computed: {
    ...mapGetters(['players']),

    inhere() {
      const ind = this.players.map((player) => player.enterprise.includes(this.ind)).indexOf(true)
      if (ind == -1) {
        return ''
      }
      return `player-color-${ind}`
    }
  },
}
</script>

<style lang="scss" scoped>
.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #212121;
  background-color: #fff;
  overflow: hidden;

  &__name {
    padding: 0 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }

  &__price {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 18px;
  }
}

.cell__family {
  justify-self: flex-start;
  width: 100%;
  height: 18px;

  &-1 {
    background-color: darkgoldenrod;
  }
  &-2 {
    background-color: rgb(52, 214, 179);
  }
  &-3 {
    background-color: rgb(86, 138, 216);
  }
  &-4 {
    background-color: rgb(213, 224, 52);
  }
  &-5 {
    background-color: rgb(255, 159, 159);
  }
  &-6 {
    background-color: rgb(24, 187, 51);
  }
  &-7 {
    background-color: rgb(155, 28, 28);
  }
  &-8 {
    background-color: rgb(255, 123, 0);
  }
  &-9 {
    background-color: rgb(0, 47, 150);
  }
  &-10 {
    background-color: rgb(255, 0, 212);
  }
}
</style>