import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DashboardPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [status, setStatus] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                setProjectList(res.data);
                setStatus(groupProjectsByStatus(res.data));
            })
            .catch(err => console.error(err));
    }, []);

    const groupProjectsByStatus = (projects) => {
        return projects.reduce((acc, project) => {
            const status = project.status;
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(project);
            return acc;
        }, {});
    };

    const handleStartProject = (projectId) => {
        axios.put(`http://localhost:8000/api/projects/${projectId}`, { status: 'In Progress' })
            .then(res => {
                const updatedProject = res.data;
                const updatedProjectList = projectList.map(project => (project._id === updatedProject._id ? updatedProject : project));
                setProjectList(updatedProjectList);
                setStatus(groupProjectsByStatus(updatedProjectList));
            })
            .catch(err => console.error(err));
    };

    const handleCompleteProject = (projectId) => {
        axios.put(`http://localhost:8000/api/projects/${projectId}`, { status: 'Completed' })
            .then(res => {
                const updatedProject = res.data;
                const updatedProjectList = projectList.map(project => (project._id === updatedProject._id ? updatedProject : project));
                setProjectList(updatedProjectList);
                setStatus(groupProjectsByStatus(updatedProjectList));
            })
            .catch(err => console.error(err));
    };


    const handleDeleteProject = (projectId) => {
        axios.delete(`http://localhost:8000/api/projects/${projectId}`)
            .then(res => {
                const updatedProjectList = projectList.filter(project => project._id !== projectId);
                setProjectList(updatedProjectList);
                setStatus(groupProjectsByStatus(updatedProjectList));
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <p><Link to='/projects/new'>Create new Project</Link></p> <br></br>
            {Object.keys(status).map(statusKey => (
                <div key={statusKey}>
                    <table className='table table-striped'>
                        <thead className='bg-secondary text-light'>
                        <tr>
                                <th>Name</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {status[statusKey].map(project => (
                                <tr key={project._id}>
                                    <td>{project.name}</td>
                                    <td>{project.dueDate}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleStartProject(project._id)}
                                            disabled={project.status === 'In Progress' || project.status === 'Completed'}
                                        >
                                            Start Project
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleCompleteProject(project._id)}
                                            disabled={project.status === 'Completed'}
                                        >
                                            Move to Completed
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteProject(project._id)}>
                                            Remove Project
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            ))}
        </div>
    );
};

export default DashboardPage;