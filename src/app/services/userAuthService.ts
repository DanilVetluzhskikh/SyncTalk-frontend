import { createAsyncThunk } from '@reduxjs/toolkit';

import { changeProfile, changeUser } from '../store/slices/userSlice';

import { ThunkConfig } from '@/shared/types/redux';
import { sleep } from '@/shared/lib/timeout/timeout';
import { ProfileType } from '@/shared/types/user';

interface GetData {
  username: string;
  email: string;
  profile: ProfileType;
}

export const userAuthService = createAsyncThunk<
  GetData,
  undefined,
  ThunkConfig<string>
>('user/auth', async (_, thunkApi) => {
  const { rejectWithValue, extra, dispatch } = thunkApi;

  try {
    await sleep(150);
    const response = await extra.api.post<GetData>('user/auth');

    const {
      username,
      email,
      profile: { avatarURL, status },
    } = response.data;

    dispatch(
      changeUser({
        email,
        username,
      }),
    );

    dispatch(
      changeProfile({
        avatarURL,
        status,
      }),
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e?.response?.data?.message?.message ?? '');
  }
});
