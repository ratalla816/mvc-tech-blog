const router = require('express').Router();
const sequelize = require('../config/connection');
const _require = require('../models'),
    Post = _require.Post,
    User = _require.User,
    Comment = _require.Comment;

router.get('/', function (req, res) {
    Post.findAll({
    attributes: ['id', 'title', "post_text", 'created_at'],
    include: [{
    model: Comment,
    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    include: { model: User, attributes: ['username']}
   }, 
    { model: User, attributes: ['username']}
  ]})
  .then(function (dbPostData) {
const posts = dbPostData.map(function (post) {
    return post.get ({ plain: true });
  });

    res.render('homepage', {posts: posts, loggedIn: req.session.loggedIn});
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', function (req, res) {
  if (req.session.loggedIn) {res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/post/:id', function (req, res) {
  Post.findOne({
  where: {id: req.params.id},
  attributes: ['id', 'title', 'post_text', 'created_at'],
  include: [{model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  include: {model: User, attributes: ['username']}}, 
  { model: User, attributes: ['username']}
 ]})

 .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json({message: 'Sorry, no posts found'});
      return;
    }

    const post = dbPostData.get({
      plain: true
    });
    res.render ('single-post', {
      post: post,
      loggedIn: req.session.loggedIn
    });
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;