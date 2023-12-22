const {Router} = require('express')
const serviceuserRoute = Router();
const updateProfile = require('../Controller/updateprofile')
const getallLocation = require('../Controller/getAllLocation')
const getLocationbyCityid = require('../Controller/getLocationbyCityid')
const getPolutionbyCityId = require('../Controller/getPolutionbyCityId')
const getstatusUser = require('../Controller/checkProfile')
const {body,param} = require('express-validator')
serviceuserRoute.put("/updateprofile/:id",[
    body('organization_name').not().isEmpty().withMessage('Organization name is required'),
    body('organization_email').not().isEmpty().isEmail().withMessage('Invalid email'),
    // body('pic_firstname').not().isEmpty().withMessage('First name is required'),
    // body('pic_lastname').not().isEmpty().withMessage('Last name is required'),
    param('id').not().isEmpty().isInt().withMessage('userId must Integer')
  ],updateProfile) //user
serviceuserRoute.get("/profile",getstatusUser)
serviceuserRoute.get("/location",getallLocation) //user
serviceuserRoute.get("/location/:id", [
    param('id').isInt().withMessage('City ID must be an integer'),
  ],getLocationbyCityid) //user
serviceuserRoute.get("/polution/:id",[
    param('id').isInt().withMessage('City Id must Integer')
  ],getPolutionbyCityId) //user
module.exports = serviceuserRoute