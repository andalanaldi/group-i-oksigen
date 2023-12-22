const express = require("express")
const postTransaction = require("../Controller/postTransaction")
const getAllTransaction = require("../Controller/getAllTransaction")
const {param,body}= require('express-validator')
const router = express.Router()
router.get("/:userId",[param('userId').not().isEmpty().isInt().withMessage('userId must Integer')], getAllTransaction);
router.post("/buy",[body('user_id').not().isEmpty().isInt().withMessage('user_id must integer and required')], postTransaction);
module.exports = router;
