const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

router.post('/', async (req, res, next) => {
    const temp = req.body
    if (!('title' in temp && 'url' in temp)) {
        return res.status(400).json({ 'error': 'title or url missing' })
    }
    if (!('likes' in temp)) {
        temp['likes'] = 0
    }
    const user = req.user
    // if (user === null) return res.status(401).json({'error': 'token invalid'})

    const blog = new Blog(req.body)
    blog['user'] = user.id
    const result = await blog.save()

    const blogId = result._id.toString()

    let currentId = user.blogs
    currentId.push(blogId)
    await User.findByIdAndUpdate(user.id, { blogs: currentId })

    res.status(201).json(result)
})

router.delete('/:id', async (req, res, next) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)
    if (!blog)
        return res.status(404).json({ 'error': 'blog not found' })

    const user = req.user
    // if (user === null) return res.status(401).json({'error': 'token invalid'})

    user.blogs.splice(user.blogs.indexOf(blogId), 1)
    const updatedUserBlog = user.blogs
    User.findByIdAndUpdate(user.id, { updatedUserBlog })

    try {
        await Blog.findByIdAndDelete(blogId)
        // logger.info(result)
    } catch (err) {
        logger.error(err)
    }
    return res.status(204).json({ 'message': 'blog deleted' })
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const old = await Blog.findById(id)
    if (!old) return res.status(404).json({ 'error': 'blog not found' }).end()
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
        return res.status(404).json({ 'error': 'unknown error' }).end()
    }
})

module.exports = router