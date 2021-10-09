const router = require('express').Router();

const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', function (req, res) {
  Comment.findAll().then(function (dbCommentData) {
    return res.json(dbCommentData);
  })
  .catch (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, function (req, res) {
  if (req.session) {
    Comment.create ({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })

    .then(function (dbCommentData) {
      return res.json(dbCommentData);
    })
    .catch (function (err) {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

router.delete ('/:id', function (req, res) {
  Comment.destroy({ where: {id: req.params.id }})
  .then(function (dbCommentData) {
    if (!dbCommentData) {
      res.status(404).json ({ message: 'no comments found'});
      return;
    }
      res.json(dbCommentData);
})
.catch (function (err) {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;
