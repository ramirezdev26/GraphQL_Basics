const connectDb = require('./db/db')
const { ObjectID } = require('mongodb')

module.exports =  {
    getCourses: async () => {
        let db 
        let courses = []
        try {
            db = await connectDb()
            courses = await db.collection('courses').find().toArray()
        } catch (error) {
            console.error(error)
        }

        return courses
    },
    getCourse: async (root, { id }) => {
        let db 
        let course
        try {
            db = await connectDb()
           course = await db.collection('courses').findOne({_id: ObjectID(id)})
        } catch (error) {
            console.error(error)
        }

        return course
    },
    getPeople: async () => {
        let db
        let people = []
        try {
            db = await connectDb()
            people = await db.collection('students').find().toArray()
        } catch (error) {
            console.log(error)
        }
        return people
    },
    getPerson: async (root, { id }) => {
        let db
        let student = []
        try {
            db = await connectDb()
            student = await db.collection('students').findOne({_id: ObjectID(id)})
        } catch (error) {
            console.log(error)
        }
        return student
    },
    searchItems: async (root, { keywords }) => {
        let db
        let items
        let courses
        let people
        try {
            db = await connectDb()
            courses = await db
            .collection('courses')
            .aggregate([
              {
                $search: {
                  index: 'text',
                  text: {
                    query: keywords,
                    path: { wildcard: '*' },
                  },
                },
              },
            ])
            .toArray()
            people = await db
            .collection('students')
            .aggregate([
              {
                $search: {
                  index: 'text',
                  text: {
                    query: keywords,
                    path: { wildcard: '*' }
                  }
                }
              }
            ])
            .toArray()
            items = [...courses, ...people]
        } catch (error) {
            console.log(error)
        }
        return items
    },
    
}