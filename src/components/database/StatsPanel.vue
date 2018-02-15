<template lang="html">
  <nav class="level">
    <div
      class="level-item has-text-centered"
      v-for="(stat, index) in stats"
      v-bind:key="index">
      <div>
        <p class="heading">{{ stat.name }}</p>
        <p class="title">{{ count(stat) }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'StatsPanel',
  props: {
    data: {
      type: Array,
      required: true
    },
    stats: {
      type: Array,
      required: true
    }
  },
  methods: {
    count (stat) {
      let output = 0
      const arr = this.data.filter(item => item[stat.countBy]).map(item => item[stat.countBy])
      output = arr.length

      if (stat.unique) {
        output = stat.unique ? new Set(arr).size : arr.length
      }
      if (stat.equalTo) {
        output = arr.filter(item => item === stat.equalTo).length
      }
      return output
    }
  }
}
</script>

<style lang="css">
</style>
