import { createAsyncThunk } from '@reduxjs/toolkit';

import { authLogout } from '../store/slices/authSlice';

import { ThunkConfig } from '@/shared/types/redux';

export const userLogout = createAsyncThunk<
  string,
  undefined,
  ThunkConfig<string>
>('auth/logout', async (_, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  try {
    const response = await extra.api.post<string>('auth/logout');

    dispatch(authLogout);
    window.location.reload();

    return response.data;
  } catch (e) {
    return rejectWithValue('Не получилось выйти из аккаунта');
  }
});
