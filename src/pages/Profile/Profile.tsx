import cls from './style.module.scss';

import { AddProfileStory } from '@/features/AddProfileStory';
import { UserProfile } from '@/entities/UserProfile';

const Profile = () => {
  return (
    <div className={cls.profile}>
      <UserProfile />
      <AddProfileStory />
    </div>
  );
};

export default Profile;
