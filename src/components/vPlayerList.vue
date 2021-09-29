<template>
  <div class="player">
    <v-player />
    <v-player />
  </div>
</template>

<script>
import vPlayer from '@/components/vPlayer'

export default {
  components: {
    vPlayer,
  }
}
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
}
</style>