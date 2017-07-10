// Perform user login, and serve public pages

// lots of passport assistance from docs and from
// https://github.com/lyndachiwetelu/using-passport-with-sequelize-and-mysql

'use strict'

const express = require('express');
const router = express.Router();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const models = require('../models');
const usersDb = models.users;

const bCrypt = require('bcrypt-nodejs')

const genHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
}

router.use(passport.initialize());
router.use(passport.session());

// authentication stuffs

passport.serializeUser(function(user, next) {
  next(null, user.id);
});

passport.deserializeUser(function(id, next) {
  usersDb.findById(id).then(function (user) {
    if (user) {
      next(null, user.get());
    } else {
      next(user.errors, null);
    }
  });
});

// Specifically for signing up a new user
passport.use('local-signup', new Strategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, next) {
    console.log('setting up new login strategy');
    usersDb.findOne({
      where: {
        username: username
    }}).then(function(data) {
      if (data) {
        return next(null, false, {message: "Email already used"});
      } else {
        var userPass = genHash(password);

        let newUser = usersDb.build({
          fullname: req.body.fullname,
          email: req.body.email,
          username: username,
          password: userPass,
          picture: req.body.picture
        })
        newUser.save().then(function(newUsr, created) {
          if (!newUsr) {
            return next(null, false);
          }
          if (newUsr) {
            return next(null, newUser);
          }
        });
      }
    })
  }
));

// Passport for signing in an existing user
passport.use('local-signin', new Strategy ({
    usernameField: 'username',
    passwordField: 'password',
  },
  function(username, password, next) {
    let isValid = (usrPass, pass) => {
      return bCrypt.compareSync(pass, usrPass);
    }
    usersDb.findOne({
      where: {
        username: username
      }}).then(function(data) {
        if (!data) {
          return next(null, false, {message: 'username does not exist'});
        }
        // console.log(data);

        if (!isValid(data.password, password)) {
          return next(null, false, {message: 'password is not correct'});
        }

        var usrInfo = data.get();
        return next(null, usrInfo);
      }).catch(function(err) {
        console.log('ERROR:', err);
        return next(null, false, {message: 'Error on signon'});
      });
  }
));

var errMsg = ""
router.use('/gobble/signup', function (req, res, next) {
  console.log('verifying signup information');
  if (req.body.password == req.body.password2) {
    next();
  } else {
    errMsg = "Your passwords must match"
    res.redirect('/gobble/welcome')
  }
});

router.get('/', function (req, res) {
  res.redirect('/gobble/welcome')
})

router.get('/gobble', function (req, res) {
  // send to welcome page
  res.redirect('/gobble/welcome')
})

router.get('/gobble/welcome', function (req, res) {
  // get home page for an unsigned user
  res.render('welcome', {error: errMsg})
});

router.post('/gobble/signup',
  passport.authenticate('local-signup', {
    failureRedirect: '/gobble/welcome',
    successRedirect: '/gobble/home'
    }
  )
);

// router.get('/gobble/login', function (req, res) {
//   // perform login and check
//   console.log('going to login page');
//   res.render('login');
// });

router.post('/gobble/login',
  passport.authenticate('local-signin', {
    failureRedirect: '/gobble/welcome',
    successRedirect: '/gobble/home'
  })
);

router.post('/gobble/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) { return res.render(err)}
    res.redirect('/gobble/welcome');
  });
})

module.exports = router;
