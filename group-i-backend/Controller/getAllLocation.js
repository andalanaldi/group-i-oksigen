const prisma = require('../prisma/prismaClient')
const getallLocation = ('/location', async (req,res)=>{
    try{
      const getallLocation = await prisma.location.findMany()
      res.status(200).json({
        message:"success",
        data: getallLocation
      })
    } catch(error){
      res.status(400).json({error: "Error internal server erorr"})
    }
  })
  module.exports = getallLocation