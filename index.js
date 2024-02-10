require('dotenv').config()

//import express
const express = require('express')

//cors
const cors = require('cors')

//router
const router = require('./Routes/router')

//mongoose
require('./DB/connections')

// server
const zezoneserver = express()

zezoneserver.use((cors()))

zezoneserver.use(express.json())

zezoneserver.use(router)

zezoneserver.use('/UserPosts',express.static('./UserPosts'))

const PORT = 4000 || process.env.PORT

//run server app
zezoneserver.listen(PORT,()=>{
    console.log(`ZEZONE SERVER running at PORT : ${PORT}`);
})

//http get request resolving to http://localhost:4000/ 
zezoneserver.get('/',(req,res)=>{
    res.send(`<h1 style="color:green;">ZEZONE server started and waiting from client server !! </h1>`)
})
