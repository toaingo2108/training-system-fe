import { Link, useNavigate } from 'react-router-dom';

const CourseItem = ({ course }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${course.imgLink})`,
          backgroundRepeat: 'no-repeat',
          paddingTop: '56.25%',
          objectFit: 'cover',
          backgroundSize: 'cover',
          backgroundPosition: '50%'
        }}
        className='w-full rounded-xl relative'
      >
        <div
          className='card-course absolute inset-0 flex justify-center items-center rounded-xl hover:bg-black/40 cursor-pointer opacity-0 hover:opacity-100'
          onClick={() => navigate(`/course/detail/${course?.id}`)}
        >
          <button className='card-course-button absolute bg-white text-sm tracking-wide px-4 py-2 rounded-2xl'>
            Xem khóa học
          </button>
        </div>
      </div>
      <div className='text-sm font-medium tracking-wide mt-2 ml-1'>
        <Link to={`/course/detail/${course.id}`}>{course.name}</Link>
      </div>
    </>
  );
};

export default CourseItem;
