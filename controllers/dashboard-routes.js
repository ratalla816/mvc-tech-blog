const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, function (req, res) {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [
               { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                 include: { model: User, attributes: ['username']}},
               { model: User, attributes: ['username']}, 
             ]
  })
  
.then(dbPostData => {
  const posts = dbPostData.map(post => post.get({ plain: true }));
  res.render('dashboard', { posts, loggedIn: true });
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});


router.get ('/edit/:id', withAuth, function (req, res) {
  Post.findByPk({ where: {id: req.params.id},
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [{ model: Comment, attributes: 
      ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username']
    }},
    { model: User, attributes: ['username']}
             ]
  })
  
 .then(dbPostData => {
  if (dbPostData) {
    const post = dbPostData.get({ plain: true });
    
    res.render('edit-post', {
      post,
      loggedIn: true
    });
  } else {
    res.status(404).end();
  }
})
.catch(err => {
  res.status(500).json(err);
});
});

  module.exports = router;