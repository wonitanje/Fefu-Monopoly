<template>
  <div class="event">
    <div ref="eventList" class="event__list">
      <p v-for="(event, idx) in events" :key="idx">{{ event }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['events']),
  },

  mounted() {
    this.scrollBottom()
  },

  updated() {
    this.scrollBottom()
  },

  methods: {
    scrollBottom() {
      const list = this.$refs.eventList
      if (!list) return
      const lastEvent = list.children[list.childElementCount - 1]
      if (!lastEvent) return
      lastEvent.scrollIntoView({ behavior: "smooth", block: "end" })
    },
  },
}
</script>

<style lang="scss" scoped>
.event {
  grid-row: 2 / -2;
  grid-column: 8 / -2;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #212121;
  overflow: hidden;

  &__list {
    height: 100%;
    text-align: left;
    font-size: 16px;
    overflow-y: auto;

    p {
      padding: 7px 10px;
      background-color: #fff;

      &:nth-child(even) {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>