const prisma = require('../prisma/prismaClient')
const axios = require('axios')
const {validationResult} = require('express-validator')
const postPolution = (
   async(req,res)=>{
      const { caseRespiratory, costverifRespiratory,cityId} = req.body;
      try{
        // const checkdataPolution = await prisma.polution.findUnique({where:{id:}})
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const checklocation = await prisma.location.findUnique({where:{id:cityId}})
        if(!checklocation){
          res.status(404).json({error: "Location not found"})
        }
        const {cityLat,cityLon}=checklocation
        // console.log(cityLat,cityLon)
        const apiUrl = `http://api.airvisual.com/v2/nearest_city?lat=${cityLat}&lon=${cityLon}&key=${process.env.API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        // console.log('Api respond:',data)
        const ts = new Date(data.data.current.pollution.ts);
        const aqius = data.data.current.pollution.aqius;
        const polution = aqius.toString();
        const datetime = new Date()
        if(datetime === ts){
          return res.status(400).json({message: "sudah submit"})
        }
        const sendData = await prisma.polution.create({
          data: {
            cityId: cityId,
            polution: polution,
            caseRespiratory: caseRespiratory,
            costverifRespiratory: costverifRespiratory,
            time: ts
          }
        })
      BigInt.prototype.toJSON = function(){
        const int = Number.parseInt(this.toString());
        return int ?? this.toString();
      }
      res.status(200).json({
        message: 'success',
        data: sendData
      })
      }
      catch(error){
        console.log("Error:",error)
        res.status(400).json({error: 'Internal Server Error'})
      }
    });
    module.exports = postPolution