import { Main, PrivateMain } from '@/pages';
import { SideBarLayout } from '@/shared/layouts/SideBarLayout/SideBarLayout';
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

export const privateRoutes: Record<PrivateRouterPaths, RouteItem> = {
  [PrivateRouterPaths.MAIN]: {
    path: PrivateRouterPaths.MAIN,
    Element: PrivateMain,
    Layout: SideBarLayout,
  },
};

export const adminRoutes: Record<AdminRouterPaths, RouteItem> = {};

export type RoutesType =
  | Record<PublicRouterPaths, RouteItem>
  | Record<AdminRouterPaths, RouteItem>
  | Record<PrivateRouterPaths, RouteItem>;
