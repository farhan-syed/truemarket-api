const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getAllPosts = async (req, reply) => {
    const posts = await prisma.post.findMany()
    return posts
}

const getPost = async (req, reply) => {
    const id = Number(req.params.id);
    // const post = posts.find(post => post.id === id)
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    return post
}

const createPost = async (req, reply) => {
    const { car_id, condition, msrp, down_payment, tax, market_adjustment, doc_fee, options, image_id, purchase_date } = req.body
    const post = await prisma.post.create({
        data: {
            car_id: car_id,
            condition: condition,
            msrp: msrp,
            down_payment: down_payment,
            tax: tax, 
            market_adjustment: market_adjustment,
            doc_fee: doc_fee, 
            options: options,
            image_id: image_id,
            purchase_date: new Date(purchase_date)
        }
    })
    return post
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