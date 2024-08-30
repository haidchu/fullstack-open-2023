const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

router.post('/', async (request, response) => {
    const temp = request.body
    if (!('title' in temp && 'url' in temp)) {
        return response.status(400).json('title or url missing')
    }
    if (!('likes' in temp)) {
        temp['likes'] = 0
    }
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = router