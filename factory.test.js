const factory = require('./factory')

test('can generate a simple array of object literals', () => {
  let collection = factory(2, () => {
  	return {
  	  "title": "This is a test"
  	}
  })

  expect(collection).toEqual([
  	{ "title": "This is a test" },
  	{ "title": "This is a test" }
  ])
})

test('can provide faker library for each iteration', () => {
  let collection = factory(2, (faker) => {
  	return {
  	  "name": faker.name.firstName()
  	}
  })

  expect(collection[0].name).toEqual(expect.any(String))
  expect(collection[1].name).toEqual(expect.any(String))
})

test('can provide index of the current iteration', () => {
  let collection = factory(2, (faker, index) => {
  	return {
  	  "test_id": index + 1
  	}
  })

  expect(collection).toEqual([
  	{ "test_id": 1 },
  	{ "test_id": 2 }
  ])
})

test('can generate a flat array of random data', () => {
  let collection = factory(3, (faker, index) => {
  	return "test" + index
  })

  expect(collection).toEqual(['test0', 'test1', 'test2'])
})

test('can use a factory within another factory call', () => {
  let collection = factory(2, () => {
  	return {
  	  "name": "Graham",
  	  "events": factory(3, (faker, index) => {
  	  	return {
  	  	  "event_id": index + 1,
  	  	  "name": "Event " + (index + 1)
  	  	}
  	  })
  	}
  })

  expect(collection).toEqual([
  	{ 
  	  "name": "Graham",
  	  "events": [
  	  	{ "event_id": 1, "name": "Event 1" },
  	  	{ "event_id": 2, "name": "Event 2" },
  	  	{ "event_id": 3, "name": "Event 3" }
  	  ]
  	},
  	{ 
  	  "name": "Graham",
  	  "events": [
  	  	{ "event_id": 1, "name": "Event 1" },
  	  	{ "event_id": 2, "name": "Event 2" },
  	  	{ "event_id": 3, "name": "Event 3" }
  	  ]
  	}
  ])
})

test('throws error if first parameter is not an integer', () => {
  expect(
    () => {
	  factory(() => {
	    return "this should fail because first param is not an integer"
	  })
    }
  ).toThrow()
})

test('throws error if second parameter is not a function', () => {
  expect(
  	() => {
  	  factory(2, "incorrect")
  	}
  ).toThrow()
})