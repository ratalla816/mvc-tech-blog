const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    where: { user_id: req.session.user_id },
    
    attributes:
    ['id',
      'title',
      'created_at',
      'post_content'],

    include: 
    [
      {
        model: Comment,
        attributes:
        ['id',
         'comment_text',
         'post_id',
         'user_id',
         'created_at'],
       
          include:
        { model: User, attributes: ['username']}
      },

      { model: User, attributes: ['username']}
    ]
  })

    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard',
        { posts, loggedIn: true });

    })

  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/new/', withAuth, (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes:
    ['id',
     'title',
     'created_at',
     'post_content'],

    include: 
    [
      {
        model: Comment,
        attributes:
        ['id',
          'comment_text',
          'post_id',
          'user_id',
          'created_at'],

        include:
         { model: User, attributes: ['username']}
      },

      { model: User, attributes: ['username']}
    ]
 })

  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('new-post', { posts, loggedIn: true});

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {id: req.params.id}, 

    attributes:
     ['id', 
      'title',
      'created_at',
      'post_content'],

    include:
      [
        {
          model: Comment,
          attributes: 
          ['id',
           'comment_text',
           'post_id',
           'user_id',
           'created_at'],

          include: 
          { model: User, attributes: ['username']}
        },

        { model: User, attributes: ['username']}
     ]

  })
    .then(dbPostData => {
        if (dbPostData)  {
       const post = dbPostData.get({ plain: true });

       res.render('edit-post', { post, loggedIn: true });
      } else { res.status(404).end() }
    })
    
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;