import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';

export const userLogout = createAsyncThunk<
  string,
  undefined,
  ThunkConfig<string>
>('auth/logout', async (_, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    const response = await extra.api.post<string>('auth/logout');

    return response.data;
  } catch (e) {
    return rejectWithValue('Не получилось выйти из аккаунта');
  }
});
