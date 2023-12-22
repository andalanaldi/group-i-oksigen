const prisma = require('../prisma/prismaClient')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const register = (
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const {
          organization_name,
          organization_email,
          pic_firstname,
          pic_lastname,
          pic_role_institution,
          password,
          premium_limit_date,
        } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { organization_email } });
        if (existingUser) {
          return res.status(400).json({ error: 'Organization email already in use' });
        }
  
        const hashedPassword = await bcryptjs.hash(password, 10);
  
        const user = await prisma.user.create({
          data: {
            organization_name,
            organization_email,
            pic_firstname,
            pic_lastname,
            pic_role_institution,
            password: hashedPassword,
            premium_limit_date: premium_limit_date || null,
          },
        });
  
        res.status(200).json({ message: 'Organization registered successfully',
                    data: user });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ error: 'An error occurred while registering the organization' });
      }
    }
  );

  module.exports = register