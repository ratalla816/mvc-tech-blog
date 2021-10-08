
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
  username: 'derimarg',
  email: 'derimarg@email.com',
  password: 'password'
  },
 
  {
  username: 'jwilloughway1',
  email: 'rmebes1@sogou.com',
  password: 'password123'
  }, 
 
  {
  username: 'iboddam2',
  email: 'cstoneman2@last.fm',
  password: 'password123'
  }, 
 
  {
  username: 'dstanmer3',
  email: 'ihellier3@goo.ne.jp',
  password: 'password123'
  }, 
 
  {
  username: 'djiri4',
  email: 'gmidgley4@weather.com',
  password: 'password123'
  },

 {
  username: 'msprague5',
  email: 'larnout5@imdb.com',
  password: 'password123'
 },

 {
  username: 'mpergens6',
  email: 'hnapleton6@feedburner.com',
  password: 'password123'
}, 

{
  username: 'tpenniell7',
  email: 'kperigo7@china.cn',
  password: 'password123'
}, 

{
  username: 'msabbins8',
  email: 'lmongain8@google.ru',
  password: 'password123'
}, 

{
  username: 'jmacarthur9',
  email: 'bsteen9@epa.gov',
  password: 'password123'
},

{
  username: 'tomtom1',
  email: 'tom@tom.com',
  password: 'password1234'
}
];

const seedUsers = function seedUsers() {
  return User.bulkCreate(userdata, { individualHooks: true });
};

module.exports = seedUsers;