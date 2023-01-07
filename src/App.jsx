import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/layout';
import ClassDetail from './pages/Class/detail';
import Course from './pages/Course';
import CourseDetail from './pages/Course/detail';
import Home from './pages/Home';
import LearningPathDetail from './pages/LearningPath/detail';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import Role from './pages/Role';
import SignUpPage from './pages/SignUp';
import Trainee from './pages/Trainee';
import TraineeDetail from './pages/Trainee/detail';
import Trainer from './pages/Trainer';
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
