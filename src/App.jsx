import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/layout';
import ClassDetail from './pages/class/detail';
import Course from './pages/course';
import CourseDetail from './pages/course/detail';
import Home from './pages/home';
import LearningPathDetail from './pages/learning-path/detail';
import LoginPage from './pages/login';
import NotFound from './pages/not-found';
import Role from './pages/role';
import SignUpPage from './pages/sign-up';
import Trainee from './pages/trainee';
import TraineeDetail from './pages/trainee/detail';
import Trainer from './pages/trainer';
import { fetchUser } from './utils';

const App = (props) => {
  const user = fetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='main'>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />

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
