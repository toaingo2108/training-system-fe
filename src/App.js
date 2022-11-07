import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Courses from './components/courses';
import Dashboard from './components/dashboard';
import Sidebar from './components/sidebar';
import Trainers from './components/trainers';

const App = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 bg-dark min-height-100vh'>
          <Sidebar />
        </div>
        <main className='col-md-10'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/trainers' element={<Trainers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
