import React, { useEffect } from 'react';

import { Router } from './router/Router';

import './style/app.scss';
import { TOKEN } from '@/shared/mocks/api';

export const App: React.FC = () => {
  useEffect(() => {
    // TODO: сделать проверку на авторизацию по токену
    // если токен актуальный то вернуть данные об авторизованном пользователе
    // и перенести на приватную Main страницу иначе удалять токен и отображать
    // публичную страницу
    console.log(localStorage.getItem(TOKEN));
  }, []);

  return <Router />;
};
