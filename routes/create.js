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
  // console.log("PASSING", author, post);
  likesDb.findOne({
    where: {
      authorId: author,
      postId: post
    }
  }).then(function(response) {
    console.log("Searching for an existing like in the db");
    if (response) {
      console.log('response found, updating in db');
      let likeStatus = response.dataValues.liked;
      console.log('current like status:', likeStatus, 'future like status:', !likeStatus);
      likesDb.update({
        liked: !likeStatus,
      }, {where: {
        authorId: author,
        postId: post
      }}).then(function(obj) {
        console.log('liked obj', obj);
        res.redirect('/gobble/home');
      }).catch(function(err) {
        console.log('error', err);
        res.redirect('/gobble/home');
      })
    } else {
      console.log('response not found, inserting into table');
      likesDb.create({
        liked: true,
        authorId: author,
        postId: post
      }).then(function(obj) {
        //  console.log('liked obj', obj);
        res.redirect('/gobble/home');
      }).catch(function(err) {
        console.log('error', err);
        res.redirect('/gobble/home');
      })
    }
  })
});

router.post('/gobble/newComment', function(req, res) {
  // console.log('req.user', req.user.id);
  var newComment = commentsDb.build({
    content: req.body.comment,
    postedAt: new Date(),
    authorId: req.user.id,
    postId: req.body.postid
  });
  console.log(newComment);
  newComment.save().then(function(comment) {
    console.log('new comment written to db');
    res.redirect('/gobble/home');
  }).catch(function(err) {
    console.log('error writing new post', err);
    req.session.err = "There was an error writing your post"
    res.redirect('/gobble/home')
  })
});


module.exports = router;
