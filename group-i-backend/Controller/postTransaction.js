const Transaction = require("../model/transactions");
const prisma = require("../prisma/prismaClient");
const buySnap = require("./snap/create")
const {validationResult} = require('express-validator')
const postTransaction = async (req,res)=>{
    const userId = req.body.user_id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const checkuser = await prisma.user.findUnique({where:{id:userId}})
        if(!checkuser){
            return res.status(404).json({message:"user not found"})
        }
        const total = 69000;
        const randomCode = Math.floor(new Date().getTime() / 1000)
        const billCode = `ORDER-ID-${randomCode}`
        const response = await buySnap({
            transaction_details: {
                order_id: billCode,
                gross_amount: total,
            },
            credit_card: { secure: true}
        });
        const snapUrl = response.redirect_url;
        const token = response.token;
        // console.log(checkuser)
        const newTransaction = new Transaction(prisma);
        const createTrx = await newTransaction.create({
          billCode,
          userId,
          total,
          snapUrl,
          token,
        });
    
        res.json(createTrx);
        return;
    } catch(error){
        console.log("error when post transaction: ", error);
        res.status(400).send({ error: error });
        return;
    }
}
module.exports = postTransaction;