// setup session and handle any pages that do not require authentication

'use strict'

const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: 'this is very secret',
  resave: false,
  saveUninitialized: true
}));

router.use('/*', function(req, res, next) {
  // set variables we want to track check to see if session is active
  var word = req.session.word;

  // If they aren't part of the cookie yet, set them in the cookie as well.
  if (!word) {
    word = req.session.word = "";
    req.session.wordArr = [];
    req.session.remGuess = {
      guessesRemaining: 8
    };
    req.session.letGuess = [];
    req.session.lowerGuess = [];
    req.session.stillHidden = 100;
  }
});


router.get('gobble/signup', function (req, res) {
  // create a new user account

});

router.get('/gobble/home', function (req, res) {
  // get home page for an unsigned user

});

router.post('/gobble/signup', function (req, res) {
  // insert new user into db, after doing some verification

});

router.post('gobble/signout', function (req, res) {
  // sign out and destory current session.

});

module.exports = router;
