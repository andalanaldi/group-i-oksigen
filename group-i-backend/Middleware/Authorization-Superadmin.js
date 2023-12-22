const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authorizationSuperAdmin = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    // console.log("authheader",authHeader)
    if(!authHeader){
        res.status(401).json({
            error: 'Unauthorized'
        })
    } else{
        const token = authHeader.split(' ')[1];
        console.log("token",token)
        try{
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            if(decodedToken.role ==='superadmin'){
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

module.exports = authorizationSuperAdmin;