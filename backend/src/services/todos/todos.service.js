// Initializes the `todos` service on path `/api/v1/todos`
const createService = require('feathers-mongoose');
const createModel = require('../../models/todos.model');
const hooks = require('./todos.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/todos', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/todos');
  
  service.hooks(hooks);
};
