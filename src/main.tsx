import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import '@fontsource-variable/inter'
import './index.css'
import { store } from '@/store'
import { BASE_URL } from '@/lib/env'
import App from './App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={BASE_URL}>
        <App />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
