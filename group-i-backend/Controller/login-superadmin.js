const jwt = require('jsonwebtoken');
const {validationResult}=require('express-validator');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const prisma = require('../prisma/prismaClient')
const JWT_SECRET = process.env.JWT_SECRET;
const bcryptjs = require('bcryptjs');

const LoginSuperadmin =(
   
    asyncHandler(async (req, res, next) => {
      try {
        const { organization_email, password} = req.body;
        const user = await prisma.user.findUnique({where:{organization_email}});
        const role = user.pic_role_institution.toString();
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        if(role === "user"){
          return res.status(401).json({error: "Your not Admin. Please login again!"})
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // console.log(user.pic_role_institution)
        let isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
        res.locals.loginFailed = true;
        console.log('Login failed:', res.locals.loginFailed);
        throw new Error('Invalid organization email or password');
    }
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.organization_email,
            role: user.pic_role_institution,
          },
          JWT_SECRET,
          { expiresIn: '1h' } 
        );
  
        res.json({
          token: token, 
        });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ error: 'An error occurred while login' });
      }
    })
  );

  module.exports = LoginSuperadmin
