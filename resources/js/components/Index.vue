<template>
    <div>
      <router-view></router-view>
      <router-link v-if="accessToken" :to="{name: 'fruits.index'}">Fruits</router-link>
      <router-link v-if="!accessToken" :to="{name: 'users.login'}">Login</router-link>
      <router-link v-if="!accessToken" :to="{name: 'users.reg'}">Registration</router-link>
      <router-link v-if="accessToken" :to="{name: 'users.personal'}">Person</router-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>
</template>
<script>

import api from '../api'

export default {
    name: "Index",

    data() {
      return {
        accessToken: null
      }
    },

    mounted() {
      this.getAccessToken()
    },

    updated() {
      this.getAccessToken()
    },

    methods: {
      getAccessToken() {
        this.accessToken = localStorage.getItem('access_token')
      },

      logout() {
            api.post('/api/auth/logout')
            .then(res => {
              localStorage.removeItem('access_token')
              this.$router.push({name: 'users.login'})
            })

        }
    }
}
</script>
