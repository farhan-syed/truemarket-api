const postController = require('../controller/posts')

const routes = [
  {
    method: 'GET',
    url: '/api/posts',
    handler: postController.getAllPosts,
  },
  { method: 'GET', url: '/api/posts/:id', handler: postController.getPostById },
  {
    method: 'POST',
    url: '/api/posts',
    handler: postController.createPost,
  },
  {
    method: 'GET',
    url: '/api/posts/user/:id',
    handler: postController.getPostsByUserId,
  },
]
module.exports = routes
