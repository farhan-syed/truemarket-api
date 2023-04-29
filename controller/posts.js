const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

function decimalToCents(decimal) {
  return Math.round(decimal * 100)
}

const getAllPosts = async (req, reply) => {
  const posts = await prisma.post.findMany({
    include: {
      car: true,
    },
  })
  return posts
}

const getPostById = async (req, reply) => {
  const id = Number(req.params.id)
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      condition: true,
      msrp: true,
      down_payment: true,
      tax: true,
      market_adjustment: true,
      options: true,
      purchase_date: true,
      created_at: true,
      fees: true,
      image_url: true,
      zipcode: true,
      car: {
        select: {
          id: true,
          year: true,
          make: true,
          model: true,
          trim: true,
          transmission: true,
          engine: true,
        },
      },
    },
  })
  console.log(post)
  return post
}

const getPostsByUserId = async (req, reply) => {
  const id = req.params.id
  const posts = await prisma.post.findMany({
    where: {
      user_id: id,
    },
    include: {
      car: true,
    },
  })

  return posts
}

const createPost = async (req, reply) => {
  const data = await req.file()

  const {
    condition,
    msrp,
    down_payment,
    tax,
    market_adjustment,
    fees,
    options,
    zipcode,
    purchase_date,
    year,
    make,
    model,
    trim,
    transmission,
    engine,
  } = JSON.parse(data.fields.body.value)

  const file = data.file

  const uploadedImage = await s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'images/' + data.filename,
      Body: file,
    })
    .promise()

  const post = await prisma.post.create({
    data: {
      user_id: data.fields.user_data.value,
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
      car: {
        create: {
          year: parseInt(year),
          make: make,
          model: model,
          trim: trim,
          transmission: transmission,
          engine: engine,
        },
      },
    },
    include: {
      car: true,
    },
  })

  return post.id
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getPostsByUserId,
}
