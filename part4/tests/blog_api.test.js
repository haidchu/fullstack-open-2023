const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.blogs.map(blog => new Blog(blog))
    const promise = blogObjects.map(obj => obj.save())
    await Promise.all(promise)
})

test.only('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    // .then((content) => console.log(content.body))
})

test.only('blog should contain \"id\" not \"_id\"', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual('id' in response.body[0], true)
    assert.strictEqual('_id' in response.body[0], false)
})

test.only('test POST', async () => {
    await Blog.deleteMany({})
    const dummy = {
        title: "dummy title",
        author: "dummy author",
        url: "https://dummy.url.com",
        likes: 7,
    }

    const response = await api
        .post('/api/blogs')
        .send(dummy)
        .set('Accept', 'application/json')

    const result = await api
        .get('/api/blogs')
    assert.strictEqual(result.body.length, 1)
})

test.only('test likes property', async () => {
    await Blog.deleteMany({})
    const dummy = {
        title: "dummy title",
        author: "dummy author",
        url: "https://dummy.url.com",
    }

    const response = await api
        .post('/api/blogs')
        .send(dummy)
        .set('Accept', 'application/json')

    const result = await api
        .get('/api/blogs')
    console.log(result.body)
    assert.strictEqual(result.body[0].likes, 0)
})

after(async () => {
    await Blog.deleteMany({})
    await mongoose.connection.close()
})