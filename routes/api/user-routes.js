const router = require('express').Router();
const { User } = require('../../models');

// get all users




router.post('/', (req, res) => {
  // expects {username: 'ratalla816', email: 'rob.atalla@gmail.com', password: 'password1234'}
  
});

router.post('/login', (req, res) => {
  // expects {email: 'rob.atalla@gmail.com', password: 'password1234'}
  
});

router.put('/:id', (req, res) => {
  // expects {username: 'ratalla816', email: 'rob.atalla@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  

    });

module.exports = router;
