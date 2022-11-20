let cars = [
    {
        "id": 1,
        "year": 2022,
        "brand": "BMW",
        "model": "3 Series",
        "trim": "330i",
        "transmission": "8 Speed Automatic",
        "engine": "2.0L 255hp I4"
    },
    {
        "id": 2,
        "year": 2022,
        "brand": "BMW",
        "model": "3 Series",
        "trim": "330i",
        "transmission": "8 Speed Automatic",
        "engine": "2.0L 255hp I4"
    }
]

const getAllCars = async (req, reply) => {
    return cars
}

const getCar = async (req, reply) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id)
    return car
}

const createCar = async (req, reply) => {
    
}

const updateCar = async (req, reply) => {

}

const deleteCar = async (req, reply) => {

}

module.exports = {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}