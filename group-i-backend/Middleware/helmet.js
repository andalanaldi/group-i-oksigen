const helmet = require('helmet');

module.exports = (app) => {
  // Use Helmet to set various security headers
  app.use(helmet());
}
