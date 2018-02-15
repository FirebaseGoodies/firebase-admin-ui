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
          <td><a :href="getDataLink(row['.key'])" target="_blank">Link</a></td>
          <td
            nowrap
            v-for="(col, index) in headers"
            v-bind:key="index">
            <simple-table-cell :data="row[col]"
              :name="col"
              :data-link="getDataLink(row['.key'])">
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
    SimpleTableCell
  },
  data () {
    return {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      sortKey: 'createdAt',
      DATA_LINK
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
      return `${this.DATA_LINK}${this.root}/${key}`
    }
  }
}
</script>

<style lang="css" scoped>
.scroll-container {
  overflow: scroll;
}
</style>
