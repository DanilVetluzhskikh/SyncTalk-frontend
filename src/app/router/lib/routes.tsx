import { Route } from 'react-router-dom';

import { RoutesType } from '@/app/router/routes/routes';

export const renderRoutes = (routes: RoutesType) => {
  return Object.values(routes).map(({ path, Element, Layout }) => (
    <Route
      key={path}
      path={path}
      element={
        Layout ? (
          <Layout>
            <Element />
          </Layout>
        ) : (
          <Element />
        )
      }
    />
  ));
};
