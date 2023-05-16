//Importing Router from express
const { Router } = require('express');
const routes = Router();

//Importing Controllers
const ProjectController = require('./Controllers/ProjectController');
const CategoryController = require('./Controllers/CategoryController');

//Projects routes
routes.post('/projects', ProjectController.store);
routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.destroy);

//Categories routes
routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.destroy);

//Exporting routes
module.exports = routes;