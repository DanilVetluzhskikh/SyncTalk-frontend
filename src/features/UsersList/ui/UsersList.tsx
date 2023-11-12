import { Button, Empty, Spin } from 'antd';

import cls from './style.module.scss';
import { useUsersData } from '../hooks/useUsersData';

import { UserCard } from '@/entities/UserCard';

interface UsersListProps {
  search?: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const UsersList = ({ search, page, setPage }: UsersListProps) => {
  const { users, error, isLoading, totalPages } = useUsersData(search, page);

  const handleLoadNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const renderUsers = () => {
    if (users.length) {
      return users.map(user => <UserCard key={user.id} {...user} />);
    }

    if (!isLoading) {
      return (
        <Empty
          description={<span className={cls.descEmpty}>No users found</span>}
        />
      );
    }

    return null;
  };

  if (error && !isLoading) {
    return <div className={cls.error}>{error}</div>;
  }

  const isCanLoadMore = page < totalPages && !isLoading;

  return (
    <div className={cls.users}>
      {renderUsers()}
      {isCanLoadMore ? (
        <Button type="primary" onClick={handleLoadNextPage}>
          Загрузить еще
        </Button>
      ) : (
        <div className={cls.loaderContainer}>
          {isLoading && <Spin size="large" />}
        </div>
      )}
    </div>
  );
};
