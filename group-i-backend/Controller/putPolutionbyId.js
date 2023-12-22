const {body,param,validationResult} = require('express-validator')
const prisma = require('../prisma/prismaClient')
const putPolutionbyId = (
    async (req,res)=>{
    const id = parseInt(req.params.id) 
    const { caseRespiratory, costverifRespiratory} = req.body;
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const checkdata = await prisma.polution.findUnique({where:{id:id}})
      if(!checkdata){
        res.status(404).json({error: 'data not found'})
      }
      const updatedata = await prisma.polution.update({
        where:{id:id},
        data:{
          caseRespiratory:caseRespiratory,
          costverifRespiratory:costverifRespiratory
        }
      })
      // console.log(updatedata)
      BigInt.prototype.toJSON = function(){
        const int = Number.parseInt(this.toString());
        return int ?? this.toString();
      }
      res.status(200).json({
        message: "success",
        data: updatedata
      })
    }catch(error){
      res.status(400).json({
        error: "Error internal server"
      })
    }
  
  })
  module.exports = putPolutionbyId