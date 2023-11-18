import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/lib/timeout/timeout';

interface GetData {
  username: string;
  avatarURL: string;
}

export const updateUserInfoService = createAsyncThunk<
  GetData,
  undefined,
  ThunkConfig<string>
>('user/updateInfo', async (_, thunkApi) => {
  const { rejectWithValue, extra, getState } = thunkApi;
  const {
    user: { user, profile },
  } = getState();

  try {
    await sleep(450);
    const response = await extra.api.post<GetData>('user/info', {
      username: user.username,
      avatar: profile.avatarURL,
    });

    return response.data;
  } catch (e) {
    return rejectWithValue(
      (e?.response?.data?.message[0] || e?.response?.data?.message.message) ??
        'Неизвестная ошибка',
    );
  }
});
