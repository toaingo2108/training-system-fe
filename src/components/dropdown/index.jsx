import { useCallback, useEffect } from 'react';

const Dropdown = ({
  id,
  open,
  setOpen,
  buttonRender,
  children,
  className = ''
}) => {
  const dropButton = document.querySelector(`#drop-button-${id}`);
  const dropMenu = document.querySelector(`#drop-menu-${id}`);

  const handleEventClick = useCallback(
    ({ target }) => {
      if (target !== dropButton && target !== dropMenu) {
        setOpen(false);
      }
    },
    [dropButton, dropMenu, setOpen]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('click', handleEventClick);
    }
    return () => {
      window.removeEventListener('click', handleEventClick);
    };
  }, [handleEventClick, open]);

  return (
    <div className={`relative ${className}`}>
      <div
        id={`drop-button-${id}`}
        className='relative rounded-full cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        {buttonRender()}
      </div>
      <div
        id={`drop-menu-${id}`}
        className={`absolute px-6 py-2 top-0 right-0 w-max bg-white rounded-2xl transition-all ${
          open ? 'translate-y-10 opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          boxShadow: '0 -4px 32px rgb(0 0 0 / 20%)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
