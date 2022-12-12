import React, { useLayoutEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/layout';
import { useAuth } from './hooks/auth';
import Course from './pages/Course';
import CourseCreate from './pages/Course/create';
import CourseDetail from './pages/Course/detail';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import SignUpPage from './pages/SignUp';
import Trainee from './pages/Trainee';
import Trainer from './pages/Trainer';

const App = (props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/course' element={<Course />} />
          <Route path='/course/detail/:courseId' element={<CourseDetail />} />
          <Route path='/course/create' element={<CourseCreate />} />

          <Route path='/trainer' element={<Trainer />} />

          <Route path='/trainee' element={<Trainee />} />

          <Route path='/*' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
