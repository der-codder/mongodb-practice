const DriverController = require('../contorollers/drivers_controller');

module.exports = (app) => {
  app.get('/api', DriverController.greeting);
};
