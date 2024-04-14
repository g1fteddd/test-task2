import ReactDOM from 'react-dom/client'
import { App } from './App'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <App />
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
