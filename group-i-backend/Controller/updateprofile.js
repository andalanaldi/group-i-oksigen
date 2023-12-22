const {validationResult} = require('express-validator')
const prisma = require('../prisma/prismaClient')
const updateProfile = (
     async (req, res) => {
      const id = parseInt(req.params.id);
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {
          organization_name,
          organization_email,
          // pic_firstname,
          // pic_lastname,
        } = req.body;
        if(!organization_email){

        }
        const updateprofile = await prisma.user.update({
          where: { id },
          data: {
            organization_name,
            organization_email,
            // pic_firstname,
            // pic_lastname,
          },
        });
  
        res.status(200).json({
          message: 'Profile updated successfully',
          data: updateprofile,
        });
      } catch (error) {
        res.status(400).json({
          error: error.message,
        });
      }
    }
  );
  module.exports = updateProfile