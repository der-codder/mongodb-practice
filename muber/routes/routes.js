const DriverController = require('../contorollers/drivers_controller');

module.exports = (app) => {
  app.get('/api', DriverController.greeting);

  app.post('/api/drivers', DriverController.create);
  app.put('/api/drivers/:id', DriverController.edit);
  app.delete('/api/drivers/:id', DriverController.delete);
};
