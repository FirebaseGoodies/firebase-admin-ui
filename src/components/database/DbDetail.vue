<template>
  <div class="container">
    <div class="tabs is-boxed">
      <ul>
        <li
          v-for="(root, index) in roots"
          v-bind:key="index"
          :class="{ 'is-active': $route.params.root === root.name }">
          <router-link :to="{ name: 'DbDetail', params: { root: root.name } }">
            {{ root.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <stats-panel :data="data" :stats="stats"></stats-panel>
    <simple-table
      v-on:refresh="onRefresh"
      :rows="data"
      :headers="headers"
      :root="$route.params.root">
    </simple-table>
  </div>
</template>

<script>
import firebaseClient from '@/clients/firebaseClient'
import firebaseConfig from '@/../config/firebase'

import StatsPanel from './StatsPanel'
import SimpleTable from './SimpleTable'

export default {
  name: 'DbDetail',
  data () {
    return {
      data: [{}],
      roots: firebaseConfig.DBRoots,
      defaultStats: [{ name: 'Total', countBy: '.key' }]
    }
  },
  computed: {
    targetRoot () {
      return firebaseConfig.DBRoots
        .find(root => root.name === this.$route.params.root)
    },
    headers () {
      return this.targetRoot.props || Object.keys(this.data[0])
    },
    stats () {
      return this.targetRoot.stats || this.defaultStats
    }
  },
  watch: {
    '$route.params.root' () {
      this.loadData()
    }
  },
  components: {
    StatsPanel,
    SimpleTable
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const loadingComponent = this.$loading.open()
      this.data = await firebaseClient.database.getDataByRef(this.$route.params.root)
      loadingComponent.close()
    },
    onRefresh () {
      this.loadData()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
