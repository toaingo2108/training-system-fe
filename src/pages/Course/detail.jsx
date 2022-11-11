import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  return <div>CourseDetail {courseId}</div>;
};

export default CourseDetail;
