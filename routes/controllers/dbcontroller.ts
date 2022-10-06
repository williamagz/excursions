import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// interface Excursion {
//     name:       string;
//     starDate:   string;
//     endDate:    string;
//     type:       string;
//     cost?:      number;
// }


export function formatExcursionData (data: Prisma.excursionCreateInput) { 
    return data   
}

export function formatActivityData (data: any) { 
    const activityData = {
        name: data.name,    
        latitude: data.latitude,
        longitude: data.longitude,
        descripton: data.descripton,
        stock: data.stock,
        minimunDuration: data.minimunDuration,
        rating: data.rating,
        cost: data.cost, 
        country: data.country? data.country : "No Country",
        city: data.city? data.city : "No City", 
        pictures:{
            create: data.pictures, 
         } ,
        type: { connect: {id: data.type}},
        }
    return activityData   
}

export function formatActivityToExcursion (data: Prisma.activityOnExcursionCreateInput) {
    return data
}


const excursion: Prisma.excursionCreateInput [] = [
    {
        name: "excursion de la naturaleza",
        startDate: "12/12/2022",
        endDate: "21/12/2022",
        type: "excursion",
        cost: 1500.0,                
    }
]

export async function storeExcursion (excursionData: Prisma.excursionCreateInput) {
    try {
        const operation = await prisma.excursion.create({
            data: excursionData,
        })
        return operation
    } catch (e) {
        return (e)
    }
}

export async function storeActivity (activityData: Prisma.activityCreateInput) {
    try {
        console.log("proceso storeActivity")
        console.log(activityData)
        const operation = await prisma.activity.create({
            data: activityData,
        })
        return operation
    } catch (e) {
        return (e)
    }
}

export async function relationActivityToExcursion (relation: any) {
    try {
        const operation = await prisma.activityOnExcursion.create({
            data: relation,
        })
        return operation
    } catch (e) {
        return (e)
    }
}


export async function getExcursionData (id: string) {
    try {
        const excursion = await prisma.excursion.findUnique({
            where: {
                id: id,
              },
              include: {
                activity: true,
              }
        })
        return excursion
    } catch (e) {
        return (e)
    }
}

export async function getActivityData (id: string) {
    try {
        const activity = await prisma.activity.findUnique({
            where: {
                id: id,
              },
              include: {
                type: true,
                pictures: true,
              }
        })
        return activity
    } catch (e) {
        return (e)
    }
}

export async function getActivityDataCity (city: string) {
    try {
        const activity = await prisma.activity.findMany({
            where: {
                city: city,
              },
              include: {
                type: true,
                pictures: true,
              }
        })
        return activity
    } catch (e) {
        return (e)
    }
}

export async function getActivityDataCountry (country: string) {
    try {
        const activity = await prisma.activity.findMany({
            where: {
                city: country,
              },
              include: {
                type: true,
                pictures: true,
              }
        })
        return activity
    } catch (e) {
        return (e)
    }
}

// -------------------  Validate Functions ---------------------------------

// Revisa si es una fecha valida
function validateDate (data: any) {

}

function validateString (data:any) {


}

function validateNumber (data:any) {


}

function validateMoney (data:any) {


}



