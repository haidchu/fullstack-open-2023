const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')
const { log } = require('node:console')

beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.users.map(user => new User(user))
    const promise = userObjects.map(obj => obj.save())
    await Promise.all(promise)
})

test('invalid users are not created', async () => {
    const dummy_user1 = {
        username: "#1",
        name: "#1 name",
        password: "#1_pass"
    } // length of username under 3

    await api
        .post('/api/users')
        .send(dummy_user1)
        .set('Accept', 'application/json')
        .expect(400)
    
    const dummy_user2 = {
        username: "#2_uname",
        name: "#2 name",
        password: "#2"
    } // length of password under 3

    await api
        .post('/api/users')
        .send(dummy_user2)
        .set('Accept', 'application/json')
        .expect(400)
    
    const dummy_user3 = {
        username: "#3_uname",
        name: "#3 name",
    } // not enough field
    
    await api
        .post('/api/users')
        .send(dummy_user3)
        .set('Accept', 'application/json')
        .expect(400)
    
    const dummy_user4 = {
        username: "#4_uname",
        name: "#5 name",
        password: "#5_pass"
    } // valid user

    await api
        .post('/api/users')
        .send(dummy_user4)
        .set('Accept', 'application/json')
    
    const dummy_user5 = {
        username: "#4_uname",
        name: "#5 name",
        password: "#5_pass"
    } // duplicate username

    await api
        .post('/api/users')
        .send(dummy_user5)
        .set('Accept', 'application/json')
        .expect(400)
})