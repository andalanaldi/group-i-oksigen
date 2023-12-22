const Transaction = require("../model/transactions");
const prisma = require("../prisma/prismaClient");
const {validationResult} = require('express-validator')
const allTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const userId = parseInt(req.params.userId)
    const trx = new Transaction(prisma);
    const checktransactionuser = await trx.checkTransactionUser(userId)
    if(!checktransactionuser){
      res.status(200).json({
        message: "transaction not found"
      })
    }
    const listTransaction = await trx.allTransaction(userId);
    // console.log(listTransaction)
    res.status(200).json({
      message:"success",
    data:listTransaction});
  };
  
  module.exports = allTransaction;