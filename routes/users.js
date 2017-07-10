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
    next();
  } else {
    res.redirect('/gobble/welcome');
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
        as: 'userPosts'
      }, {
        model: models.likes,
        as: 'likes',
        include: {
          model: models.users,
          as: 'userLikes'
        }
      }, {
        model: models.comments,
        as: 'comments',
        include: {
          model: models.users,
          as: 'userComments'
        },
        order: [
          'id'
        ]
      }],
    order: [
      'createdAt'
    ]}
  ).then(function(pubPosts) {
    mstchObj.publicPosts = pubPosts.map(function(post) {
      // remove some of the unnecessary bits of sequelize data
      post = post.dataValues;
      let usersData = post.userPosts.dataValues;
      post.userPosts = usersData;

      // console.log('POST', post);
      // console.log('COMMENTS', post.comments);

      // set a flag for if the user owns the post, and allow for a redirect
      // to edit or delete
      if (post.userPosts.id === req.user.id) {
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
