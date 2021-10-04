<template>
  <div class="lobby">
    <form @submit.prevent="authHandler" id="connect" class="lobby__form">
      <p class="title">Авторизация</p>
      <input-mask v-model="userName" :name="'username'" :error="inputError"
        >Имя</input-mask
      >
      <form-button>Подключиться</form-button>
    </form>
  </div>
</template>

<script>
import InputMask from '@/components/InputMask.vue'
import FormButton from '@/components/FormButton.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    InputMask,
    FormButton,
  },

  created() {
    if (this.username) {
      this.socket.emit('leave', this.username)
    }
  },

  data() {
    return {
      inputError: false,
    }
  },

  computed: {
    ...mapGetters(['username', 'socket']),

    userName: {
      get() {
        return this.username
      },
      set(value) {
        this.inputError = false
        return this.setUserName(value)
      }
    }
  },

  methods: {
    ...mapActions(['setUserName']),

    async authHandler() {
      if (this.userName.length == 0)
        return this.inputError = true
      this.socket.emit('auth', this.userName)
    }
  },
}
</script>

<style lang="scss" scoped>
.lobby {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;

  &__form {
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: var(--separator-shadow);
  }
}
</style>