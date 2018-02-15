<template>
  <div class="container">
    <b-tabs type="is-boxed" v-on:change="onTabChanged">
      <b-tab-item
        v-for="(root, index) in roots"
        v-bind:key="index"
        :label="root.name">
        <template v-if="targetRoot.name === root.name">
          <stats-panel :data="data" :stats="stats"></stats-panel>
          <simple-table :rows="data" :headers="headers" :root="targetRoot.name"></simple-table>
        </template>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import firebaseClient from '@/clients/firebaseClient'
import firebaseConfig from '@/../config/firebase'

import StatsPanel from './StatsPanel'
import SimpleTable from './SimpleTable'

export default {
  name: 'RootContainer',
  data () {
    return {
      data: [],
      roots: firebaseConfig.DBRoots,
      targetRoot: firebaseConfig.DBRoots[0]
    }
  },
  computed: {
    headers () {
      return this.targetRoot.props || Object.keys(this.data[0])
    },
    stats () {
      return this.targetRoot.stats || [{ name: 'Total', countBy: '.key' }]
    }
  },
  components: {
    StatsPanel,
    SimpleTable
  },
  async created () {
    const loadingComponent = this.$loading.open()
    this.data = await firebaseClient.database.getDataByRef(this.targetRoot.name)
    loadingComponent.close()
  },
  methods: {
    async onTabChanged (index) {
      this.targetRoot = this.roots[index]
      this.data = await firebaseClient.database.getDataByRef(this.targetRoot.name)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
