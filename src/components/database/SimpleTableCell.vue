<template lang="html">
  <span v-html="cell"></span>
</template>

<script>
export default {
  name: 'SimpleTableCell',
  props: {
    data: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dataLink: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default () {
        return 30
      }
    }
  },
  computed: {
    cell () {
      if (!this.data) {
        return '-'
      }
      if (isValidDate(this.data)) {
        return new Date(this.data).toString()
      }
      if (isArray(this.data) || isObject(this.data)) {
        return this.getDataLink(this.name)
      }
      if (isExceedingMaxLength(this.data, this.maxLength)) {
        return this.data.substr(0, this.maxLength) + '...'
      }
      return this.data
    }
  },
  methods: {
    getDataLink (name) {
      return `<a href="${this.dataLink}/${name}" target="_blank">Link</a>`
    }
  }
}

function isValidDate (data) {
  return Date.parse(new Date(data)) > 0
}

function isArray (data) {
  return Array.isArray(data)
}

function isObject (data) {
  return typeof data === 'object'
}

function isExceedingMaxLength (data, maxLength) {
  return data && data.length && data.length > maxLength
}
</script>

<style lang="css">
</style>
