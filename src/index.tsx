import ReactDOM from 'react-dom/client'
import { App } from './App'
import { StrictMode } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Test } from './Test'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <Test />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
