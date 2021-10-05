const router = require('express').Router();
const withAuth = require('../../utils/auth');
const _require = require('../../models'),
    User = _require.User,
    Post = _require.Post,
    Comment = _require.Comment;

router.get ('/', function (req, res) {
  User.findAll ({ attributes: { exclude: ['password']}
  })
  .then(function (dbUserData) {
    return res.json(dbUserData);
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get ('/:id', function (req, res) {
  User.findOne ({ attributes: { exclude: ['password']},
    where: { id: req.params.id},
    include: [{ model: Post, attributes: 
        ['id', 'title', 'post_text', 'created_at']}, 
     {model: Comment, attributes: ['id', 'comment_text', 'created_at']}
    ]
  })
  
  .then(function (dbUserData) {
    if (!dbUserData) {
      res.status(404).json ({ message: 'Sorry, no users found' });
      return;
    }
  })
  ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', function (req, res) {
  User.create
  ({username: req.body.username,
    password: req.body.password})
    
  .then(function (dbUserData) {
    req.session.save(function () {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json(dbUserData);
   });
 })
 ["catch"] (function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/login', function (req, res) {
  User.findOne ({ where: {username: req.body.username }
  })
  .then(function (dbUserData) {
    if (!dbUserData) {
      res.status(400).json({ message: 'Sorry, no users found' });
      return;
    }

  const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json ({ message: 'Sorry, incorrect iassword' });
      return;
    }

    req.session.save(function () {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;

      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'Welcome' });
    });
  });
});

router.post('/logout', function (req, res) {
  if (req.session.loggedIn) {
    req.session.destroy(function () {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', function (req, res) {
  User.update(req.body, {individualHooks: true, where: {id: req.params.id}
 }) 

  .then(function (dbUserData) {
    if (!dbUserData[0]) {
      res.status(404).json ({ message: 'Sorry, no users found' });
      return;
    }

    res.json(dbUserData);
  })["catch"](function (err) {
    res.status(500).json(err);
  });
});
router["delete"]('/:id', function (req, res) {
  User.destroy({ where: {id: req.params.id }
  })
  .then(function (dbUserData) {
    if (!dbUserData) {
      res.status(404).json ({ message: 'Sorry, no users found' });
      return;
    }

    res.json(dbUserData);
  })["catch"](function (err) {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;