import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { adminRoutes, privateRoutes, publicRoutes } from './routes/routes';
import { renderRoutes } from './lib/routes';

import { NotFound } from '@/pages';

interface RouterProps {
  isAuth: boolean;
}

export const Router = ({ isAuth }: RouterProps) => {
  const isAdmin = false;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {isAuth ? renderRoutes(privateRoutes) : renderRoutes(publicRoutes)}
        {isAdmin && renderRoutes(adminRoutes)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
