const ProjectController = require('../controllers/project.controller');


module.exports = function (app) {
    app.get('/api/projects', ProjectController.allProjects);
    app.get('/api/projects/:id', ProjectController.oneProject);
    app.post('/api/projects', ProjectController.addProject);
    app.put('/api/projects/:id', ProjectController.updateProject);
    app.delete('/api/projects/:id', ProjectController.deleteProject);
};