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
    <div class="has-text-centered is-italic">
      <a v-on:click="loadData" v-if="hasMore">Load More</a>
      <p v-else class="has-text-grey-light">No More</p>
    </div>
  </div>
</template>

<script>
import firebaseClient, { DEFAULT_QUERY } from '@/clients/firebaseClient'
import firebaseConfig from '@/../config/firebase'

import StatsPanel from './StatsPanel'
import SimpleTable from './SimpleTable'

export default {
  name: 'DbDetail',
  data () {
    return {
      data: [],
      roots: firebaseConfig.DBRoots,
      defaultStats: [{ name: 'Total', countBy: '.key' }],
      hasMore: true
    }
  },
  computed: {
    targetRoot () {
      return firebaseConfig.DBRoots
        .find(root => root.name === this.$route.params.root)
    },
    headers () {
      return this.targetRoot.props || Object.keys((this.data[0] || {}))
    },
    stats () {
      return this.targetRoot.stats || this.defaultStats
    }
  },
  watch: {
    '$route.params.root' () {
      this.data = []
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
      const ref = this.$route.params.root
      const params = deepCopy(this.targetRoot.query || DEFAULT_QUERY)
      const limit = params.limitToLast || params.limitToFirst
      // NOTE: fetch one more item, base on result to determine if there's more to fetch,
      // considering developers might not use firebase generated keys, hence this simple pagination approach was implemented.
      if (params.limitToLast) params.limitToLast = this.data.length + limit + 1
      if (params.limitToFirst) params.limitToFirst = this.data.length + limit + 1

      const loadingComponent = this.$loading.open()
      const data = await firebaseClient.database.getDataByRef(ref, params)
      if (data.length !== 1 && data.length % limit === 1) {
        this.data = data.slice(0, data.length - 1)
        this.hasMore = true
      } else {
        this.data = data
        this.hasMore = false
      }
      loadingComponent.close()
    },
    onRefresh () {
      this.loadData()
    }
  }
}

function deepCopy (target) {
  return JSON.parse(JSON.stringify(target))
}
</script>

<style lang="css" scoped>
</style>
