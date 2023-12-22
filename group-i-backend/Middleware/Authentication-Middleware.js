const jwt = require('jsonwebtoken')
const authenticationMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    // console.log(authHeader,'authHeader');
    if(!authHeader){
        res.status(401).json({
            error: 'Unauthorized'
        })
    } else{
        try{
            const token = authHeader.split(' ')[1];
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
            req.userId = decodedToken.userId
            next()
        }catch(error){
            res.status(400).json({
                error: error.message
            })
        }
    }
}
module.exports = authenticationMiddleware;