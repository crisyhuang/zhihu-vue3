<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading"></loader>
    <message
      v-if="error.status"
      type="error"
      :message="error.message"
    ></message>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import Message from '@/components/Message.vue'
import { GlobalDataProps } from './store'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader,
    Message
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const token = computed(() => store.state.token)

    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })

    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
