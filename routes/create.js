// CREATE options, eg: new post, new comment, new group, new like
// new users done in pub.

'use strict'

const express = require('express');
const router = express.Router();

const models = require('../models');
const usersDb = models.users;
const commentsDb = models.comments;
const groupsDb = models.groups;
const postsDb = models.posts;
const likesDb = models.likes;

router.post('/gobble/newPost', function(req, res) {
  // console.log('req.user', req.user.id);
  var newPost = postsDb.build({
    content: req.body.content,
    edit: false,
    postedAt: new Date(),
    authorId: req.user.id,
    groupId: 1
    // groupId will become not static once I get past some of these oddities
  });
  // console.log(newPost);
  newPost.save().then(function(post) {
    console.log('new post written to db');
    res.redirect('/gobble/home');
  }).catch(function(err) {
    console.log('error writing new post', err);
    req.session.err = "There was an error writing your post"
    res.redirect('/gobble/home')
  })
  // res.redirect('/gobble/home');
});

router.post('/gobble/likePost', function(req, res) {
  // upsert the db to include the user, post and set the boolean to true
  // false if it has been updated.
  let author = req.user.id,
    post = req.body.doLike;
  console.log("PASSING", author, post);
  likesDb.upsert({
    liked: true ? false : true,
    authorId: author,
    postId: post
  }, {
    where: {
      authorId: author,
      postId: post
    }
  }).then(function(obj) {
    console.log('liked obj', obj);
    res.redirect('/gobble/home');
  }).catch(function(err) {
    console.log('error', err);
    res.redirect('/gobble/home');
  })
});

module.exports = router;
