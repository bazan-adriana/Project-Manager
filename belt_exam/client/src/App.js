import './App.css';
import {  Routes, Route } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import CreateProjectPage from './views/CreateProjectPage';

function App() {
  return (
    <div className="container mt-5">
      <h1>Project Manager</h1>
      
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/projects/:id" element={<DashboardPage />} />
        </Routes>
      
    </div>
  );
}

export default App;
