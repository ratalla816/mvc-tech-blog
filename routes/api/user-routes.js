const router = require('express').Router();

const _require = require('../../models'),
    User = _require.User;

router.get('/', function (req, res) {
  User.findAll({ attributes: { exclude: ['password']}
  })

  .then(function (dbUserData) {
    return res.json(dbUserData);
  })

  .catch(function (err) {
    console.log(err);
    res.status(500).json(err);
  });

  router.get ('/:id', function (req, res) {
    User.findOne ({ attributes: { exclude: ['password'] },
      where: { id: req.params.id }

    })

    .then(function (dbUserData) {
      if (!dbUserData) { 
        res.status(404).json ({ message: 'user not found' });
  
      return;
    } res.json(dbUserData);
   })
  
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });

  });

  router.post ( '/', function (req, res) {
    // expects {username: 'ratalla816',  password: 'password1234', email: 'rob.atalla@gmail.com'}
   User.create
    ({username: req.body.username,
      password: req.body.password,
      email: req.body.email })
  
    .then(function (dbUserData) { 
      return  res.json(dbUserData);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.post('/login', function (req, res) {
  
    // expects {email: 'rob.atalla@gmail.com', password: 'password1234'}
    User.findOne({
      where: {email: req.body.email}
    })
  
    .then(function (dbUserData) {
      if (!dbUserData) {
        res.status(400).json( { message: 'user not found'} );
        return;
      }
  
  const validPassword = dbUserData.checkPassword (req.body.password); 
  if (!validPassword) {
    res.status(400).json({ message: 'invalid password' });
    return;
  }

  res.json({ user: dbUserData, message: 'user logged in' });
});
});

router.put('/:id', function (req, res) {
   // expects {username: 'ratalla816', password: 'password1234', email: 'rob.atalla@gmail.com'}
   User.update(req.body, {
    individualHooks: true,
    where: { id: req.params.id }
  })

  .then(function (dbUserData) {
    if (!dbUserData[0]) {
      res.status(404).json ({ message: 'user not found'});

      return;
    }

    res.json(dbUserData);
     })
    })
   
     .catch(function (err) {
       console.log(err);
       res.status(500).json(err);
     });
    });

    router.delete ('/:id', function (req, res) {
      User.destroy( { where: { id: req.params.id }
      })
    
      .then(function (dbUserData) {
        if (!dbUserData) {
          res.status(404).json( { message: 'user not found' });
    
        return;
      }

      res.json(dbUserData);
     })
     .catch(function (err) {
       console.log(err);
       res.status(500).json(err);
     });
    });

    module.exports = router;