import { RouteProps } from 'react-router-dom'
import { MoviesPage } from '../../pages/MoviesPage'
import { FilmPage } from '../../pages/FilmPage'
import { NotFoundPage } from '../../pages/NotFoundPage'

export enum AppRoutes {
  MOVIES = 'movies',
  FILM = 'film',
  NOT_FOUND = 'not_found',
}

export interface RouteConfig {
  path: AppRoutes
  element: React.ReactNode
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MOVIES]: '/',
  [AppRoutes.FILM]: '/film/:id',
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MOVIES]: {
    path: RoutePath.movies,
    element: <MoviesPage />,
  },
  [AppRoutes.FILM]: {
    path: RoutePath.film,
    element: <FilmPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
