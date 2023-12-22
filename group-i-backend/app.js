const express = require('express');
const CORS = require('cors')
const transactionRoutes = require("./routes/transaction");
const cron = require('node-cron');
const functions = require('firebase-functions')
const onRequest = require('firebase-functions/v2/https')
const checkTransactionRoutine = require("./Controller/getTransactionsRoutine")
const {ENABLE_CRON,INTERVAL_INQUIRY} = require("./config/config");
const authRouter = require('./routes/authroute')
const serviceuserRouter = require('./routes/serviceuser-route')
const app = express();
const authorizationSuperAdmin = require('./Middleware/Authorization-Superadmin')
const authorizationUser =  require('./Middleware/Authorization-User')
const servicesuperadminRouter = require('./routes/servicesuperadmin-route');
const authenticationMiddleware = require('./Middleware/Authentication-Middleware');
const notifTransaction = require("./Controller/notifTransaction")
const {body}= require('express-validator')
require('dotenv').config();

app.use(express.json());
app.use(CORS())

app.post('/transaction/notifications',[body('order_id').not().isEmpty().withMessage('Order Id is required')],notifTransaction)
app.use('/auth',authRouter)
app.use(authenticationMiddleware);
app.use('/',authorizationUser,serviceuserRouter)
app.use('/superadmin',authorizationSuperAdmin,servicesuperadminRouter)
app.use("/transaction",authorizationUser,transactionRoutes);
if(ENABLE_CRON == "true"){
  cron.schedule(INTERVAL_INQUIRY, () => {
    checkTransactionRoutine();
  });
}
// console.log(INTERVAL_INQUIRY,ENABLE_CRON)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// exports.oksigen = functions.https.onRequest(app)
module.exports = app;
