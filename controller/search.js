const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const searchWithQuery = async (req, reply) => {
  const query = req.params.query
  const posts = await prisma.$queryRaw`
  SELECT post.id, condition, zipcode, options, make, model, trim, year, msrp+down_payment+tax+market_adjustment AS "total", purchase_date
  FROM post
  JOIN car ON post.car_id = car.id
  WHERE purchase_date>='2022-02-23' AND  to_tsvector(condition || ' ' || options || ' ' || "zipcode"::text || ' ' || car.year || ' ' || car.make || ' ' || car.model || ' ' || car.trim) @@ to_tsquery(${query});`
  return posts
}

module.exports = {
  searchWithQuery,
}
