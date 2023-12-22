const Transaction = require("../model/transactions")
const prisma = require("../prisma/prismaClient")
const getStatusSnap = require("./snap/getStatus")
const checkStatusByOrderID = async (order_id) => {
    try {
      const response = await getStatusSnap(order_id);
  
      const statusCode = parseInt(response.status_code, 10);
  
      if (statusCode == 404) {
        return [false, "Payment channel belum dipilih"];
      }
  
      //if success
      return [true, response.transaction_status];
    } catch (error) {
      return [false, error.message];
    }
  };

  const checkTransactionRoutine = async (order_id) => {
    const newTransaction = new Transaction(prisma);
    try {
      let listTransaction;
      if (typeof order_id !== "undefined") {
        listTransaction = await newTransaction.checkTransactionPerDay(order_id);
      } else {
        listTransaction = await newTransaction.checkTransactionPerDay();
      }
  
      for (const element of listTransaction) {
        const [isProcess, status] = await checkStatusByOrderID(element.billCode);
        if (isProcess) {
          if (status === "settlement") {
             const get30dayssubscribe = new Date(); 
                   get30dayssubscribe.setDate(get30dayssubscribe.getDate() + 30);
                try {
                    const userId = element.userId
                    const updatedUser = await prisma.user.update({
                    where: { id : userId },
                    data: {
                    premium_limit_date: get30dayssubscribe,},
                });
                // console.log(updatedUser.premium_limit_date)
                    }
                catch (error) {
                console.error(error);
                }
            }
          await newTransaction.updateStatusTransaction(element.id, status);
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  
module.exports = checkTransactionRoutine;