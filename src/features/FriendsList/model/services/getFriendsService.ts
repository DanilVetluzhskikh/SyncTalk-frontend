import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/lib/timeout/timeout';

export const getFriendsService = createAsyncThunk<
  undefined,
  undefined,
  ThunkConfig<string>
>('user/friends', async (_, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    await sleep(1000);
    const response = await extra.api.get<undefined>('user/friends');

    console.log(response.data);

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
