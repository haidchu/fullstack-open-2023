const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const logger = require('../utils/logger')

const User = require('../models/user')
const Blog = require('../models/blog')

const { createSearchIndex } = require('../models/blog')

router.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

router.post('/', async (req, res, next) => {
    const { username, name, password } = req.body
    if (!username || !password)
        return res.status(400).json({ 'message': 'username and password must be provided' })

    if (username.length < 3 || password.length < 3)
        return res.status(400).json({ 'message': 'username and password must contain at least 3 characters' })

    const checkExisted = await User.find({ username: username })
    if (checkExisted.length !== 0)
        return res.status(400).json({ 'message': 'username must be unique' })
    
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash
    })
    try {

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})

router.put(':/id', async (req, res) => {
    
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await User.findByIdAndDelete(id)
        // logger.info(result)
    } catch (err) {
        logger.error(err)
    }
    res.status(204).json({ 'message': 'user deleted' })
})

module.exports = router