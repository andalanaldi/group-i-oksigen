const {body,validationResult}=require('express-validator');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/prismaClient')
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const requestPasswordReset = async (organization_email) => {
    const user = await prisma.user.findUnique({ where: { organization_email } });
    if (!user) {
      throw new Error('User not found');
    }
  
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not set');
    }
  
    const token = jwt.sign({ id: user.id, email: user.organization_email }, secret, { expiresIn: '1h' });
  
    return token;
  };
  
const requestResetPassword = (
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const token = await requestPasswordReset(req.body.organization_email);
        const resetToken = jwt.sign(
          {
            email: req.body.organization_email,
            token: token,
          },
          process.env.RESET_PASSWORD_SECRET, 
          { expiresIn: '1h' } 
        );
  
        res.json({ message: 'Password reset token sent', resetToken });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );
  
const resetPassword = (
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { organization_email, newPassword } = req.body;
  
        const token = req.headers.authorization.split(' ')[1]; 
        console.log(token)
        if (!token) {
          return res.status(400).json({ error: 'No token provided, please provide a token' });
        }else{
          const user = await prisma.user.findUnique({ where: { organization_email } });
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          const hashedPassword = await bcryptjs.hash(newPassword, 10);
    
          await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
          });
    
          res.json({ message: 'Password has been reset successfully. You need to log in again' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );
  module.exports = {
    requestResetPassword,
    resetPassword
  }