import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Course from './pages/Course';
import CourseDetail from './pages/Course/detail';
import Home from './pages/Home';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/course' element={<Course />} />
        <Route path='/course/detail/:courseId' element={<CourseDetail />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
