<template>
  <router-view />
  <v-modal v-if="modalActive" @confirm="confirmHandler">{{
    modalMessage
  }}</v-modal>
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
      if (status == 'success') {
        return this.$router.push({ name: 'game' })
      }
      this.$router.push({ name: 'lobby' })
    })

    this.socket.on('clearEvents', () => {
      this.clearEvents()
    })

    this.socket.on('players', (players) => {
      this.updatePlayers(players)
    })

    if (this.username) {
      this.socket.emit('auth', this.username)
    }

    this.socket.on('confirm', (msg) => {
      this.modalMessage = msg
      this.modalActive = true
    })

    this.socket.on('event', (event) => {
      this.pushEvent(event)
    })
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
    ...mapActions(['updatePlayers', 'pushEvent', 'clearEvents']),

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

.player-color {
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
</style>