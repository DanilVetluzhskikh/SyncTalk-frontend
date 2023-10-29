import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RegisterSchema } from '../types/registerSchema';
import { register } from '../services/register';

import { RootState } from '@/app/store';

const initialState: RegisterSchema = {
  isLoading: false,
  email: '',
  password: '',
  repeatPassword: '',
  errors: [],
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setRegisterPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRegisterRepeatPassword: (state, action: PayloadAction<string>) => {
      state.repeatPassword = action.payload;
    },
    setRegisterErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.errors = [];
        state.isLoading = true;
      })
      .addCase(register.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = [action.payload];
      });
  },
});

export const {
  setRegisterEmail,
  setRegisterErrors,
  setRegisterPassword,
  setRegisterRepeatPassword,
} = registerSlice.actions;

export const getRegisterEmail = (state: RootState) => state.register.email;
export const getRegisterPassword = (state: RootState) =>
  state.register.password;
export const getRegisterRepeatPassword = (state: RootState) =>
  state.register.repeatPassword;
export const getRegisterIsLoading = (state: RootState) =>
  state.register.isLoading;
export const getRegisterErrors = (state: RootState) => state.register.errors;

export const registerReducer = registerSlice.reducer;
