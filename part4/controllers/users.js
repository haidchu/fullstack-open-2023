const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const logger = require('../utils/logger')
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, name, password } = req.body
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = router