import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReturnDataUsers } from '../types/usersSchema';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/lib/timeout/timeout';

interface GetData {
  search: string;
  page: number;
}

export const getUsersService = createAsyncThunk<
  ReturnDataUsers,
  GetData,
  ThunkConfig<string>
>('user/all', async (dataValues, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  const { search, page } = dataValues;

  try {
    await sleep(1000);
    const response = await extra.api.get<ReturnDataUsers>('user/all', {
      params: {
        search,
        page,
      },
    });

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.message ?? 'Неизвестная ошибка');
  }
});
