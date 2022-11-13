import React from 'react';
import { useEffect } from 'react';

const Course = () => {
  useEffect(() => {
    document.title = 'Danh sách khóa học';
  }, []);

  return <div>Course</div>;
};

export default Course;
