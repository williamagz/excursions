import { PrismaClient, Prisma, activityType } from '@prisma/client'
const prisma = new PrismaClient()

console.log(`Start Seeding...`)

const type: Prisma.activityTypeCreateInput[] = [
    {name: "Instructivas / Educativas" },
    {name: "Culturales" },
    {name: "Recreativas" },
    {name: "naturaleza o Ecoturismo" },
    {name: "Montaña y Aventura" },
    {name: "Gastronomicas" },
    {name: "Deportivas" },
    {name: "Salud / Bienestar" },
    {name: "Religiosas" },
]

const activityData: Prisma.activityCreateInput [] = [
    {
    name: "The grace of Vila de Gracia (Available in Spanish)",    
    latitude: "41.397972",
    longitude: "2.158032",
    descripton: "<p>A <strong>tour of the charming Gracia neighborhood</strong> , a hidden gem of sleepy squares, which houses in its tree-lined streets, artist galleries, local artisan shops and restaurants for all palates.<br><br> The <strong>birthplace of Barcelona's musical style: La Rumba Catalana.</strong> You will also get to know the most historical side of the neighborhood, a lesser-known image of revolutions, insurrections and wars.<br><br> Finally, you will be able to see <strong>Casa Vicens</strong> , which was the <strong>first house</strong> <strong>made</strong> by Antoni <strong>Gaudí.</strong><br><br> <strong>WHAT WE WILL SEE ON THIS TOUR:</strong></p><ul><li> <strong>FUSTER HOUSE</strong></li><li> <strong>PLAZA VILA DE GRACIA</strong></li><li> <strong>RASPALL SQUARE</strong></li><li> <strong>SQUARE OF THE REVOLUTION</strong></li><li> <strong>VERDI STREET</strong></li><li> <strong>PLAZA DE LA VIRREINA</strong></li><li> <strong>DIAMANT SQUARE</strong></li><li> <strong>VICENS HOUSE</strong></li><li> <strong>PLAZA LESSEPS</strong></li></ul><p><br><br> Guide: Carlitos<br><br> Price: Free Offer You set the price!<br><br></p><p>Free tour: Book for free and pay what you want at the end</p>",
    stock: 15,
    minimunDuration: "2 hours",
    rating: "4.5",
    cost: 0.0,  
    country: "Spain",
    city: "Barcelona",
    pictures:{
        create: [
             {url: "https://media.guruwalk.com/e4cyuvykrg06z84tlhqu71om6b4c"},
             {url: "https://media.guruwalk.com/7i73igzwpqa8ux8g53hwtoqeo15v"},
             {url: "https://media.guruwalk.com/d3rhz22mkh28bwtmkqmtfn0cocag"},
             {url: "https://media.guruwalk.com/x1pl4cshr9e4f99xtx6uqbcipm0t"},
             {url: "https://media.guruwalk.com/jmn0ka6ukm9y2jsmbsyohc0pyn36"}, 
        ] 
     } ,
    type: { connect: {id: 2}},
},
// {
//     name: 'Buenos Aires City Center Walking Tour: History and Stories (Available in English)',
//     latitude: '-34.609708',
//     longitude: '-58.390333',
//     descripton: '<p>Have you ever walked the same usual path and discovered new things that you have never seen before? With WalkBA you will discover how wonderful our city is. Join us to discover the place known as the Paris of Latin America. We offer walking tours, with our incredible guides, that will make you have fun in our city. Included:<br><br> Congreso de la Nacion<br> Palacio Barolo<br> Av 9 de julio<br> Cafe Tortoni<br> Plaza de Mayo<br> Casa Rosada<br> Obelisk<br> And more<br><br> We are waiting for your reservation to walk the city together!</p><p>Free tour: Book for free and pay what you want at the end</p>',
//     stock: 0,
//     minimunDuration: '1 hour 45 minutes',
//     rating: '4.3',
//     cost: 0,
//     pictures: { create: [ 
//         {url: "https://media.guruwalk.com/e4cyuvykrg06z84tlhqu71om6b4c"},
//         {url: "https://media.guruwalk.com/7i73igzwpqa8ux8g53hwtoqeo15v"},
//      ] },
//     type: { connect: { id: 7 } }
//   }
]


const excursion: Prisma.excursionCreateInput [] = [
    {
        name: "excursion del colegio",
        startDate: "12/12/2021",
        endDate: "21/12/2021",
        type: "excursion",
        cost: 500.0,                
    }
]

const relationship = [
    {
        activityId: '199095e8-3a6b-4cf9-8d2b-019c5e875330',
        excursionId: '73082722-92d6-4247-9da1-502929714c14',
    }
]



async function main() {
    console.log(`Start Seeding...`)
    for (const u of type) {
        const types = await prisma.activityType.create({
            data: u,
        })
        console.log(`Created type with id: ${types.id}`)
    }
    for (const u of activityData) {
        const activities = await prisma.activity.create({
            data: u,
        })
        console.log(`Created Activity with id: ${activities.id}`)
    }
    for (const u of excursion) {
        const excursions = await prisma.excursion.create({
            data: u,
        })
        console.log(`Created Excursion with id: ${excursions.id}`)
    }
    // for (const u of relationship) {
    //     const relation = await prisma.activityOnExcursion.create({
    //         data: u,
    //     })
    //     console.log(`Created Excursion with id: ${relation}`)
    // }




}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
            process.exit(1)        
    })


    