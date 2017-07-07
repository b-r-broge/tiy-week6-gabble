// Perform user login, and serve public pages

// lots of passport assistance from docs and from
// https://github.com/lyndachiwetelu/using-passport-with-sequelize-and-mysql

'use strict'

const express = require('express');
const router = express.Router();

const passport = require('passport');

const models = require('../models');
const usersDb = models.users;
const commentsDb = models.comments;
const groupsDb = models.groups;
const postsDb = models.posts;
const likesDb = models.likes;

const mstchObj = {}

// check to see if user is included in session
router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('is authenticated');
    res.locals.login = req.isAuthenticated();
    // res.locals.user = req.user;
    next();
  } else {
    res.redirect('/gobble/login');
  }
})

router.get('/gobble/home/:username', function(req, res) {
  // get home page for a user

  // need to handle personal page separate from another users

});

router.get('/gobble/home', function(req, res) {
  console.log('home page');
  // console.log(req.session);
  // console.log(req.user);
  postsDb.findAll({
    where: {
      groupId: 1
    },
    include: [{
      model: models.users,
      as: 'users'
    }]
  }).then(function(pubPosts) {
    // mstchObj.publicPosts = pubPosts.map((a) => a.dataValues);
    mstchObj.publicPosts = pubPosts.map(function(post) {
      // remove some of the confusing bits of squelize data
      post = post.dataValues;
      let usersData = post.users.dataValues;
      // console.log("usersData", usersData);
      post.users = usersData;
      // console.log("POST", post);
      // console.log("USERS", post.users);

      // set a flag for if the user owns the post, and allow for a redirect
      // to edit or delete
      // console.log("post id", post.users.id);
      // console.log("session userid", req.user.id);
      if (post.users.id === req.user.id) {
        console.log("post authored by logged in user", post.id);
        post.canEdit = true;
      } else {
        post.canEdit = false;
      }
      // console.log(post.canEdit);
      return post;
    });
    // console.log(mstchObj);
    res.render('home', mstchObj);
  })
});

module.exports = router;
