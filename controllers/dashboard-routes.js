const router = require('express').Router();
const withAuth = require('../utils/auth');
const _require = require('../models'),
    User = _require.User,
    Post = _require.Post,
    Comment = _require.Comment;

router.get('/', withAuth, function (req, res) {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [{ model: User, attributes: ['username']}, 

    { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username']}
    }]
  })
  
  .then (function (dbPostData) {
    const posts = dbPostData.map (function (post) {
      return post.get({ plain: true });
    });
    res.render('dashboard', {
      posts: posts,
      loggedIn: true
    });
  })

  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get ('/edit/:id', withAuth, function (req, res) {
  Post.findOne ({ where: {id: req.params.id},
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [{ model: User, attributes: ['username']}, 
    { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username']}
    }]
  })
  
  .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json ({message: 'Sorry, no posts found'});
      return;
    }

    const post = dbPostData.get ({ plain: true });
    res.render ('edit-post', { post: post, loggedIn: req.session.loggedIn });
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/new', function (req, res) {
  res.render('new-post');
});

module.exports = router;