const searchController = require('../controller/search')

const routes = [
  {
    method: 'GET',
    url: '/api/search/:query',
    handler: searchController.searchWithQuery,
  },
]

module.exports = routes
