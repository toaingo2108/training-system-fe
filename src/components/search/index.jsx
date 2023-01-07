import { Close, Search } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseClient } from '../../clients/course';
import { learningPathClient } from '../../clients/learningPath';
import { textAbstract } from '../../utils';
const SearchHeader = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  // state
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [learningPaths, setLearningPaths] = useState([]);
  const [filterLearningPaths, setFilterLearningPaths] = useState([]);

  // method
  const handleChangeSearch = (event) => {
    const value = event.target.value || '';
    setSearchValue(value);
    if (value === '') {
      setOpen(false);
      return;
    }
    setOpen(true);
    setFilterCourses(
      courses?.filter((course) =>
        course.name?.toUpperCase()?.includes(value?.toUpperCase())
      )
    );
    setFilterLearningPaths(
      learningPaths?.filter((learningPath) =>
        learningPath.name?.toUpperCase()?.includes(value?.toUpperCase())
      )
    );
  };

  const handleRedirect = (path, id) => {
    setSearchValue('');
    setOpen(false);
    setFilterCourses([]);
    setFilterLearningPaths([]);
    navigate(`/${path}/${id}`);
  };

  // side effect
  useEffect(() => {
    const fetchData = async () => {
      const resCourses = await courseClient().getAllCourses();
      if (resCourses.success) {
        setCourses(resCourses.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resLearningPaths = await learningPathClient().getAllLearningPath();
      if (resLearningPaths.success) {
        setLearningPaths(resLearningPaths.data);
      }
    };
    fetchData();
  }, []);

  // UI
  if (location.pathname === '/login' || location.pathname === '/sign-up') {
    return;
  }

  return (
    <div className='relative m-auto max-w-md'>
      <div
        id='drop-button-search'
        className='relative rounded-full cursor-pointer'
      >
        <div className='relative'>
          <div className='absolute  inset-y-0 left-0 flex items-center pl-3 text-gray-300 hover:text-gray-600 transition-all'>
            <Search fontSize='small' />
          </div>
          <input
            type='text'
            placeholder='Tìm kiếm theo khóa học, learning path...'
            value={searchValue}
            onChange={handleChangeSearch}
            onFocus={() => {
              if (searchValue !== '') setOpen(true);
            }}
            className='focus:outline-none focus:ring-1 focus:ring-black border rounded-3xl px-10 py-1 transition-all text-sm w-full'
          />
          {searchValue !== '' && (
            <div
              className='absolute  inset-y-0 right-2 flex items-center pl-3 text-gray-300 hover:text-gray-600 transition-all'
              onClick={() => handleChangeSearch({ target: { value: '' } })}
            >
              <Close fontSize='small' />
            </div>
          )}
        </div>
      </div>
      <div
        id='drop-menu-search'
        className={`absolute px-6 py-2 top-0 left-0 right-0 bg-white rounded-xl transition-all overflow-auto ${
          open ? 'translate-y-10 opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          boxShadow: '0 -4px 32px rgb(0 0 0 / 20%)',
          maxHeight: 'calc(90vh - 66px)',
          minHeight: '50px'
        }}
      >
        <div>
          <div className='text-sm text-gray-500 spcaing tracking-wider pt-2 flex items-center'>
            <Search sx={{ fontSize: 18 }} className='text-gray-700 mr-1' />
            {searchValue !== '' &&
              (filterCourses.length > 0 || filterLearningPaths.length > 0
                ? 'Kết quả cho '
                : 'Không có kết quả cho ')}
            '{searchValue}'
          </div>
          {filterLearningPaths.length > 0 && (
            <>
              <div className='pt-4 uppercase text-sm'>Learning Path</div>
              <hr />
              {filterLearningPaths?.map((learningPath, index) => (
                <div
                  key={learningPath.name + learningPath.id + index}
                  onClick={(e) => {
                    handleRedirect('learning-path/detail', learningPath?.id);
                  }}
                  className='flex items-center py-2 cursor-pointer hover:border-r-4 hover:bg-gradient-to-r hover:from-white hover:to-gray-100'
                >
                  {/* <img
                    className='w-9 h-9 rounded-full object-cover'
                    src={course?.imgLink}
                    alt={course?.name}
                  /> */}
                  <div className='ml-3 font-light text-sm whitespace-nowrap text-ellipsis overflow-hidden'>
                    {learningPath?.name || ''}
                    <i className='text-xs ml-2'>
                      {textAbstract(learningPath?.description || '', 40)}
                    </i>
                  </div>
                </div>
              ))}
            </>
          )}
          {filterCourses.length > 0 && (
            <>
              <div className='pt-4 uppercase text-sm'>Khóa học</div>
              <hr />
              {filterCourses?.map((course, index) => (
                <div
                  key={course.name + course.id + index}
                  onClick={(e) => {
                    handleRedirect('course/detail', course?.id);
                  }}
                  className='flex items-center py-1 cursor-pointer hover:border-r-4 hover:bg-gradient-to-r hover:from-white hover:to-gray-100'
                >
                  <img
                    className='w-9 h-9 rounded-full object-cover'
                    src={course?.imgLink}
                    alt={course?.name}
                  />
                  <div className='ml-3 font-light text-sm whitespace-nowrap text-ellipsis overflow-hidden'>
                    {course?.name || ''}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
