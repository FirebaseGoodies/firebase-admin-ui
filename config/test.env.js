'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  FIREBASE_CONFIG: {
    apiKey: '""',
    authDomain: '""',
    databaseURL: '""',
    projectId: '""',
    storageBucket: '""'
  }
})
