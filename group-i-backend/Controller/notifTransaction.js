const checkTransactionRoutine = require("./getTransactionsRoutine")
const {validationResult} = require('express-validator')
const notifTransaction = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const order_id = req.body.order_id;
      await checkTransactionRoutine(order_id);
      res.json({ message: "success" });
      return;
    } catch (error) {
      res.status(400).send({ error: error });
      console.log(error)
    }
  };
  
  module.exports = notifTransaction;
  