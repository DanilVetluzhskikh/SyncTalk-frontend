import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { acceptFriend } from '@/features/UsersList';

interface GetData {
  friendId: number;
}

interface ReturnData {}

export const acceptFriendService = createAsyncThunk<
  ReturnData,
  GetData,
  ThunkConfig<string>
>('user/acceptFriend', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { friendId } = dataValues;

  try {
    const response = await extra.api.post<ReturnData>('user/accept-friend', {
      friendId,
    });

    dispatch(acceptFriend(friendId));

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
