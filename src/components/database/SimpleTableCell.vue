<template lang="html">
  <div v-on:click="enableEdit">
    <input
      class="input is-small"
      type="text"
      ref="inputField"
      v-if="cell.editable && editMode"
      v-on:keyup.esc="cancel"
      v-on:keyup.enter="save(cell.raw)"
      v-model="cell.raw">
    <span
      v-if="cell.editable && !editMode">
      {{ cell.formatted }}
    </span>
    <span
      v-if="!cell.editable"
      v-html="cell.formatted">
    </span>
  </div>
</template>

<script>
import firebaseClient from '@/clients/firebaseClient'
import { timestampProps } from '@/../config/firebase'

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
      default: () => 30
    },
    fbRef: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      editMode: false
    }
  },
  computed: {
    cell () {
      const output = {
        raw: this.data,
        formatted: this.data,
        editable: true
      }
      if (!this.data) {
        output.formatted = '-'
      }
      if (isValidDate(this.name, this.data)) {
        output.formatted = new Date(this.data).toString()
      }
      if (isExceedingMaxLength(this.data, this.maxLength)) {
        output.formatted = this.data.substr(0, this.maxLength) + '...'
      }
      if (isArray(this.data) || isObject(this.data)) {
        output.formatted = this.getDataLink(this.name)
        output.editable = false
      }
      return output
    }
  },
  methods: {
    enableEdit () {
      this.editMode = true
      this.$nextTick(() => {
        if (this.$refs.inputField) {
          this.$refs.inputField.focus()
        }
      })
    },
    async save (newVal) {
      if (this.name === '.key') {
        this.$toast.open({
          duration: 3000,
          message: `Sorry, '.key' property can't be updated.`,
          position: 'is-top',
          type: 'is-danger'
        })
        return
      }
      await firebaseClient.database.updateDataByRef(this.fbRef, newVal)
      this.editMode = false
      this.$emit('trigger', 'update')
    },
    cancel () {
      this.editMode = false
    },
    getDataLink (name) {
      return `<a href="${this.dataLink}/${name}" target="_blank">Link</a>`
    }
  }
}

function isValidDate (name, data) {
  if (!timestampProps.includes(name)) return false
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
