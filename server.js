const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/resgister');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require ('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'trangdo',
      password : '',
      database : 'faceapp'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res)=>{ res.send('working') })

app.post('/signin', (req,res)=> {signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,knex)})

app.put('/image', (req,res) => {image.handleImage(req,res,knex)})
app.post('/imagelink', (req,res) => {image.handleApiCall(req,res)})


app.listen(3000,() => {
    console.log('app is running on port 3000');
})

// res = this is working
//signin --> POST = sucess/fail
//register --> POST = user
//profile/:userId --> GET = user
// image --> PUT --> user