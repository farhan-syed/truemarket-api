const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const algoliasearch = require('algoliasearch')
const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY)
const postIndex = algoliaClient.initIndex('post')

function totalCost(msrp, market_adjustment, fees, tax){
    const total = msrp + market_adjustment + fees + tax
    return total
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


async function main(){
    await prisma.$connect()

    const posts = await prisma.post.findMany({
        include: {
            car: true
        }
    })
    
    
    posts.forEach(element => {

        const { id, condition, msrp, tax, market_adjustment, fees, options, zipcode, image_url, purchase_date } = element
        const { year, make, model, trim, transmission, engine } = element.car

        const date = new Date(purchase_date)

        const record = [{
            objectID: id,
            condition: condition,
            total_cost: totalCost(msrp, market_adjustment, fees, tax),
            options: options,
            zipcode: zipcode,
            image_url: image_url,
            purchase_date: date.toLocaleDateString(),
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
    

    });


}