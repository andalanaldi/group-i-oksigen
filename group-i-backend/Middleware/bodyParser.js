const bodyParser = require('body-parser');

module.exports = (app) => {
  // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
