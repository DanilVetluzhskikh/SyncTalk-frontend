import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/utils/timeout';

interface GetData {
  status: string;
}

export const changeStatusService = createAsyncThunk<
  GetData,
  GetData,
  ThunkConfig<string>
>('user/changeStatus', async (data, thunkApi) => {
  const { rejectWithValue, extra } = thunkApi;

  try {
    await sleep(100);
    const response = await extra.api.post<GetData>('user/status', {
      status: data.status,
    });

    return response.data;
  } catch (e) {
    return rejectWithValue(
      (e?.response?.data?.message[0] || e?.response?.data?.message.message) ??
        'Неизвестная ошибка',
    );
  }
});
