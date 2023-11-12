import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { declineFriend } from '@/features/UsersList';

interface GetData {
  friendId: number;
}

interface ReturnData {}

export const declineFriendService = createAsyncThunk<
  ReturnData,
  GetData,
  ThunkConfig<string>
>('user/declineFriend', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { friendId } = dataValues;

  try {
    const response = await extra.api.post<ReturnData>('user/decline-friend', {
      friendId,
    });

    dispatch(declineFriend(friendId));

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
