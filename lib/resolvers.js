const courses = [
    {
        _id: 'AnyId',
        title: "Mi titulo",
        teacher: "Mi profesor",
        description: "Una descripcion",
        topic: String
    },
    {
        _id: 'AnyId2',
        title: "Mi titulo 2",
        teacher: "Mi profesor",
        description: "Una descripcion",
        topic: String
    },
    {
        _id: 'AnyId3',
        title: "Mi titulo 3",
        teacher: "Mi profesor",
        description: "Una descripcion",
        topic: String
    }
]

module.exports = {
    Query: {
        getCourses: () => {
            return courses
        },
        getCourse: (root, args) => {
            const course = courses.filter(course => course._id === args.id)
            return course.pop()
        }
    }
}