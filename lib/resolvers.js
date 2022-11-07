const courses = [
    {
        _id: 'AnyId',
        title: "Mi titulo",
        techer: "Mi profesor",
        description: "Una descripcion",
        topic: String
    },
    {
        _id: 'AnyId',
        title: "Mi titulo 2",
        techer: "Mi profesor",
        description: "Una descripcion",
        topic: String
    },
    {
        _id: 'AnyId',
        title: "Mi titulo 3",
        techer: "Mi profesor",
        description: "Una descripcion",
        topic: String
    }
]

module.exports = {
    getCourses: () => {
        return courses
    }
  }