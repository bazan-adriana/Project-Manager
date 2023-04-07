const { Project } = require('../models/project.model');

// get all projects
exports.allProjects = (req, res) => {
    Project.find()
        .then(projectList => res.json(projectList))
        .catch(err => res.status(400).json(err));
};

// get one project
exports.oneProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(oneProject => res.json(oneProject))
        .catch(err => res.status(400).json(err));
};

// create a project
exports.addProject = (req, res) => {
    Project.create(req.body)
        .then(createdProject => res.json(createdProject))
        .catch(err => res.status(400).json(err));
};

// update a project
exports.updateProject = (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProject => res.json(updatedProject))
        .catch(err => res.status(400).json(err));
};

// delete a project
exports.deleteProject = (req, res) => {
    Project.deleteOne({_id: req.params.id})
        .then(status => res.json(status))
        .catch(err => res.status(400).json(err));
};
