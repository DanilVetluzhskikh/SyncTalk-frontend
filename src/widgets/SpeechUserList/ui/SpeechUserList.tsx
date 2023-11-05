import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import cls from './style.module.scss';

import { SpeechSearchList } from '@/features/SpeechSearchList';
import { UsersList } from '@/features/UsersList';

export const SpeechUserList = () => {
  const location = useLocation();
  const defaultSearch =
    new URLSearchParams(location.search).get('search') || '';

  const [search, setSearch] = useState(defaultSearch);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate(`?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className={cls.container}>
      <SpeechSearchList onSearch={handleSearch} defaultValue={search}>
        <UsersList search={search} />
      </SpeechSearchList>
    </div>
  );
};
