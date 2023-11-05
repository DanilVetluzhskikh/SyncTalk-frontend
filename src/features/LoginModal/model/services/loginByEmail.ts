import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';

interface LoginByEmailProps {
  email: string;
  password: string;
}

interface GetData {
  token: string;
  status: number;
  message: string;
}

export const loginByEmail = createAsyncThunk<
  GetData,
  LoginByEmailProps,
  ThunkConfig<string>
>('auth/loginByEmail', async (authData, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    const response = await extra.api.post<GetData>('auth/login', authData);

    if (response.data.status === 400) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
