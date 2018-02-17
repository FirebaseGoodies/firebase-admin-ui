'use strict'

module.exports = {
  // NOTE: default properties that uses unix timestamp as its value, which will be parsed into Datetime string on the page
  timestampProps: [
    'createdAt', 'updatedAt', 'created_at', 'updated_at'
  ],
  DBRoots: [
    {
      // NOTE: root property name, example:
      name: 'subscriptions',
      // NOTE: array that contains the object properties you'd like to see in the table component as the table header,
      // if nothing were given, the first object's properties that we get from this root will be used to set up table header.
      props: [
        // NOTE: examples:
        // 'id',
        // 'createdAt',
        // 'status',
        // 'email',
        // 'name',
        // 'subject',
        // 'updatedAt'
      ],
      // NOTE: stats you'd like to see in the stats panel component, if no stats were given, only the 'total' count (count by '.key') will be displayed.
      // stats object properties that supported are: name:String, countBy:String, unique:Boolean, equalTo:String
      stats: [
        // NOTE: examples:
        // { name: 'Total', countBy: 'id' },
        // { name: 'Users', countBy: 'email', unique: true },
        // { name: 'Subscribed', countBy: 'status', equalTo: 'subscribed' }
      ]
    }
  ]
}
