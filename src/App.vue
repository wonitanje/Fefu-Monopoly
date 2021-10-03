<template>
  <router-view />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  created() {
    this.socket.on('auth', (status) => {
      console.log('socket says:', status)
      if (status == 'success') {
        return this.$router.push({ name: 'game' })
      }
      this.$router.push({ name: 'lobby' })
    })

    this.socket.on('players', (players) => {
      console.log('players update', players)
      this.updatePlayers(players)
    })

    if (this.username) {
      this.socket.emit('auth', this.username)
    }
  },

  computed: {
    ...mapGetters(['socket', 'username']),
  },

  methods: {
    ...mapActions(['updatePlayers'])
  },
}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

.title {
  font-size: 20px;
}
</style>