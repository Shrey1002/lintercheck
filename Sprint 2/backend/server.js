const express = require('express')
const app= express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
var morgan = require('morgan') // api


const signUpRoutes = require('./routes/SignUpRoutes')

//CONNECT DATABASE
mongoose.connect('mongodb+srv://sep:sep@superheros.3gh31.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(con =>{
    console.log(con.connections)
    console.log('DB connected')
})

//MIDDLEWARE
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

//ROUTES MIDDLEWARE
app.use('/Signup',signUpRoutes)

//LISTEN on port 9000
    const port = process.env.PORT || 9000
app.listen(port, () => console.log('server started'))