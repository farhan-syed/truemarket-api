const carController = require('../controller/cars')

const routes = [{
        method: 'GET',
        url: '/api/cars',
        handler: carController.getAllCars
    },
    {   method: 'GET', 
        url: '/api/cars/:id',
        handler: carController.getCar
    },
    {
        method: 'POST',
        url: '/api/cars',
        handler: carController.createCar
    },
    {
        method: 'PUT',
        url: '/api/cars/:id',
        handler: carController.updateCar
    },
    {
        method: 'DELETE',
        url: '/api/cars/:id',
        handler: carController.deleteCar
    }
]
module.exports = routes