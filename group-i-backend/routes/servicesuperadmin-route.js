const {Router} = require('express')
const servicesuperadminRoute = Router();
const postPolution = require('../Controller/postPolution')
const putPolutionbyId = require('../Controller/putPolutionbyId')
const deletePolution = require('../Controller/deletePolution')
const {body,param} = require('express-validator')
servicesuperadminRoute.post("/polution" ,[
    body('caseRespiratory').not().isEmpty().withMessage('caseRespiratory is required'),
    body('costverifRespiratory').not().isEmpty().withMessage('costverifRespiratory is required'),
    body('cityId').not().isEmpty().withMessage('cityId is required')
    ],postPolution) //super admin
servicesuperadminRoute.put("/polution/:id",[
    body('caseRespiratory').not().isEmpty().withMessage('caseRespiratory is required'),
    body('costverifRespiratory').not().isEmpty().withMessage('costverifRespiratory is required'),
    param('id').isInt().withMessage('id must Integer')],putPolutionbyId) // superadmin
servicesuperadminRoute.delete("/polution/:id",[param('id').isInt().withMessage('id must Integer')],deletePolution)
module.exports = servicesuperadminRoute
