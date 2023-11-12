import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { sentRequest } from '@/features/UsersList';

interface GetData {
  friendId: number;
}

interface ReturnData {}

export const requestFriendService = createAsyncThunk<
  ReturnData,
  GetData,
  ThunkConfig<string>
>('user/requestFriend', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { friendId } = dataValues;

  try {
    const response = await extra.api.post<ReturnData>('user/request-friend', {
      friendId,
    });

    dispatch(sentRequest(friendId));

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
