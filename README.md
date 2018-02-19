# firebase-admin-ui
> Simple admin UI for Firebase.

Like firebase database but find its console hard to use? Hope this simple web app could help :)

![screenshot](https://user-images.githubusercontent.com/5327840/36336311-fb6461fe-13c9-11e8-98d3-6e7c943baa32.png)


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

Describe your database in the [configuration module](https://github.com/J1wu/firebase-admin-ui/tree/master/config/firebase.js).

```js
// default properties that uses unix timestamp as its value, which will be parsed into Datetime string on the page
timestampProps: [
  'createdAt', 'updatedAt', 'created_at', 'updated_at'
],
DBRoots: [
  {
    // root property name, example:
    name: 'subscriptions',
    // array that contains the object properties you'd like to see in the table component as the table header,
    // if nothing were given, the first object's properties that we get from this root will be used to set up table header.
    props: [
      // examples:
      // 'id',
      // 'statusVal',
      // 'frequency',
      // 'createdAt',
      // 'updatedAt'
    ],

    // firebase query params supported: limitToFirst, limitToLast, orderByChild
    query: {
      // If neither of limitToFirst nor limitToLast were given, limitToLast: 100 will be applied by default
      limitToLast: 100,
      orderByChild: 'createdAt'
    },

    // stats you'd like to see in the stats panel component, if no stats were given, only the 'total' count (count by '.key') will be displayed.
    // stats object properties that supported are: name:String, countBy:String, unique:Boolean, equalTo:String
    stats: [
      // examples:
      // { name: 'Total', countBy: 'id' },
      // { name: 'Users', countBy: 'email', unique: true },
      // { name: 'Subscribed', countBy: 'statusVal', equalTo: 'subscribed' }
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

## Deploy

This project comes with a set of [default configuration](https://github.com/J1wu/firebase-admin-ui/tree/master/firebase.json) for deploying to firebase hosting.

```sh
# install the firebase cli
npm install -g firebase-tools

# log into to your firebase account
firebase login

# init firebase hosting, the .firebaserc file will be generated
firebase init

# production build
yarn build

# deploy
firebae deploy
```

### Security

Considering the nature of this web app, the [default firebase database rule configuration](https://github.com/J1wu/firebase-admin-ui/tree/master/database.rules.json) was set to allow only specified user to read and write your data.

Please follow these steps to grant user the access.

1. User sign in with available sign-in provider (user will not be able to load any data at this point)
1. Go to firebase authentication console page, copy user uid.
1. Go to firebase database console page, create a new root property called `admin`, then add a new record to it, with user uid as the key, user email (or any other non-null value) as its value.
1. That's it, happy coding and building.
