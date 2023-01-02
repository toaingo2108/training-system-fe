import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courseClient } from '../../clients';
import { learningPathClient } from '../../clients/learningPath';
import MyContainer from '../../components/container';
import CourseItem from '../../components/course';

const LearningPathDetail = () => {
  // hooks
  const params = useParams();

  // constants
  const { learningPathID } = params;

  // states
  const [learningPath, setLearningPath] = useState(null);
  const [coursesOfLearningPath, setCoursesOfLearningPath] = useState([]);

  console.log(coursesOfLearningPath);

  // call api
  useEffect(() => {
    const resLearningPath = learningPathClient().getLearningPath({
      learningPathId: parseInt(learningPathID)
    });
    if (resLearningPath) {
      setLearningPath(resLearningPath);
    }
    return () => {
      setLearningPath(null);
    };
  }, [learningPathID]);

  useEffect(() => {
    const resListCourseOfLearningPath = courseClient().getCoursesOfLearningPath(
      {
        learningPathId: parseInt(learningPathID)
      }
    );
    if (resListCourseOfLearningPath) {
      setCoursesOfLearningPath(resListCourseOfLearningPath);
    }
    return () => {
      setCoursesOfLearningPath([]);
    };
  }, [learningPathID]);

  // side effect
  useEffect(() => {
    document.title = 'Chi tiết Learning path';
  }, []);
  return (
    <MyContainer>
      <div className='text-3xl font-black tracking-widest'>
        {learningPath?.name || ''}
      </div>
      <div className='my-2 max-w-3xl'>{learningPath?.description || ''}</div>
      <div className='mt-6'>
        <div className='mb-4 font-bold'>Khóa học theo lộ trình</div>
        <Grid container spacing={2}>
          {coursesOfLearningPath
            ?.sort((a, b) => a.courseOrder - b.courseOrder)
            ?.map((item) => (
              <Grid
                key={item.learningPathId + item.courseId}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <CourseItem course={item.course} />
              </Grid>
            ))}
        </Grid>
      </div>
    </MyContainer>
  );
};

export default LearningPathDetail;
