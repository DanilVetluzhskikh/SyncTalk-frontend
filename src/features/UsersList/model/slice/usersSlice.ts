import { createSlice } from '@reduxjs/toolkit';

import { UsersSchema } from '../types/usersSchema';
import { getUsersService } from '../services/getUsersService';

import { RootState } from '@/app/store';

const initialState: UsersSchema = {
  isLoading: false,
  error: '',
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getUsersService.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersService.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersService.pending, state => {
        state.error = '';
        state.isLoading = true;
      }),
});

export const getUsersIsLoading = (state: RootState) => state.users.isLoading;
export const getUsersError = (state: RootState) => state.users.error;
export const getUsersInfo = (state: RootState) => state.users.users;

export const usersReducer = usersSlice.reducer;
