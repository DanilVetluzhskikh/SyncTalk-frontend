import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetDataAction } from '../schema/userCardSchema';

import { ThunkConfig } from '@/shared/types/redux';
import { declineFriend } from '@/features/UsersList';

interface ReturnData {}

export const deleteFriendService = createAsyncThunk<
  ReturnData,
  GetDataAction,
  ThunkConfig<string>
>('user/deleteFriendService', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { friendId } = dataValues;

  try {
    const response = await extra.api.post<ReturnData>('user/delete-friend', {
      friendId,
    });

    dispatch(declineFriend(friendId));

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
