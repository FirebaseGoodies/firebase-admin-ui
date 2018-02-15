<template lang="html">
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div id="firebaseui-auth-container"></div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'Login',
  mounted () {
    const uiConfig = {
      callbacks: {
        signInSuccess (currentUser, credential, redirectUrl) {
          return true
        }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/database',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ]
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style lang="css">
@import '../../../node_modules/firebaseui/dist/firebaseui.css'
</style>
