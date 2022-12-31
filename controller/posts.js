const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const AWS = require('aws-sdk')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


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

const algoliasearch = require('algoliasearch')
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const postIndex = algoliaClient.initIndex('post')

async function saveToAlgolia(object){

    console.log(object)

    const { id, condition, options, zipcode, image_url, purchase_date } = object
    const { year, make, model, trim, transmission, engine } = object.car

    const record = [{
        objectID: id,
        condition: condition,
        options: options,
        zipcode: zipcode,
        image_url: image_url,
        purchase_date: purchase_date,
        car: {
            year: year,
            make: make, 
            model: model,
            trim: trim,
            transmission: transmission,
            engine: engine
        }
    }]
    
    postIndex
        .saveObjects(record)
        .then(({objectIDs}) => {
            console.log(objectIDs)
        })
        .catch(err => {
            console.log(err)
        })

}

const createPost = async (req, reply) => {

    const ip = req.ip

    const data = await req.file()

    const { condition, msrp, down_payment, tax, market_adjustment, fees, options, zipcode, purchase_date, year, make, model, trim, transmission, engine } = JSON.parse(data.fields.body.value)

    const file = data.file

    const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'images/'+data.filename,
        Body: file
    }).promise()

    const post = await prisma.post.create({
        data: {
            condition: condition,
            msrp: decimalToCents(msrp),
            down_payment: decimalToCents(down_payment),
            tax: decimalToCents(tax), 
            market_adjustment: decimalToCents(market_adjustment),
            fees: decimalToCents(fees), 
            options: options,
            image_url: uploadedImage.Location,
            zipcode: Number(zipcode),
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
        },
        include: {
            car: true
        }
    }) 

    saveToAlgolia(post)

    return post.id
}

const searchPosts = async (req, reply) => {
    const { make, model, year } = req.params;
    
    // const posts = await prisma.post.findMany({
    //     where: {
    //         car: {
    //             make: make,
    //             model: model,
    //             year: year
    //         }
    //     },
    //     include:{
    //         car: true
    //     }
    // })
    
    return make
}

// const updatePost = async (req, reply) => {
//     const id = Number(req.params.id)
//     const post = await prisma.post.update({
//         where: {
//             id: id
//         }, 
//         data: {
//             market_adjustment: 5000
//         }
//     })
//     return post
// }

// const deletePost = async (req, reply) => {}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    searchPosts
}