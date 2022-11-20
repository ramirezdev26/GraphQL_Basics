const personqueries = require('./person.query')
const coursequeries = require('./course.query')

module.exports = {
    ...personqueries, ...coursequeries
}