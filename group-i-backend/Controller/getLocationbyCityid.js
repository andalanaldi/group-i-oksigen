const {validationResult} = require('express-validator')
const prisma = require('../prisma/prismaClient')
const getLocationbyCityid = (
    async (req, res) => {
      try {
        
        const cityId = parseInt(req.params.id);
        const checkCity = await prisma.location.findUnique({ where: { id: cityId } });
        
        if (!checkCity) {
          return res.status(404).json({ error: 'City not found' });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { cityName, cityLat, cityLon } = checkCity;
        res.status(200).json({
          message: 'Success',
          data: {
            cityName,
            cityLat,
            cityLon,
          },
        });
      } catch (error) {
        res.status(400).json({
          error: "Error internal server!",
        });
      }
    }
  );

module.exports = getLocationbyCityid