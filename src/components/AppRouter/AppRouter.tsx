import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from './routerConfig'
import { PageLoader } from '../PageLoader'

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  )
}
