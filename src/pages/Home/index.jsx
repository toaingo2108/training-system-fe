import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import { learningPathClient } from '../../clients/learningPath';
import MyContainer from '../../components/container';
import LearningPath from '../../components/learning-path';
import { learningPath } from '../../data/learningPath';

const Home = () => {
  const [listLearningPath, setListLearningPath] = useState([]);

  console.log(listLearningPath, 'listLearningPath');

  useEffect(() => {
    const resLearningPath = learningPathClient().getLearningPathWithRole();
    setListLearningPath(resLearningPath);
  }, []);

  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);

  return (
    <MyContainer title='Lộ trình'>
      <div>
        <div className='font-black text-2xl mb-4 tracking-wider'>Lộ trình học cho</div>
        <Splide
          options={{
            perPage: 4,
            // arrows: false,
            breakpoints: {
              1024: {
                perPage: 3
              },
              720: {
                perPage: 2
              },
              640: {
                perPage: 1
              }
            },
            pagination: false,
            drag: 'free',
            gap: '1rem'
          }}
          aria-labelledby='learning-path-slide'
        >
          <SplideSlide>
            <LearningPath learningPath={learningPath[0]} />
          </SplideSlide>
          <SplideSlide>
            <LearningPath learningPath={learningPath[0]} />
          </SplideSlide>
          <SplideSlide>
            <LearningPath learningPath={learningPath[0]} />
          </SplideSlide>
          <SplideSlide>
            <LearningPath learningPath={learningPath[0]} />
          </SplideSlide>
        </Splide>
      </div>
    </MyContainer>
  );
};

export default Home;
