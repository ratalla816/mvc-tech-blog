const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}
  // set up method to run on instance data (per user) to check password
  

// create fields/columns for User model

      // set up beforeCreate lifecycle "hook" functionality
      

module.exports = User;
