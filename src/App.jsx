import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/layout';
import Course from './pages/Course';
import CourseCreate from './pages/Course/create';
import CourseDetail from './pages/Course/detail';
import Home from './pages/Home';
import LearningPathDetail from './pages/learningPath/detail';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import Role from './pages/Role';
import SignUpPage from './pages/SignUp';
import Trainee from './pages/Trainee';
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

          <Route
            path='/learning-path/detail/:learningPathID'
            element={<LearningPathDetail />}
          />

          <Route path='/course' element={<Course />} />
          <Route path='/course/detail/:courseId' element={<CourseDetail />} />
          <Route path='/course/create' element={<CourseCreate />} />

          <Route path='/trainer' element={<Trainer />} />

          <Route path='/trainee' element={<Trainee />} />

          <Route path='/role' element={<Role />} />

          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
