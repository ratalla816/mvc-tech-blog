const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', function (req, res) {
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at'],
   include:
     [
      { model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: { model: User,
                   attributes: ['username']}},
      { model: User, attributes: ['username']}
     ]

  }) 
    .then(function (dbPostData) {
    return res.json(dbPostData);
  })
   .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', function (req, res) {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include:
  [
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username'] }
    },

    { model: User, attributes: ['username'] }
  ]})

  .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json({ message: 'Post not found' });
      
      return;
    }

    res.json(dbPostData);
  })
    .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, function (req, res) {
  Post.create ({ 
    title: req.body.title,
     post_url: req.body.post_url,
     user_id: req.session.user_id
    })

  .then(function (dbPostData) {
    return res.json(dbPostData);
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
}); 


router.put('/:id', withAuth, function (req, res) {
  Post.update({ title: req.body.title }, 
    { where: { id: req.params.id }
  })

  .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json ({ message: 'Post not found' });
      return;
    }

    res.json(dbPostData);
  })
  .catch (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete ('/:id', function (req, res) {
  Post.destroy ({ where: { id: req.params.id }

  })
  .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json ({ message: 'Post not found' });
      return;
    }
    res.json(dbPostData);
  })

  .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;