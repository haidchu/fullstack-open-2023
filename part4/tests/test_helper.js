// const Blog = require('../models/blog')

const blogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const users = [
    {
        username: "#1_uname",
        name: "#1 name",
        password: "#1_pass"
    },
    {
        username: "#2_uname",
        name: "#2 name",
        password: "#2_pass"
    },
    {
        username: "#3_uname",
        name: "#3 name",
        password: "#3_pass"
    },
    {
        username: "#4_uname",
        name: "#4 name",
        password: "#4_pass"
    },
    {
        username: "#5_uname",
        name: "#5 name",
        password: "#5_pass"
    }
]

module.exports = {
    blogs,
    users
}