import { Empty, Spin } from 'antd';
import { useEffect } from 'react';

import {
  getUsersError,
  getUsersInfo,
  getUsersIsLoading,
} from '../model/slice/usersSlice';
import cls from './style.module.scss';
import { getUsersService } from '../model/services/getUsersService';

import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { UserCard } from '@/entities/UserCard';

interface UsersListProps {
  search?: string;
}

export const UsersList = (props: UsersListProps) => {
  const { search } = props;

  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsersInfo);
  const error = useAppSelector(getUsersError);
  const isLoading = useAppSelector(getUsersIsLoading);

  useEffect(() => {
    dispatch(getUsersService({ search }));
  }, [dispatch, search]);

  if (error) return <div className={cls.error}>{error}</div>;
  if (isLoading) return <Spin size="large" className={cls.loader} />;

  return (
    <div className={cls.users}>
      {users.length ? (
        users.map(user => <UserCard key={user.id} user={user} />)
      ) : (
        <Empty
          description={<span className={cls.descEmpty}>No users found</span>}
        />
      )}
    </div>
  );
};
