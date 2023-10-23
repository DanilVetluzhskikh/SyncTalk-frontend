import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { adminRoutes, privateRoutes, publicRoutes } from './routes/routes';

import { NotFound } from '@/pages';

export const Router = () => {
  const isAdmin = false;

  return (
    <Suspense fallback="">
      <Routes>
        {localStorage.getItem('123')
          ? Object.values(privateRoutes).map(({ path, Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))
          : Object.values(publicRoutes).map(({ path, Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
        {isAdmin &&
          Object.values(adminRoutes).map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
