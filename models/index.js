const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, { foreignKey: 'user_id'});

Post.belongsTo(User, {foreignKey: 'user_id', onDelete: 'SET NULL'});

Comment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL'});

Comment.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'SET NULL'});

User.hasMany(Comment, { foreignKey: 'user_id',  onDelete: 'SET NULL'});

Post.hasMany(Comment, { foreignKey: 'post_id'});

module.exports = { User, Post, Comment };