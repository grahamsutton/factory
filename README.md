# factory
Generate lots of mock data with ease using [Marak/faker.js](https://github.com/Marak/faker.js).

[![CircleCI](https://circleci.com/gh/grahamsutton/factory/tree/master.svg?style=svg)](https://circleci.com/gh/grahamsutton/factory/tree/master)

Factory is just one simple function that you can use to create vast amounts of mock data in one quick and simple
definition. No extra fluff like defining "models". Factory is intended to be straight-to-the-point. Need an array
of 50 object literals on the fly to mimic the API response your expecting? Need just one array with 200 elements?
No problem, Factory can help you generate that mock data with minimal effort.

Use it in your unit tests, pass it in as a prop to your Vue/React components for quick prototyping, or use it for
mocking API responses. Anywhere you need lots of mock data fast, Factory can help.

Check out the examples below to see how easy it is.

## Installation

```sh
$ npm install --save-dev @grahamsutton/factory
```

## Usage

**Function Signature**

```js
factory(numRecords: Number, callback: Function): Array
```

NOTE: `numRecords` must be an integer or an error will be thrown.

---

**Basic Example**

```js
const factory = require('@grahamsutton/factory')

// Create array containing 3 mock objects
let people = factory(3, faker => {
  return {
    "first_name": faker.name.firstName(),
    "last_name": faker.name.lastName()
  }
})
````
Example response:

```json
[
  { "first_name": "Andres", "last_name": "Will" }
  { "first_name": "Roma", "last_name": "Welch" }
  { "first_name": "Emmalee", "last_name": "Grant" }
]
```

---

**Use `index` Parameter For Uniquely IDing Mock Data**

Just add `index` as the second parameter to the callback function:

```js
const factory = require('@grahamsutton/factory')

// index is zero-based
let people = factory(3, (faker, index) => {
  return {
    "id": index + 1,
    "name": faker.name.firstName() + " " + faker.name.lastName()
  }
})
````

Example response:

```json
[
  { "id": 1, "name": "Andres Will" }
  { "id": 2, "name": "Roma Welch" }
  { "id": 3, "name": "Emmalee Grant" }
]
```

---

**Create a Really Long Array of Random Elements**

If you just need a really long array of mock data, whatever you return will be
placed in the output array:

```js
const factory = require('@grahamsutton/factory')

let randomNumbers = factory(200, faker => {
  return faker.random.number()
})
````

Example response:

```js
[22892, 12314, 34, 2, 812, 54, 1242, 28532, ...]
```

---

**Use `factory` Within Another `factory` Call To Define Nested Elements**

```js
const factory = require('@grahamsutton/factory')

let users = factory(2, (faker, index) => {
  return {
    "id": index + 1,
    "name": faker.name.firstName(),
    "email": faker.internet.email(),
    "departments": factory (4, () => {
      return faker.commerce.department()
    }),
    "addresses": factory(2, () => {
      return {
        "street": faker.address.streetAddress(),
        "city": faker.address.city(),
        "state": faker.address.state()
      }
    })
  }
})
```

This would return an array with the following structure:

```js
[
  {
    "id": 1,
    "name": "Mike",
    "email": "mike@example.com",
    "departments": [
      "Automotive", "Grocery", "Sports", "Electronics"
    ],
    "addresses": [
      {
        "street": "665 Alexander Corner",
        "city": "Doylehaven",
        "state": "Florida"
      },
      {
        "street": "479 Adrain Tracer",
        "city": "Dibbertchester",
        "state": "New York"
      }
    ]
  },
  {
    "id": 2,
    "name": "Sam",
    "email": "sam@example.com",
    "departments": [
      "Sports", "Beauty", "Automotive", "Electronics"
    ],
    "addresses": [
      {
        "street": "12780 Juston Neck",
        "city": "Walterville",
        "state": "Alabama"
      },
      {
        "street": "579 Rashad Loop",
        "city": "South Tristinmouth",
        "state": "Idaho"
      }
    ]
  }
]
```

---

**Mocking Data for Vue/React Components Example**

Need some mock data for your component props?

Create a file somewhere in your project, require `@grahamsutton/factory`, and start building your mock
definition, then just export the results from your call to factory so they can be imported in your
components.

Here's an example.

Let's say we create a file called `UsersMockData.js` for our component called `Users`:

*UsersMockData.js*

```js
const factory = require('@grahamsutton/factory')

module.exports = factory(10, (faker, index) => {
  return {
    "id": index + 1,
    "name": faker.name.firstName() + " " + faker.name.lastName(),
    "email": faker.internet.email()
  }
})
```

Then, in your parent component that contains the `Users` component (Vue example):

```vue
<template>
  <users :users="users"></users>
</template>

<script>
  import Users from './Users.vue'
  import UsersMockData from './UsersMockData.js'

  export default {
    components: {
      Users
    },
    data () {
      return {
        users: UsersMockData
      }
    }
  }
</script>
```

Now, if you want to prototype how your component will look with 20, 50, 100, 200 users or more, you can simple go to your `UsersMockData.js`
file and just increase the amount of records you want `factory` to produce. Simple as that. Just be sure to remove it once your ready to hook
it up to your real API.

Disclaimer: Your mock data could change on every hard refresh or restart (usually soft refreshes or hot reloading won't change it). If
you need your data to remain static, I would recommend saving the output from `factory` to a JSON file and importing that instead.

## Contributing

See the `CONTRIBUTING.md` file for instructions on contributing. Any contributers are welcome!
