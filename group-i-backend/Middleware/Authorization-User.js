const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authorizationUser = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({
            error: 'Unauthorized'
        })
    } else{
        const token = authHeader.split(' ')[1];
        try{
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            if(decodedToken.role === 'user'|| decodedToken.role==='superadmin'){
                next()
            }
             else{
                res.status(401).json({error: "Unauthorize"})
            }
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = authorizationUser;