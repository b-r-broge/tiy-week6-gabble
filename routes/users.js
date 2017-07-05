// Perform user authentication, if not valid, kick user back to pub files and
// ask for login.

'use strict'

const express = require('express');
const router = express.Router();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const models = require('../models');

const usersDb = models.user;

// authentication stuffs
passport.use(new Strategy ({
    usernameField: 'username',
    passwordField: 'password'},
  function (username, password, done) {
    console.log('setting up new login strategy');
    usersDb.findOne({
      where: {
        username: username
    }}).then(function(data) {
      console.log('user in db, checking pw')
      console.log('data:', data);
      if (data.dataValues.password === password) {
        console.log('valid user/password')
        console.log('setting session data');
        req.session.user = data;
        return next(null, data)
      }
      return next(null, false);
    }).catch(function(err) {
      return next(err);
    })
  }
));

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, cb) {
//   db.users.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

router.use(passport.initialize());
router.use(passport.session());

router.get('/gobble/home/:username', function (req, res) {
  // get home page for a user

  // need to handle personal page separate from another users

});

router.get('/gobble/login', function (req, res) {
  // perform login and check
  console.log('going to login page');
  res.render('login');
});

router.get('/gobble/home', function (req, res) {
  console.log('home page');
  console.log(req.session);
  res.render('home', {user: req.session.user});
})

router.post('/gobble/login', function (req, res) {
  console.log('attempting login', req.body);
  passport.authenticate('local', {
    failureRedirect: '/gobble/login',
    successRedirect: '/gobble/home',
    failureFlash: true
  });
});

module.exports = router;
