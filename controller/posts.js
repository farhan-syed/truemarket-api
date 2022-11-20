let posts = [
    {
        "id": 1,
        "car_id": 1,
        "condition": "new",
        "msrp": 49470,
        "down_payment": 15000,
        "tax": 3000,
        "market_adjustment": 0,
        "doc_fee": 100,
        "financing": "loan",
        "date": "07-14-2022",
        "image_url?": "aws_s3_bucket_url",
        "created_at": "11-02-2022"
    },
    {
        "id": 2,
        "car_id": 2,
        "condition": "new",
        "msrp": 65450,
        "down_payment": 0,
        "tax": 4000,
        "market_adjustment": 0,
        "doc_fee": 100,
        "financing": "lease",
        "date": "07-14-2022",
        "image_url?": "aws_s3_bucket_url",
        "created_at": "11-02-2022"
    }
]

const getAllPosts = async (req, reply) => {
    return posts
}

const getPost = async (req, reply) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id)
    return post
}

const createPost = async (req, reply) => {
    
}

const updatePost = async (req, reply) => {

}

const deletePost = async (req, reply) => {

}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}