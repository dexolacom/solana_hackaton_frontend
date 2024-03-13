import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { PortfoliosPage } from '@/pages/PortfoliosPage.tsx';
const LazyClassicPage = lazy(() => import('@/pages/ClassicPage'));
const LazyClassicEarnPage = lazy(() => import('@/pages/ClassicEarnPage'))
const LazyMyHoldingsPage = lazy(() => import('@/pages/MyHoldingsPage'))


export const enum commonRoutes {
  HOME = '/',
  MY_HOLDINGS = '/my-holdings',
  CLASSIC = '/classic',
  CLASSIC_EARN = '/classic-earn'
}

export const routesConfig: Record<commonRoutes, RouteProps> = {
  [commonRoutes.HOME]: {
    path: commonRoutes.HOME,
    element: <PortfoliosPage/>
  },
  [commonRoutes.MY_HOLDINGS]: {
    path: commonRoutes.MY_HOLDINGS,
    element: <LazyMyHoldingsPage/>
  },
  [commonRoutes.CLASSIC]: {
    path: commonRoutes.CLASSIC,
    element: <LazyClassicPage/>
  },
  [commonRoutes.CLASSIC_EARN]: {
    path: commonRoutes.CLASSIC_EARN,
    element: <LazyClassicEarnPage/>
  },
  // [commonRoutes.NOT_FOUND_PAGE]: {
  //   path: commonRoutes.NOT_FOUND_PAGE,
  //   element: <Navigate to='/'/>
  // },
};
