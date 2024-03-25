import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import { PortfoliosPage } from '@/pages/PortfoliosPage/PortfoliosPage.tsx'
import ClassicItemPage from '@/pages/ClassicItemPage/ClassicItemPage.tsx'
const LazyClassicPage = lazy(() => import('@/pages/ClassicPage/ClassicPage.tsx'))
const LazyMyHoldingsPage = lazy(() => import('@/pages/MyHoldingsPage/MyHoldingsPage.tsx'))
const LazySolanaPage = lazy(() => import('@/pages/SolanaPage/SolanaPage.tsx'))

export const enum commonRoutes {
  HOME = '/',
  MY_HOLDINGS = '/my-holdings',
  CLASSIC = '/classic',
  // CLASSIC_EARN = '/classic-earn',
  CLASSIC_ITEM = 'my-holdings/classic/:item',
  // CLASSIC_EARN_ITEM = '/classic-earn/:item',
  SOLANA = '/solana',
  SOLANA_ITEM = 'my-holdings/solana/:item',
}

export const routesConfig: Record<commonRoutes, RouteProps> = {
  [commonRoutes.HOME]: {
    path: commonRoutes.HOME,
    element: <PortfoliosPage />,
  },
  [commonRoutes.MY_HOLDINGS]: {
    path: commonRoutes.MY_HOLDINGS,
    element: <LazyMyHoldingsPage />,
  },
  [commonRoutes.CLASSIC]: {
    path: commonRoutes.CLASSIC,
    element: <LazyClassicPage />,
  },
  // [commonRoutes.CLASSIC_EARN]: {
  //   path: commonRoutes.CLASSIC_EARN,
  //   element: <LazyClassicEarnPage />,
  // },
  [commonRoutes.CLASSIC_ITEM]: {
    path: commonRoutes.CLASSIC_ITEM,
    element: <ClassicItemPage />,
  },
  // [commonRoutes.CLASSIC_EARN_ITEM]: {
  //   path: commonRoutes.CLASSIC_EARN_ITEM,
  //   element: <ClassicEarnItemPage />,
  // },
  [commonRoutes.SOLANA]: {
    path: commonRoutes.SOLANA,
    element: <LazySolanaPage />,
  },
  [commonRoutes.SOLANA_ITEM]: {
    path: commonRoutes.SOLANA,
    element: <LazySolanaPage />,
  },
}
