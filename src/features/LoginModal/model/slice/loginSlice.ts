import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginSchema } from '../types/loginSchema';
import { loginByEmail } from '../services/loginByEmail';

import { RootState } from '@/app/store';

const initialState: LoginSchema = {
  isLoading: false,
  email: '',
  password: '',
  errors: [],
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoginPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLoginErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginByEmail.pending, state => {
        state.errors = [];
        state.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = [action.payload];
      });
  },
});

export const { setLoginEmail, setLoginPassword, setLoginErrors } =
  loginSlice.actions;

export const getLoginEmail = (state: RootState) => state.login.email;
export const getLoginPassword = (state: RootState) => state.login.password;
export const getLoginIsLoading = (state: RootState) => state.login.isLoading;
export const getLoginErrors = (state: RootState) => state.login.errors;

export const loginReducer = loginSlice.reducer;
