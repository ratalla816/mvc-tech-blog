const router = require('express').Router();
const withAuth = require('../../utils/auth');
const _require = require('../../models'),
    Post = _require.Post,
    User = _require.User,
    Comment = _require.Comment;

router.get('/', function (req, res) {
  Post.findAll({
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [{ model: User, attributes: ['username']}, 
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: { model: User, attributes: ['username']}
    }]
  })
  
  .then (function (dbPostData) {
    return res.json(dbPostData);
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', function (req, res) {
  Post.findOne({
    where: {id: req.params.id },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [{ model: User, attributes: ['username']}, 
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {model: User, attributes: ['username']}
    }]
  })

  .then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json({
        message: 'Sorry, no posts found' });
      return;
    }

    res.json(dbPostData);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, function (req, res) {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
  .then(function (dbPostData) {
    return res.json(dbPostData);
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, function (req, res) {
  Post.update({
    title: req.body.title,
    post_text: req.body.post_text
  }, {
    where: {
      id: req.params.id
    }
  }).then(function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json({
        message: 'Sorry, no posts found' });
      return;
    }

    res.json(dbPostData);
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router ["delete"] ('/:id', withAuth, function (req, res) {
  Post.destroy ({where: {id: req.params.id}
  })
  .then (function (dbPostData) {
    if (!dbPostData) {
      res.status(404).json({
        message: 'Sorry, no posrs found'});
      return;
    }

    res.json(dbPostData);
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
