import { Router} from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import {formatExcursionData, 
        storeExcursion, 
        formatActivityData, 
        storeActivity,
        relationActivityToExcursion,
        getExcursionData,
        getActivityData,
        getActivityDataCity,
      } from './controllers/dbcontroller'
import {getExcursionsApi,
        formatActivityDataApi} from './controllers/apicontrollers'
const prisma = new PrismaClient()

const excursionRouter:Router = Router();

excursionRouter.post('/createExcursion', async (req, res) => { 
  const {name, startDate, endDate, type, cost} = req.body
    try {
       const dataExcursion =  formatExcursionData({name, startDate, endDate, type, cost}) 
       if(dataExcursion) {const result = await storeExcursion(dataExcursion)
        console.log(result)
        return res.send(result)
      }       
      return res.send('Datos no validos')
    } catch (e) {
      res.status(400).json(e)
    }
  })


excursionRouter.post('/createActivity', async (req, res) => { 
  console.log("Esta en createActivity")
  const {name, 
        latitude,           
        longitude, 
        descripton, 
        stock, 
        minimunDuration, 
        rating,
        cost,
        country,
        city,
        pictures,
        type,
      } = req.body
    try {
        const dataActivity =  formatActivityData({ 
                                                  name, 
                                                  latitude, 
                                                  longitude, 
                                                  descripton, 
                                                  stock, 
                                                  minimunDuration, 
                                                  country,
                                                  city,
                                                  rating,
                                                  cost,
                                                  pictures,
                                                  type,
                                                }) 
      console.log(dataActivity)
      if(dataActivity) {
        const result = await storeActivity(dataActivity)
        return res.send(result)
      }  
      console.log(dataActivity)  
      return res.send('Datos no validos')
    } catch (e) {
      res.status(400).json(e)
    }
  })

excursionRouter.post('/attachActivityToExcursion', async (req, res) => { 
  const {activityId, excursionId} = req.body      
  const relation = {activityId: activityId, excursionId: excursionId}
    try {
      const result = await prisma.activityOnExcursion.create({
        data: relation,
    })  
    return res.send(result)
    } catch (e) {
      res.status(400).json(e)
    }
  })

  // -------------------------- Rutas GET ---------------------------------------

  excursionRouter.get('/excursions', async (req, res) => { 
      try {
          const excursions =  await prisma.excursion.findMany()
          if(excursions) {return res.json(excursions)
          }
          return res.send("No hay Excursiones")
        }  
       catch (e) {
        res.status(400).json(e)
      }
    })


excursionRouter.get('/findExcursionId', async (req, res) => { 
  const {id} = req.body
  console.log(id)
    try {
        const excursion =  await prisma.excursion.findMany({
          where: {
            id: id,
          },
          include: {
            activity: {
              select: {activityId: true}
            }
          }          
        })
        console.log(excursion)
        if(excursion) {return res.json(excursion)
        }
        return res.send("Id de excursion no encontrado")
      }  
     catch (e) {
      res.status(400).json(e)
    }
  })


excursionRouter.get('/findActivityDataId', async (req, res) => { 
  const {id} = req.body
    try {
        const activityData =  await getActivityData(id)
        if(activityData) {return res.json(activityData)
        }
        return res.send("Id de actividad no encontrado")
      }  
      catch (e) {
      res.status(400).json(e)
    }
  })

  excursionRouter.get('/findActivityDataCity', async (req, res) => { 
    const {city} = req.body
      try {
          const activityData =  await getActivityDataCity (city)
          if(activityData) {return res.json(activityData)
          }
          return res.send(`No hay actividades en ${city}`)
        }  
        catch (e) {
        res.status(400).json(e)
      }
    })


    excursionRouter.get('/findActivityDataCountry', async (req, res) => { 
      const {country} = req.body
        try {
            const activityData =  await getActivityDataCity (country)
            if(activityData) {return res.json(activityData)
            }
            return res.send(`No hay actividades en ${country}`)
          }  
          catch (e) {
          res.status(400).json(e)
        }
      })


// -----------------------------  Request API AMADEUS -------------------------

excursionRouter.get('/getActivityAPI', async (req, res) => { 
  const {latitude, longitude, radius, country, city} = req.body
    try {
        const activityData =  await getExcursionsApi({latitude, longitude, radius})
        if (activityData) {
          const formatData = formatActivityDataApi(activityData)          
          for (const u of formatData) {
            let temp = {...u, country: country, city: city}
            const reformatData = formatActivityData(temp)
            const activities = await storeActivity(reformatData)
          }
        } else {
          return res.send("No hay Actividades en la Zona")
        }
        return res.send(activityData)
      }  
      catch (e) {
      return res.status(400).json(e)
    }
  })

  excursionRouter.get('/countryList', async (req, res) => {
    try {
      const countryList =  await prisma.activity.findMany({
        select: {
          country: true,
        },
        distinct: ['country']
      })
      res.json(countryList)
    } catch (e) {
      res.status(400).json(e)
    }
  })

  excursionRouter.get('/cityList', async (req, res) => {
    try {
      const cityList =  await prisma.activity.findMany({
        select: {
          country: true,
        },
        distinct: ['country']
      })
      res.json(cityList)
    } catch (e) {
      res.status(400).json(e)
    }
  })

  excursionRouter.get('/cityListOfCountry', async (req, res) => {
    const {country} = req.body
    try {
      const cityList =  await prisma.activity.findMany({
        select: {
          city: true,
        },
        where: {
          country: country
        },
        distinct: ['city']
      })
      res.json(cityList)
    } catch (e) {
      res.status(400).json(e)
    }
  })





// ------------------------------  Rutas Update ---------------------------------

  excursionRouter.post('/updateExcursion', async (req, res) => {
    try {
      res.status(200).json("El Modulo /UpdateExcursion se encuentra en desarrollo")
    } catch (e) {
      res.status(400).json(e)
    }
  })

  excursionRouter.get('/findExcursion', async (req, res) => {
    try {
      res.status(200).json("El Modulo /FindExcursion se encuentra en desarrollo")
    } catch (e) {
      res.status(400).json(e)
    }
  })

  excursionRouter.get('/findExcursion', async (req, res) => {
    try {
      res.status(200).json("El Modulo /FindExcursion se encuentra en desarrollo")
    } catch (e) {
      res.status(400).json(e)
    }
  })



export {excursionRouter}