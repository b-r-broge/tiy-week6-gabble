// Perform user authentication, if not valid, kick user back to pub files and
// ask for login.

'use strict'

const express = require('express');
const router = express.Router();
const passport = require('passport');
const strategy = require('passport-local').Strategy
const models = require('./models')

const usersDb = models.user;

// authentication stuffs
passport.use(new Strategy (
  function (loginName, loginPass, callback) {
    usersDb.findOne(where: {
      username: loginName
    }).then(function(data) {
      console.log('user in db, checking pw')
      console.log('data': data);
      if (data.dataValues.password === loginPass) {
        return callback(null, )
      }
    }
  }
))

router.get('/gobble/home/:username', function (req, res) {
  // get home page for a user

  // need to handle personal page separate from another users

});



module.exports = router;
