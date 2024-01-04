const mongoose = require('mongoose')

const connectionstring = process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('Mongodb atlas connected with zezone-server'); 
}).catch((err)=>{
    console.log(`Mongodb atlas connection failed due to ${err}`); 
})