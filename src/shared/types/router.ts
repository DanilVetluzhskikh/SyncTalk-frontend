import React from 'react';

export enum PublicRouterPaths {
  MAIN = '/',
}

export enum PrivateRouterPaths {}

export enum AdminRouterPaths {}

export type RouteItem = {
  path: string;
  Element: React.FC;
};
