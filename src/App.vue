<template>
  <router-view />
  <v-modal v-if="modalActive" @confirm="confirmHandler">{{ modalMessage }}</v-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vModal from '@/components/vModal.vue'

export default {
  components: {
    vModal,
  },

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

  data() {
    return {
      modalMessage: '',
      modalActive: false,
    }
  },

  computed: {
    ...mapGetters(['socket', 'username']),
  },

  methods: {
    ...mapActions(['updatePlayers']),

    confirmHandler(confirmed) {
      this.modalActive = false
      this.socket.emit('buy', confirmed)
    }
  },
}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
}

.title {
  font-size: 20px;
}
</style>