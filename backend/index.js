const express = require('express')
const app = express()
const routes = require('./routes/routes')
const cors = require('cors')

app.use(cors({ credentials: true, origin:  "http://localhost:3000"}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', routes)
const port = 5000

app.listen(port, ()=>{
    console.log(`Programa iniciado na porta ${5000}`)
})