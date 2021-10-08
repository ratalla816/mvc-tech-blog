
const { Comment } = require('../models');

const commentdata = [
  
  {
  comment_text: 'No he isnt.',
  user_id: 6,
  post_id: 1
  }, 
  
  {
  comment_text: 'Its like the Terminator or somthin tst.',
  user_id: 6,
  post_id: 2
  }, 
  
  {
  comment_text: 'delete and start over.',
  user_id: 3,
  post_id: 3
  }, 

  {
  comment_text: 'Shut up Chippah. Nobody talks about Rob like that.',
  user_id: 5,
  post_id: 5
  }, 
  
  {
  comment_text: 'I know, I havent even started on mine :(',
  user_id: 3,
  post_id: 6
  },
 ];

  const seedComments = function seedComments() {
  return Comment.bulkCreate(commentdata);
  };

module.exports = seedComments;