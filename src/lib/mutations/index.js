const personmutation = require('./person.mutation')
const coursemutation = require('./course.mutation')

module.exports = {
    ...personmutation, ...coursemutation
}