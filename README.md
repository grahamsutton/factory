# factory
Generate lots of mock data with ease using [Marak/faker.js](https://github.com/Marak/faker.js).

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

**Example**

```js
const factory = require('@grahamsutton/factory')

let users = factory(3, (faker, index) => {
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
  },
  ...
]
```