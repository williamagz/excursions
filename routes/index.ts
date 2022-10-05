import { Router } from 'express'
import {excursionRouter} from './excursion'

const indexRouter = Router()

indexRouter.use('/', (req,res, next) => {
    console.log("Estamos en el /")
    //res.send('estas en la ruta Principal ')
    next ()
})

indexRouter.use('/Excursion', excursionRouter)

export {indexRouter}