import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

//Custom middleware
const log = (req, res, next) => {
  console.log('logging')
  req.mydata = 'holitas'
  //next(new Error('yes')) // If you send a parameter to next function it throws an error it should
  next()
}
// In this way the middleware is executed as global
//app.use(log);
// In this way the middleware is executed only for this endpoint
app.get('/', [log, log], (req, res) => {
  res.send({ data: req.mydata })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is running on 3000')
  })
}
