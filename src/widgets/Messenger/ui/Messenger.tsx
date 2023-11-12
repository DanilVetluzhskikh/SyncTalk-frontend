import cls from './style.module.scss';

import { FriendsList } from '@/features/FriendsList';

export const Messenger = () => {
  return (
    <div className={cls.messenger}>
      <FriendsList />
    </div>
  );
};
