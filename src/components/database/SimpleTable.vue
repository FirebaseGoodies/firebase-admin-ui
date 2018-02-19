<template lang="html">
  <div class="scroll-container">
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th></th>
          <th
            nowrap
            v-for="(col, index) in headers"
            v-bind:key="index"
            v-on:click="sort(col)">
            {{ col }}
            <span class="icon has-text-info" v-if="sortKey === col">
              <i :class="['fa', isAscending ? 'fa-sort-up' : 'fa-sort-down']"></i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortedRows"
          v-bind:key="index">
          <td>
            <action-menu
              :context="{row, root}"
              v-on:trigger="onTrigger">
            </action-menu>
          </td>
          <td
            nowrap
            v-for="(col, index) in headers"
            v-bind:key="index">
            <simple-table-cell
              :data="row[col]"
              :name="col"
              :fb-ref="getFirebaseRef(row['.key'], col)"
              :data-link="getDataLink(row['.key'])"
              v-on:trigger="onTrigger">
            </simple-table-cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { DATA_LINK } from '@/clients/firebaseClient'
import SimpleTableCell from './SimpleTableCell'
import ActionMenu from './ActionMenu'

export default {
  name: 'SimpleTable',
  props: {
    rows: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    root: {
      type: String,
      required: true
    }
  },
  components: {
    SimpleTableCell,
    ActionMenu
  },
  data () {
    return {
      sortBy: '',
      sortOrder: 'desc',
      sortKey: ''
    }
  },
  computed: {
    isAscending () {
      return this.sortOrder === 'asc'
    },
    sortedRows () {
      const rows = this.rows
      return rows.sort((a, b) => {
        if (a[this.sortBy] > b[this.sortBy]) {
          return this.isAscending ? 1 : -1
        }
        if (a[this.sortBy] < b[this.sortBy]) {
          return this.isAscending ? -1 : 1
        }
        return 0
      })
    }
  },
  methods: {
    sort (col) {
      this.sortBy = col
      if (col === this.sortKey) {
        this.sortOrder = this.isAscending ? 'desc' : 'asc'
      } else {
        this.sortKey = col
        this.sortOrder = 'desc'
      }
    },
    getDataLink (key) {
      return `${DATA_LINK}${this.root}/${key}`
    },
    getFirebaseRef (key, prop) {
      return `${this.root}/${key}/${prop}`
    },
    onTrigger (action) {
      switch (action) {
        case 'delete':
        case 'update':
          this.$emit('refresh')
          break
      }
    }
  }
}
</script>

<style lang="css" scoped>
.scroll-container {
  overflow: scroll;
}
</style>
