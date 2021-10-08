
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
   
  {
  username: 'timmah',
  email: 'timmy@southpark.com',
  password: 'password123'
  }, 
 
  {
  username: 'katester',
  email: 'katie1@fakeemail.com',
  password: 'password123'
  },

 {
  username: 'gregorio',
  email: 'greg_hughes@fakeemail.com',
  password: 'password123'
 },

 {
  username: 'ratalla816',
  email: 'rob.atalla@gmail.com',
  password: 'password123'
}, 

{
  username: 'lamarvsted',
  email: 'lamar@fakeemail.com',
  password: 'password123'
}, 

{
  username: 'chipsorsomthin',
  email: 'chip.chipperson@fakeemail.com',
  password: 'password123'
}, 

{
  username: 'tscheckler1',
  email: 'ted_scheckler@fakeemail.com',
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