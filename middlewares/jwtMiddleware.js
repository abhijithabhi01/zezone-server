const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('Running jwt middleware');

    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,"loginkey123")
        console.log(jwtResponse);

        req.payload = jwtResponse.userId
        next()
    }
    catch(err){
        res.status(401).json('Authentication Failed,Try after some time')
    }

}

module.exports = jwtMiddleware
