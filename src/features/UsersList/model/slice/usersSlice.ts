import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ReturnDataUsers, UsersSchema } from '../types/usersSchema';
import { getUsersService } from '../services/getUsersService';

import { RootState } from '@/app/store';

const initialState: UsersSchema = {
  isLoading: true,
  error: '',
  users: [],
  totalPages: 1,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    acceptFriend: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload) {
          user.isFriend = true;
        }

        return user;
      });
    },
    sentRequest: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload) {
          user.requestFriend = true;
        }

        return user;
      });
    },
    declineFriend: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload) {
          user.isSentRequest = false;
          user.requestFriend = false;
          user.isFriend = false;
        }

        return user;
      });
    },
    requestFriendToMe: (state, action: PayloadAction<number>) => {
      state.users = state.users.map(user => {
        if (user.id === action.payload) {
          user.isSentRequest = true;
        }

        return user;
      });
    },
    fillUsers: (state, action: PayloadAction<ReturnDataUsers>) => {
      state.error = '';
      state.isLoading = false;
      state.totalPages = action.payload.totalPages;
      state.users = action.payload.users;
      state.isLoading = false;
      state.error = '';
    },
    startLoading: state => {
      state.isLoading = true;
      state.error = '';
    },
    loadingWithError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getUsersService.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsersService.pending, state => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getUsersService.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.totalPages = action.payload.totalPages;
        state.users = action.payload.users;
      }),
});

export const getUsersIsLoading = (state: RootState) => state.users.isLoading;
export const getUsersError = (state: RootState) => state.users.error;
export const getUsersInfo = (state: RootState) => state.users.users;
export const getUsersTotalPages = (state: RootState) => state.users.totalPages;

export const {
  declineFriend,
  acceptFriend,
  sentRequest,
  fillUsers,
  startLoading,
  loadingWithError,
  requestFriendToMe,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
