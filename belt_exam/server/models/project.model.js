const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        minlength: [3, 'Project name must be at least 3 characters long']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    }
}, { timestamps: true });


module.exports.Project = mongoose.model('Project', ProjectSchema);
