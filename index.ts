import express from 'express'
import { PrismaClient } from '@prisma/client'
import {indexRouter} from './routes/index';
const port = 6000

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*' ); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use('/', indexRouter)


  const server = app.listen(port, () =>
    console.log(`
🚀 Server ready at: http://localhost:${port}`),
)
