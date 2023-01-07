import React, { useEffect, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import ClassDetail from './pages/class/detail';
import Course from './pages/course';
import CourseDetail from './pages/course/detail';
import Department from './pages/department';
import Home from './pages/home';
import LearningPathDetail from './pages/learning-path/detail';
import LoginPage from './pages/login';
import NotFound from './pages/not-found';
import Role from './pages/role';
import Trainee from './pages/trainee';
import TraineeDetail from './pages/trainee/detail';
import Trainer from './pages/trainer';
import { fetchUser } from './utils';

const App = (props) => {
  const user = fetchUser();

  if (!user?.accessToken || user?.accessToken === '') {
    return <LoginPage />;
  }

  return (
    <div id='main'>
      <Layout>
        <Routes>
          <Route path='/course' element={<Course />} />
          <Route path='/course/detail/:courseId' element={<CourseDetail />} />

          <Route path='/class/detail/:classId' element={<ClassDetail />} />

          <Route path='/trainer' element={<Trainer />} />

          <Route path='/trainee' element={<Trainee />} />
          <Route
            path='/trainee/detail/:traineeId'
            element={<TraineeDetail />}
          />

          <Route path='/role' element={<Role />} />

          <Route path='/department' element={<Department />} />

          <Route
            path='/learning-path/detail/:learningPathId'
            element={<LearningPathDetail />}
          />

          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
