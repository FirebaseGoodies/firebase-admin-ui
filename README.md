# firebase-admin-ui
> Simple admin UI for Firebase.

Like firebase database but find its console hard to use? Hope this simple web app could help :)

## Getting Started

### Prerequisites

You will need to first enable one of the sign-in providers in firebase authentication console page, and then get your firebase configurations for web app.

### Setup

Add firebase web app configurations to the target [env.js](https://github.com/J1wu/firebase-admin-ui/tree/master/config) file.

```js
FIREBASE_CONFIG: {
  apiKey: '""',
  authDomain: '""',
  databaseURL: '""',
  projectId: '""',
  storageBucket: '""'
}
```

Describe your database root properties in the [configuration module](https://github.com/J1wu/firebase-admin-ui/tree/master/config/firebase.js).

```js
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
```

### Start Local Environment

```sh
# install dependencies
yarn install

# serve with hot reload at localhost:8090
yarn run dev
```
