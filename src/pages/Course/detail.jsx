import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();

  useEffect(() => {
    document.title = `Chi tiết khóa học - ${courseId}`;
  }, [courseId]);
  return (
    <>
      <div>CourseDetail {courseId}</div>;
    </>
  );
};

export default CourseDetail;
