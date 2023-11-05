import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

import { ProfileType, UserType } from '@/shared/types/user';
import { updateUserInfoService } from '@/app/services/updateUserInfoService';
import { changeStatusService } from '@/app/services/changeStatusService';

export interface userSchema {
  user: UserType | null;
  profile: ProfileType | null;
  isLoading: boolean;
  error: string;
}

const initialState: userSchema = {
  user: null,
  profile: null,
  isLoading: false,
  error: '',
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
    changeEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    changeUsername: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },
    changeAvatar: (state, action: PayloadAction<string>) => {
      state.profile.avatarURL = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(updateUserInfoService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.avatarURL = action.payload.avatarURL;
        state.user.username = action.payload.username;
        state.error = '';
      })
      .addCase(updateUserInfoService.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUserInfoService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeStatusService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.status = action.payload.status;
        state.error = '';
      })
      .addCase(changeStatusService.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(changeStatusService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const {
  changeUser,
  changeProfile,
  changeEmail,
  changeUsername,
  changeAvatar,
} = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
