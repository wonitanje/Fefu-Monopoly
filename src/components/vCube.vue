<template>
  <div class="cube">
    <div class="cube__display">{{ values[0] }}</div>
    <div @click.stop="shuffleCubes" class="cube__btn">Бросить<br />кубики</div>
    <div class="cube__display">{{ values[1] }}</div>
    <div class="event">
      <div class="event__list">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ullam autem, recusandae hic corrupti quisquam at, corporis quo inventore ut quam mollitia! Quisquam eveniet sit libero, accusantium cupiditate cum nostrum.
      </div>
    </div>
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

  methods: {
    async shuffleCubes() {
      this.$emit('thow')
      // const turns = Math.round(Math.random() * 10) + 10
      // let iter = 0

      // const shuffle = () => {
      //   iter++
      //   if (iter <= turns) {
      //     this.first = Math.round(Math.random() * 5) + 1
      //     this.second = Math.round(Math.random() * 5) + 1
      //   }
      //   if (iter < turns) {
      //     setTimeout(shuffle, iter * iter * 3 / (turns - iter))
      //   } else {
      //     this.$emit('thow', this.first, this.second)
      //   }
      // }

      // this.socket.emit('thow')
      // shuffle()
    }
  }
}
</script>

<style lang="scss" scoped>

template {
  display: flex;
  justify-content: space-between;
}

.event {
  width: 320px;
  height: 80px;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #212121;

  &__list {
    padding: 15px 10px;
    height: 100%;
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;

    & > p::nth-child(even) {
      background-color: #f6f6f6;
    }
  }
}

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