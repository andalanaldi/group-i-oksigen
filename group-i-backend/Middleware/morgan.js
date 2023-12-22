const morgan = require('morgan');

module.exports = function(app) {
  // Use Morgan for logging HTTP requests
  app.use(morgan('combined'));
}
