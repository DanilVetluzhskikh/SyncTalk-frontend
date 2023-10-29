import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { TOKEN } from '@/shared/mocks/api';

interface RegisterProps {
  email: string;
  password: string;
}

interface GetData {
  token: string;
  status: number;
  message: string;
}

export const register = createAsyncThunk<
  GetData,
  RegisterProps,
  ThunkConfig<string>
>('auth/register', async (authData, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    const response = await extra.api.post<GetData>('auth/register', authData);

    if (response.data.status === 400) {
      throw new Error(response.data.message);
    }

    localStorage.setItem(TOKEN, response.data.token);

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
