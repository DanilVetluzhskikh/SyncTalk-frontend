import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import cls from './style.module.scss';

import { SpeechSearchList } from '@/features/SpeechSearchList';
import { UsersList } from '@/features/UsersList';
import { useAppSelector } from '@/app/hooks/redux';
import { getUsersIsLoading } from '@/features/UsersList';

export const SpeechUserList = () => {
  const location = useLocation();
  const defaultSearch =
    new URLSearchParams(location.search).get('search') || '';
  const defaultPage = new URLSearchParams(location.search).get('page') || 1;

  const isLoading = useAppSelector(getUsersIsLoading);

  const [search, setSearch] = useState(defaultSearch);
  const [page, setPage] = useState<number>(Number(defaultPage));
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    navigate(`?search=${encodeURIComponent(search)}&page=${page}`, {
      replace: true,
    });
  }, [page, search]);

  return (
    <div className={cls.container}>
      <SpeechSearchList
        onSearch={handleSearch}
        defaultValue={search}
        isLoading={isLoading}
      >
        <UsersList search={search} page={page} setPage={setPage} />
      </SpeechSearchList>
    </div>
  );
};
