import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage.tsx';
const LazyClassicPage = lazy(() => import('@/pages/ClassicPage'));


export const enum commonRoutes {
  HOME = '/',
  // MY_HOLDINGS = '/my-holdings',
  CLASSIC = '/classic',
  // CLASSIC_EARN = '/classic-earn'
}

export const routesConfig: Record<commonRoutes, RouteProps> = {
  [commonRoutes.HOME]: {
    path: commonRoutes.HOME,
    element: <HomePage/>
  },
  [commonRoutes.CLASSIC]: {
    path: commonRoutes.CLASSIC,
    element: <LazyClassicPage/>
  },
  // [commonRoutes.CONTRACT_PAGE]: {
  //   path: commonRoutes.CONTRACT_PAGE,
  //   element: <Contracts />
  // },
  // [commonRoutes.NOT_FOUND_PAGE]: {
  //   path: commonRoutes.NOT_FOUND_PAGE,
  //   element: <Navigate to='/'/>
  // },
};
