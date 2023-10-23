import { Main } from '@/pages';
import {
  AdminRouterPaths,
  PrivateRouterPaths,
  PublicRouterPaths,
  RouteItem,
} from '@/shared/types/router';

export const publicRoutes: Record<PublicRouterPaths, RouteItem> = {
  [PublicRouterPaths.MAIN]: {
    path: PublicRouterPaths.MAIN,
    Element: Main,
  },
};

export const privateRoutes: Record<PrivateRouterPaths, RouteItem> = {};

export const adminRoutes: Record<AdminRouterPaths, RouteItem> = {};
