<template lang="html">
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name: 'DbMain'}" class="navbar-item">
        Firebase Admin UI
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end" v-if="user">
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link">
            <img class="is-circle" :src="user.photoURL">
          </div>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item">English</a>
            <hr class="navbar-divider">
            <a class="navbar-item" v-on:click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
import firebaseClient from '@/clients/firebaseClient'

export default {
  name: 'AppHeader',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.user = firebase.auth().currentUser
  },
  methods: {
    logout () {
      firebaseClient.auth.signOut()
        .then((e) => {
          this.$router.push({ path: '/login' })
        })
    }
  }
}
</script>

<style lang="css">
</style>
