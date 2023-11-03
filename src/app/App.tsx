import React, { useEffect } from 'react';
import { Spin, message } from 'antd';

import { Router } from './router/Router';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  selectAuthError,
  selectAuthILoading,
  selectAuthIsAuth,
} from './store/slices/authSlice';
import { userAuthService } from './services/userAuthService';

import './style/app.scss';

export const App: React.FC = () => {
  const isLoading = useAppSelector(selectAuthILoading);
  const error = useAppSelector(selectAuthError);
  const isAuth = useAppSelector(selectAuthIsAuth);

  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAuthService());
  }, [dispatch]);

  useEffect(() => {
    if (error.length) {
      messageApi.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <Router isAuth={isAuth} />
    </>
  );
};
