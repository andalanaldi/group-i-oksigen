const prisma = require('../prisma/prismaClient')
const jwt = require('jsonwebtoken')
const checkProfile = ( async (req, res) => { 
    try{
        const userId = req.userId;

          const checkinglimitdate = await prisma.$queryRaw`SELECT *, CASE WHEN "premium_limit_date" > NOW() THEN true ELSE false END as "isPremium" FROM "user" WHERE "id" = ${userId} limit 1`;
          const email = checkinglimitdate[0].organization_email
          const isPremium = checkinglimitdate[0].isPremium
          const premium_limit_date = checkinglimitdate[0].premium_limit_date
          const organization_name = checkinglimitdate[0].organization_name
          res.status(200).json({data:{organization_name,email,premium_limit_date,isPremium}})

}catch(error){
          res.status(400).json({message: "Error Internal Server!"})
        }
    }
    )
module.exports = checkProfile