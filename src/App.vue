<template>
  <section>
    <app-header></app-header>
    <div class="main">
      <router-view/>
    </div>
  </section>
</template>

<script>
import AppHeader from '@/components/common/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  margin-top: 1.5em;
}
.is-circle {
  border-radius: 50%
}
</style>
