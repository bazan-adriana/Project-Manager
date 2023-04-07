import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const CreateProjectPage = (props) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/projects", {
      name,
      dueDate
    })
      .then((res) => {
        const createdProject = res.data;
        navigate('/');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const errorResponse = err.response.data.errors;
          const errorArr = Object.keys(errorResponse).map(
            (key) => errorResponse[key].message
          );
          setErrors(errorArr);
        }
      });
  };

  return (
    <div className='card mt-5'>
      <p><Link to='/'>Back to Dashboard</Link></p> <br></br>
      <form className='form' onSubmit={handleSubmit}>
        {errors.map((err, index) => (
          <p className='text-danger' key={index}>{err}</p>
        ))}
        <div>
          <label>Name: </label>
          <input type="text" name='name' value={name} className='form-control'
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Due Date: </label>
          <input type="date" name='dueDate' value={dueDate} className='form-control'
            onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <p> <br></br>
          <button type="submit" className='btn btn-primary'>Create Project</button>
        </p>
        <span>
          <Link to='/' className='btn btn-secondary'>Cancel</Link>
        </span>
      </form>
    </div>
  );
}

export default CreateProjectPage;
