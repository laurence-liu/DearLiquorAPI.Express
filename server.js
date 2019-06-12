const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const signin = require('./controllers/signin')
const register = require('./controllers/register')
const cocktails = require('./controllers/cocktails')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'process.env.DATABASE_URL',
        ssl: true, 
    }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/cocktails', (req, res) => { cocktails.handleCocktails(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`)
})