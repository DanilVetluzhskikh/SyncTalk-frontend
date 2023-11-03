import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import { userReducer } from './slices/userSlice';
import { authReducer } from './slices/authSlice';

import { loginReducer } from '@/features/LoginModal';
import { ThunkExtraArg } from '@/shared/types/redux';
import { TOKEN, url } from '@/shared/mocks/api';
import { registerReducer } from '@/features/RegModal';

export const $axios = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
  },
});

const extraArg: ThunkExtraArg = {
  api: $axios,
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
