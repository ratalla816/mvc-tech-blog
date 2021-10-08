const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: 
    ['id',
     'title',
     'created_at',
     'post_content'],

    order: ['created_at'],
    include: 
    [
      {
        model: 
        Comment,
        attributes: 
        ['id',
         'comment_text',
         'post_id',
         'user_id',
         'created_at'],

        include: { model: User, attributes: ['username'] }
      },

      {
        model: User,
        attributes: ['username']
      }
    ]

  })

  .then(dbPostData =>
    res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes:
    ['id',
     'title',
     'created_at',
     'post_content'],

    include:
    [
      { model: User, attributes: ['username']},

       {
        model: 
        Comment,
        attributes:
        ['id',
         'comment_text',
         'post_id',
         'user_id',
         'created_at'],

        include:
        { model: User, attributes: ['username']}
      }
    ]
  }
)
  
 .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No posts found' });
      return;
    }
    res.json(dbPostData);
  })
 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });

})

router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
  Post.update({
      title: req.body.title,
      post_content: req.body.post_content
       },
   { where: { id: req.params.id }})
    
  .then(dbPostData => {
    if (!dbPostData) {
     res.status(404).json({ message: 'No posts found' });
      return;
    }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: { id: req.params.id }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No posts found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;