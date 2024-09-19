const express = require('express')
const router = express.Router()

const logger = require('../utils/logger')
const Blog = require('../models/blog')


router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const result = await Blog.findByIdAndDelete(id)
        logger.info(result)
    } catch (err) {
        logger.error(err)
    }
    res.status(204).json({ 'message': 'blog deleted' }).end()
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const old = await Blog.findById(id)
    if (!old) return res.status(404).json({ 'message': 'blog not found' }).end()
    // logger.info(old)
    const title = req.body.title || old.title
    const author = req.body.author || old.author
    const url = req.body.url || old.url
    const likes = req.body.likes || old.likes

    const new_blog = {
        'title': title,
        'author': author,
        'url': url,
        'likes': likes
    }
    try {
        const result = await Blog.findByIdAndUpdate(id, new_blog)
        logger.info(result)
        return res.status(204).end()
    } catch (err) {
        logger.error(err)
        return res.status(404).json({ 'message': 'unknown error' }).end()
    }
})

module.exports = router