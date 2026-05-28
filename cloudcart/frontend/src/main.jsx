import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111114',
              color: '#F8FAFC',
              border: '1px solid #3B3B44',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#06D6A0', secondary: '#F8FAFC' } },
            error: { iconTheme: { primary: '#EF476F', secondary: '#F8FAFC' } },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
