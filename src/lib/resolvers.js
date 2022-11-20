const queries = require('../lib/queries')
const mutations = require('../lib/mutations')

const types = require('./types')

module.exports = {
  Query: queries,
  Mutation: mutations,
  ...types
}