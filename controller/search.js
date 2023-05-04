const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const searchWithQuery = async (req, reply) => {
  const query = req.params.query
  const posts = await prisma.$queryRaw`
  SELECT post.id, condition, zipcode, options, make, model, trim, year, (msrp+market_adjustment+tax+fees)-discount AS "total", purchase_date
  FROM post
  JOIN car ON post.car_id = car.id
  WHERE to_tsvector(condition || ' ' || options || ' ' || "zipcode"::text || ' ' || car.year || ' ' || car.make || ' ' || car.model || ' ' || car.trim) @@ to_tsquery(${query})
  ORDER BY purchase_date desc;`
  return posts
}

module.exports = {
  searchWithQuery,
}
