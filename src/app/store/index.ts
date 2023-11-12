import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slices/userSlice';
import { authReducer } from './slices/authSlice';
import { $axios } from '../api/api';

import { loginReducer } from '@/features/LoginModal';
import { registerReducer } from '@/features/RegModal';
import { ThunkExtraArg } from '@/shared/types/redux';
import { usersReducer } from '@/features/UsersList';
import { userCardReducer } from '@/entities/UserCard/model/slice/userCardSlice';

const extraArg: ThunkExtraArg = {
  api: $axios,
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
    users: usersReducer,
    userCard: userCardReducer,
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
