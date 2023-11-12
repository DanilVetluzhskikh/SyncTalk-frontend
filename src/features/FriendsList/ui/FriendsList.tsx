import { useEffect } from 'react';

import cls from './style.module.scss';
import { getFriendsService } from '../model/services/getFriendsService';

import { useAppDispatch } from '@/app/hooks/redux';

export const FriendsList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsService());
  }, []);

  return (
    <div className={cls.list}>
      <div></div>
    </div>
  );
};
