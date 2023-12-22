const {validationResult} = require('express-validator');
const prisma = require('../prisma/prismaClient')
const getPolutionbyCityId = ("/polution/:id",async(req,res)=>{
    const cityId = parseInt(req.params.id); 
    try{
      const errors = validationResult(req);
      // console.log(errors)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
    
      const checklocation  = await prisma.polution.findMany({where:{cityId:cityId},include:{location:true}})
      if(!checklocation){
        res.status(404).json({error: 'location not found'})
      }
      console.log(checklocation)
      BigInt.prototype.toJSON = function(){
        const int = Number.parseInt(this.toString());
        return int ?? this.toString();
      }
      res.status(200).json({
        message: "success",
        data: checklocation
      })
    } catch (error){
      res.status(400).json({error: "Error internal server"})
    }
  });
  module.exports = getPolutionbyCityId