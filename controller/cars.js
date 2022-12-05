const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllCars = async (req, reply) => {
    const cars = await prisma.car.findMany();
    return cars
}

const getCar = async (req, reply) => {
    const id = Number(req.params.id);
    const car = cars.find(car => car.id === id)
    return car
}

const createCar = async (req, reply) => {
    const { year, make, model, trim, transmission, engine } = req.body
    const car = await prisma.car.create({
        data: {
            year: year,
            make: make, 
            model: model,
            trim: trim,
            transmission: transmission,
            engine: engine
        }
    })
    return car.id
}

const updateCar = async (req, reply) => {}

const deleteCar = async (req, reply) => {}

module.exports = {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}