import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { ProfileType, UserType } from '@/shared/types/user';

export interface userSchema {
  user: UserType | null;
  profile: ProfileType | null;
}

const initialState: userSchema = {
  user: null,
  profile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    changeProfile: (state, action: PayloadAction<ProfileType>) => {
      state.profile = action.payload;
    },
  },
});

export const { changeUser, changeProfile } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
