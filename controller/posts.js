const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function decimalToCents(decimal){
    return Math.round(decimal * 100)
}

const getAllPosts = async (req, reply) => {
    const posts = await prisma.post.findMany({
        include: {
            car: true
        }
    })
    return posts
}

const getPost = async (req, reply) => {
    const id = Number(req.params.id);
    // const post = posts.find(post => post.id === id)
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            car: true
        }
    })
    return post
}

const createPost = async (req, reply) => {
    const { condition, msrp, down_payment, tax, market_adjustment, doc_fee, options, image_id, purchase_date, year, make, model, trim, transmission, engine } = req.body

    const post = await prisma.post.create({
        data: {
            condition: condition,
            msrp: decimalToCents(msrp),
            down_payment: decimalToCents(down_payment),
            tax: decimalToCents(tax), 
            market_adjustment: decimalToCents(market_adjustment),
            doc_fee: decimalToCents(doc_fee), 
            options: options,
            image_url: null,
            purchase_date: new Date(purchase_date),
            car:{
                create: {
                    year: parseInt(year),
                    make: make,
                    model: model,
                    trim: trim,
                    transmission: transmission,
                    engine: engine
                }   
            }
        }
    })
    
    return post.id
}

const updatePost = async (req, reply) => {
    const id = Number(req.params.id)
    const post = await prisma.post.update({
        where: {
            id: id
        }, 
        data: {
            market_adjustment: 5000
        }
    })
    return post
}

const deletePost = async (req, reply) => {}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}