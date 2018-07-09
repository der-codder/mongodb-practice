const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 *   like this: { all: [artists], count: count, offset: offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 6) => {
  const query = {};
  if (criteria.name) {
    // query.name = {
    //   $regex: criteria.name,
    //   $options: "i"
    // };

    // Add text index to make it work:
    //   db.artists.createIndex({ name: "text" })
    query.$text = { $search: criteria.name };
  }
  if (criteria.age) {
    query.age = { $gte: criteria.age.min, $lte: criteria.age.max };
  }
  if (criteria.yearsActive) {
    query.yearsActive = { $gte: criteria.yearsActive.min, $lte: criteria.yearsActive.max };
  }

  // const query = {};
  // if (criteriaList.length > 0)
  //   query.$and = criteriaList;

  console.log(criteria);

  const searchQuery = Artist.find(query)
    .sort({ [sortProperty]: 'asc' })
    .skip(offset)
    .limit(limit);

  return Promise.all([searchQuery, Artist.count()])
    .then((results) => {
      return {
        all: results[0],
        count: results[1],
        offset: offset,
        limit: limit
      };
    });
};
