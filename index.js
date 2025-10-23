require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({credentials: true, origin: process.env.ORIGIN}))
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.status(200).json({
    message: '✅ API está funcionando!',
    status: 'ok'
  })
})
const EmailRoutes = require('./routes/EmailRoutes')
app.use('/email', EmailRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT)