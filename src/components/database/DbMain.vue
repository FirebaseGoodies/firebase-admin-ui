<template>
  <div class="container">
    <b-tabs type="is-boxed" v-on:change="onTabChanged">
      <b-tab-item
        v-for="(root, index) in roots"
        v-bind:key="index"
        :label="root.name">
        <template v-if="targetRoot.name === root.name">
          <stats-panel :data="data" :stats="stats"></stats-panel>
          <simple-table
            v-on:refresh="onRefresh"
            :rows="data"
            :headers="headers"
            :root="targetRoot.name">
          </simple-table>
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
    this.data = await this.loadData()
  },
  methods: {
    async onTabChanged (index) {
      this.targetRoot = this.roots[index]
      this.data = await this.loadData()
    },
    async loadData () {
      const loadingComponent = this.$loading.open()
      const data = await firebaseClient.database.getDataByRef(this.targetRoot.name)
      loadingComponent.close()
      return data
    },
    async onRefresh () {
      this.data = await this.loadData()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
