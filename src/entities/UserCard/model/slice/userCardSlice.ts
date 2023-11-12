import { createSlice } from '@reduxjs/toolkit';

import { UserCardSchema } from '../schema/userCardSchema';

import { RootState } from '@/app/store';

const initialState: UserCardSchema = {
  isLoading: false,
  error: '',
};

export const userCardSlice = createSlice({
  name: 'userCard',
  initialState,
  reducers: {},
});

export const getUserCardIsLoading = (state: RootState) =>
  state.userCard.isLoading;
export const getUserCardError = (state: RootState) => state.userCard.error;

export const userCardReducer = userCardSlice.reducer;
