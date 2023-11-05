import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

import { userAuthService } from '@/app/services/userAuthService';

export interface authSchema {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: authSchema = {
  isAuth: false,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: state => {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userAuthService.pending, state => {
        state.isLoading = true;
        state.error = '';
        state.isAuth = false;
      })
      .addCase(userAuthService.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isAuth = false;
      })
      .addCase(userAuthService.fulfilled, state => {
        state.isAuth = true;
        state.isLoading = false;
        state.error = '';
      });
  },
});

export const { authLogout } = authSlice.actions;

export const selectAuthIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthILoading = (state: RootState) => state.auth.isLoading;

export const authReducer = authSlice.reducer;
