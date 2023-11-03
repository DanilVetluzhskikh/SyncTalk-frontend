import { useAppSelector } from '@/app/hooks/redux';
import { selectUserInfo } from '@/app/store/slices/userSlice';

const PrivateMain = () => {
  const { user, profile } = useAppSelector(selectUserInfo);

  return (
    <div>
      {user.email} - {profile.status}
    </div>
  );
};

export default PrivateMain;
