const express = require('express')
const router = express.Router()

const logger = require('../utils/logger')
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const temp = req.body
    if (!('title' in temp && 'url' in temp)) {
        return res.status(400).json('title or url missing')
    }
    if (!('likes' in temp)) {
        temp['likes'] = 0
    }
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Blog.findByIdAndDelete(id)
        // logger.info(result)
    } catch (err) {
        logger.error(err)
    }
    res.status(204).json({ 'message': 'blog deleted' }).end()
})

// router.put('/:id', async (req, res) => {
//     const id = req.params.id
// })

module.exports = router