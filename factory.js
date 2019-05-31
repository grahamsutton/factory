const faker = require('faker')

/**
 * Create a collection of mock data.
 *
 * The first parameter, numRecords, is used to define
 * the number of records that should be created.
 *
 * The second parameter performs the user-defined
 * callback which should return the data the user has
 * defined. This can be anything: ints, floats, arrays,
 * objects, you name it.
 *
 * An error will be thrown if the first parameter is
 * not an integer or if the second parameter is not
 * a function.
 *
 * @param {Number}   numRecords
 * @param {Function} callback
 *
 * @return {Array}
 *
 * @throws {Error}
 */
module.exports = (numRecords, callback) => {

  // Validate first parameter is an integer
  if (!Number.isInteger(numRecords)) throw new Error('First parameter must be an integer.')

  // Validate second parameter is a function
  if (!(callback instanceof Function)) throw new Error('Second parameter must be a function.')

  let collection = []
  
  for (let i = 0; i < numRecords; i++) {
  	collection.push(callback(faker, i))
  }

  return collection
}