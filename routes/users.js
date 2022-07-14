const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// signup page / root page
router.get('/', (req, res) => res.render('index'))
// login route
router.get('/login', (req, res) => res.render('login'))

// register user
router.post('/signup', (req, res) => {
    const {email, firstName, lastName, password, password2} = req.body
    let errors = []
    // check the required fields
    if(!email || !firstName || !lastName || !password || !password2) {
        errors.push({msg: 'Please fill in all required fields'})
    }

    // verify passwords match
    if (password != password2) {
        errors.push({msg: 'Please make sure passwords match'})
    }

    //check password length
    if (password.length < 6) {
        errors.push({msg: 'Please make sure password is at least 6 characters'})
    }

    if(errors.length > 0) {
        res.render('index.ejs', {
            errors,
            firstName,
            lastName,
            email,
            password,
            password2
        })
    } else {
        // check if user already exists
        User.findOne({email: email})
            .then(user => {
                if(user) {
                    errors.push({msg: 'Email already exists'})
                    res.render('index.ejs', {
                        errors,
                        firstName,
                        lastName,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password
                    })
                    newUser.save()
                    .then(() => {
                        console.log('=========== NEW USER CREATED ============ ');
                        console.log(newUser);
                        console.log('=========== NEW USER CREATED ============ ');
                        res.send('welcome')
                    })
                }
            })
    }
})

module.exports = router
