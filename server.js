const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const signin = require('./controllers/signin')
const register = require('./controllers/register')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'laurenceliu',
        password: 'java',
        database: 'dear-liquor'
    }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.listen(3000, () => {
    console.log('app is running on port 3000')
})