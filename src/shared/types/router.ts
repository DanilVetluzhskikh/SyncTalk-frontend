import React from 'react';

export enum PublicRouterPaths {
  MAIN = '/',
}

export enum PrivateRouterPaths {
  MAIN = '/',
  PROFILE = '/profile',
  USERS = '/users',
}

export enum AdminRouterPaths {}

export type RouteItem = {
  path: string;
  Element: React.FC;
  Layout?: React.FC<object>;
};

export type NavigationItem = {
  img: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement>>;
  title?: string;
  to: string;
};
