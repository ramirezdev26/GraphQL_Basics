const connectDB = require('./db/db')
const { ObjectID } = require('mongodb')


module.exports = {
    createCourse: async (root, {input}) => {
        const defaults = {
            teacher: '',
            topic: ''
        }

        const newCourse = Object.assign(defaults, input)
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }
        return newCourse
    },
    editCourse: async (root, {_id, input}) => {
        let db
        let course
        try {
            db = await connectDB()
            await db.collection('courses').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
                )
                course = await db.collection('courses').findOne({_id: ObjectID(_id)})
        } catch (error) {
            console.log(error)
        }
        return course
    },
    deleteCourse: async (root, {_id}) => {
        let db
        let info
        try {
            db = await connectDB()
            info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
        } catch (error) {
            console.log(error)
        }
        return info.deletedCount
        ? `El curso con id ${_id} fue eliminado exitosamente.`
        : 'No existe el curso con el id indicado';
    },
    createPerson: async (root, {input}) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch (error) {
            console.log(error)
        }
        return input
    },
    editPerson: async (root, {_id, input}) => {
        let db
        let student
        try {
            db = await connectDB()
            await db.collection('students').updateOne(
                { _id: ObjectID(_id) },
                { $set: input }
                )
                student = await db.collection('students').findOne({_id: ObjectID(_id)})
        } catch (error) {
            console.log(error)
        }
        return student
        
    },
    deletePerson: async (root, {_id}) => {
        let db
        let info
        try {
            db = await connectDB()
            info = await db.collection('students').deleteOne({ _id: ObjectID(_id) })
        } catch (error) {
            console.log(error)
        }
        return info.deletedCount
        ? `La persona con id ${_id} fue eliminado exitosamente.`
        : 'No existe una persona con el id indicado';
    },
    addPeople: async (root, { courseID, personID }) => {
        let db
        let person
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').findOne({_id: ObjectID(courseID)})
            person = await db.collection('students').findOne({_id: ObjectID(personID)})
            if (!course || !person) throw new Error('Persona o curso no existe')
            await db.collection('courses').updateOne(
                {_id: ObjectID(courseID)},
                { $addToSet: { people: ObjectID(personID) } }
                )
        } catch (error) {
            console.log(error)
        }
        return course
    }
}