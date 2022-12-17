import { Search } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { courseClient } from '../../clients/course';
const SearchHeader = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearch = (event) => {
    const value = event.target.value || '';
    console.log(value);
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
    setSearchValue(value);
  };

  useEffect(() => {
    const resCourse = courseClient().getAllCourses();
    setCourses(resCourse);
  }, []);

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
            placeholder='Tìm kiếm theo khóa học...'
            onChange={handleChangeSearch}
            onBlur={() => setOpen(false)}
            className='focus:outline-none focus:ring-1 focus:ring-black border rounded-3xl pl-10 pr-4 py-1 transition-all text-sm w-full'
          />
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
            {filterCourses.length > 0
              ? 'Kết quả cho'
              : 'Không có kết quả cho'}{' '}
            '{searchValue}'
          </div>
          {filterCourses.length > 0 && (
            <>
              <div className='pt-4 uppercase text-sm'>Khóa học</div>
              <hr />
              {filterCourses?.map((course) => (
                <div key={course?.id} className='flex items-center py-1'>
                  <img
                    className='w-9 h-9 rounded-full'
                    src={course?.imgLink}
                    alt={course?.name}
                  />
                  <div className='ml-3 font-light text-sm'>
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
