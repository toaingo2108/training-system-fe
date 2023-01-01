import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect } from 'react';
import MyContainer from '../../components/container';
import LearningPath from '../../components/learning-path';

const Home = () => {
  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);

  return (
    <MyContainer>
      <div>
        <div className='font-black text-2xl mb-4'>Learning path</div>
        <Splide
          options={{
            perPage: 4,
            // arrows: false,
            // pagination: false,
            drag: 'free',
            gap: '1rem'
          }}
          aria-labelledby='learning-path-slide'
        >
          <SplideSlide>
            <LearningPath />
          </SplideSlide>
          <SplideSlide>
            <LearningPath />
          </SplideSlide>
          <SplideSlide>
            <LearningPath />
          </SplideSlide>
          <SplideSlide>
            <LearningPath />
          </SplideSlide>
          <SplideSlide>
            <LearningPath />
          </SplideSlide>
        </Splide>
      </div>
    </MyContainer>
  );
};

export default Home;
