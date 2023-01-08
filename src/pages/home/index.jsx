import { LibraryAddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningPathClient } from '../../clients/learningPath';
import { roleClient } from '../../clients/role';
import MyContainer from '../../components/container';
import CustomNoRows from '../../components/customs/no-rows';
import LearningPath from '../../components/learning-path';
import LearningPathDialogCreate from '../../components/learning-path/dialog-create';
import MySpeedDial from '../../components/speed-dial';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { groupBy } from '../../utils';

const Home = () => {
  // hooks
  const loading = useLoading();
  const toast = useToast();
  const navigate = useNavigate();

  // states
  const [listLearningPath, setListLearningPath] = useState([]);
  const [showAddLearningPath, setShowAddLearningPath] = useState(false);

  const actions = [
    {
      icon: <LibraryAddOutlined />,
      name: 'Tạo lộ trình',
      onClick: () => {
        setShowAddLearningPath(true);
      }
    }
  ];

  // methods
  const handleCloseAddLearningPathPopup = () => {
    setShowAddLearningPath(false);
  };

  const handleCreateLearningPath = async (newLearningPath) => {
    loading.show('Đang thêm lộ trình mới!');
    const resLearningPath = await learningPathClient().createLearningPath(
      newLearningPath
    );
    loading.hide();
    if (resLearningPath.success) {
      handleCloseAddLearningPathPopup();
      navigate(0);
      toast.success('Thêm lộ trình mới thành công!');
    } else {
      toast.error('Thêm lộ trình mới thất bại!');
    }
  };

  // call api
  useEffect(() => {
    const fetchData = async () => {
      loading.show();
      const resLearningPath = await learningPathClient().getAllLearningPath();
      const resRoles = await roleClient().getListRoles();
      const roles = resRoles.data;
      loading.hide();
      if (resLearningPath.success) {
        const listLearningPath = groupBy(
          resLearningPath.data.map((item) => {
            return {
              ...item,
              roleName: roles.find((r) => r.id === item.forRoleId)?.name || ''
            };
          }),
          'forRoleId'
        );
        setListLearningPath(listLearningPath);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = 'Trang chủ';
  }, []);

  return (
    <MyContainer title='Lộ trình'>
      {listLearningPath?.length > 0 ? (
        listLearningPath?.map((learningPath, index) => (
          <div key={learningPath[0].forRoleId + index} className='pb-10'>
            <div className='font-black text-2xl mb-4 tracking-wider'>
              {learningPath[0].roleName}
            </div>
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
              {learningPath.map((item) => {
                return (
                  <SplideSlide key={item.id}>
                    <LearningPath learningPath={item} />
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        ))
      ) : (
        <CustomNoRows
          title={
            <div className='flex flex-col items-center'>
              <div>Không tìm thấy lộ trình!</div>
              <Button onClick={() => setShowAddLearningPath(true)}>
                Thêm lộ trình
              </Button>
            </div>
          }
        />
      )}
      <div style={{ position: 'fixed' }}>
        <MySpeedDial actions={actions} />
      </div>
      <LearningPathDialogCreate
        open={showAddLearningPath}
        onClose={handleCloseAddLearningPathPopup}
        onSubmit={handleCreateLearningPath}
      />
    </MyContainer>
  );
};

export default Home;
