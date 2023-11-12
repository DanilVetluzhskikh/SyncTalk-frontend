import { useEffect } from 'react';

import {
  getUsersError,
  getUsersInfo,
  getUsersIsLoading,
  getUsersTotalPages,
} from '../model/slice/usersSlice';
import { getUsersService } from '../model/services/getUsersService';
import { friendActionsService } from '../model/services/friendActionsService';

import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';

export const useUsersData = (search: string, page: number) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(getUsersInfo);
  const error = useAppSelector(getUsersError);
  const isLoading = useAppSelector(getUsersIsLoading);
  const totalPages = useAppSelector(getUsersTotalPages);

  useEffect(() => {
    dispatch(
      getUsersService({
        search,
        page,
      }),
    );
  }, [search, page]);

  useEffect(() => {
    dispatch(friendActionsService());
  }, [dispatch]);

  return {
    users,
    error,
    isLoading,
    totalPages,
  };
};
