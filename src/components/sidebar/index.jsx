import { useLocation, useNavigate } from 'react-router-dom';
import { menuSidebar } from './menuSidebar';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(
    menuSidebar.findIndex((item) => location.pathname === item.link)
  );

  useEffect(() => {
    setActive(menuSidebar.findIndex((item) => location.pathname === item.link));
  }, [location.pathname]);

  if(location.pathname === '/login' || location.pathname ==='/sign-up') {
    return;
  }

  return (
    <div className='top-20 sticky'>
      <div className='w-full'>
        <div className='px-3'>
          {menuSidebar.map((item, index) => {
            return (
              <div
                className={`p-3 flex flex-col justify-center
              items-center hover:bg-gray-200 
              mt-1 rounded-2xl cursor-pointer 
              duration-200 ${
                active === index && 'bg-gray-300 hover:bg-gray-300'
              }`}
                key={item.key}
                onClick={() => {
                  navigate(item.link);
                  setActive(index);
                }}
              >
                {item.icon}
                <div className='text-xs whitespace-nowrap font-semibold tracking-wider'>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
