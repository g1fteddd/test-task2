import ReactDOM from 'react-dom/client'
import { App } from './App'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LayoutProvider } from './components/LayoutProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </BrowserRouter>
  </StrictMode>
)
