const postController = require('../controller/posts')

const routes = [{
        method: 'GET',
        url: '/api/posts',
        handler: postController.getAllPosts
    },
    {   method: 'GET', 
        url: '/api/posts/:id',
        handler: postController.getPost
    },
    {
        method: 'POST',
        url: '/api/posts',
        handler: postController.createPost
    },
    {
        method: 'PUT',
        url: '/api/posts/:id',
        handler: postController.updatePost
    },
    {
        method: 'DELETE',
        url: '/api/posts/:id',
        handler: postController.deletePost
    }
]
module.exports = routes