const {Router} = require('express')
const authRoute = Router();
const register = require('../Controller/Register')
const login = require('../Controller/Login')
const loginadmin = require('../Controller/login-superadmin')
const {requestResetPassword,resetPassword} = require('../Controller/resetPassword')
const {body} = require('express-validator')
authRoute.post('/register', [
    body('organization_name').not().isEmpty().withMessage('Organization name is required'),
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
    body('pic_firstname').not().isEmpty().withMessage('First name is required'),
    body('pic_lastname').not().isEmpty().withMessage('Last name is required'),
    body('pic_role_institution').not().isEmpty().isIn(['user', 'superadmin']).withMessage('Invalid role'),
    body('password').not().isEmpty().withMessage('Password is required'),
  ],register)
authRoute.post('/login', [
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required')
  ],login)
authRoute.post('/request-reset-password', [
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
  ],requestResetPassword)
authRoute.post('/resetpassword',[
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
    body('newPassword').not().isEmpty().withMessage('New password is required'),
  ],resetPassword)
authRoute.post('/loginadmin',[
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
    body('password').not().isEmpty().withMessage('Password is required')
],loginadmin)
module.exports = authRoute