import { createAsyncThunk } from '@reduxjs/toolkit';

import { UsersSchema } from '../types/usersSchema';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/utils/timeout';

interface GetData {
  search: string;
}

export const getUsersService = createAsyncThunk<
  UsersSchema['users'],
  GetData,
  ThunkConfig<string>
>('user/all', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  const { search } = dataValues;

  try {
    await sleep(300);
    const response = await extra.api.get<UsersSchema['users']>('user/all', {
      params: {
        search,
      },
    });

    if (!response.data.length) {
      throw new Error('Не удалось получить пользователей');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
