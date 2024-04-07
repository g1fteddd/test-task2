import ReactDOM from 'react-dom/client'
import { App } from './App'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LayoutProvider } from './components/LayoutProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
