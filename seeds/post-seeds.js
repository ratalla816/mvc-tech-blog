
const { Post } = require('../models');

const postdata = [
  
  {
    title: 'This website is so awesome!',
    post_content: 'Rob is every bit as talented as he is handsome',
    user_id: 2
  },
 
  {
    title:
      'This robot is pretty sweet.',
    post_content: 'https://www.youtube.com/watch?v=9kawY1SMfY0',
    user_id: 8
  },
 
  {
    title: 'Can somebody look at this code and give me some tips?',
    post_content: 'https://github.com/ratalla816/mvc-tech-blog',
    user_id: 4
  },
 
  {
    title: 'timmah!',
    post_content: 'timmah?',
    user_id: 1
  },
 
  {
    title: 'Rob is not that cool. tst',
    post_content: 'He can barely even write javascript or somthin',
    user_id: 6
  },
 
  {
    title: 'I am running out of ideas for fake blog posts',
    post_content: 'I cannot wait to get this challenge over with',
    user_id: 3
  }
  ];

const seedPosts = function seedPosts() {
 return Post.bulkCreate(postdata);
};

module.exports = seedPosts;