import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { useAppDispatch } from '@/app/hooks/redux';
import { userLogout } from '@/app/services/userLogout';
import { authLogout } from '@/app/store/slices/authSlice';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await dispatch(userLogout());

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(authLogout());
      navigate('/');
    }
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Выйти
    </Button>
  );
};
