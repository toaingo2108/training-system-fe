import { CssBaseline } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import { LoadingProvider } from './hooks/loading';
import { ToastProvider } from './hooks/toast';
import Course from './pages/Course';
import CourseCreate from './pages/Course/create';
import CourseDetail from './pages/Course/detail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Trainee from './pages/Trainee';
import Trainer from './pages/Trainer';

const App = () => {
  return (
    <>
      <CssBaseline />
      {/* Provider */}
      <LoadingProvider>
        <ToastProvider>
          {/* Provider */}
          <Layout>
            <Routes>
              <Route path='/course' element={<Course />} />
              <Route
                path='/course/detail/:courseId'
                element={<CourseDetail />}
              />
              <Route path='/course/create' element={<CourseCreate />} />

              <Route path='/trainer' element={<Trainer />} />

              <Route path='/trainee' element={<Trainee />} />

              <Route path='/' element={<Home />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Layout>
        </ToastProvider>
      </LoadingProvider>
    </>
  );
};

export default App;
