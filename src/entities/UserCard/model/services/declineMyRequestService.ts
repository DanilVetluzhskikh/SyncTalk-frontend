import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetDataAction } from '../schema/userCardSchema';

import { ThunkConfig } from '@/shared/types/redux';
import { declineFriend } from '@/features/UsersList';

interface ReturnData {}

export const declineMyRequestService = createAsyncThunk<
  ReturnData,
  GetDataAction,
  ThunkConfig<string>
>('user/declineMyRequestService', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  const { friendId } = dataValues;

  try {
    const response = await extra.api.post<ReturnData>(
      'user/decline-my-request',
      {
        friendId,
      },
    );

    dispatch(declineFriend(friendId));

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
