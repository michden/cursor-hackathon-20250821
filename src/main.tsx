import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { TranslationProvider } from './contexts/TranslationContext'
import { DemoModeProvider } from './contexts/DemoModeContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TranslationProvider>
        <DarkModeProvider>
          <DemoModeProvider>
            <App />
          </DemoModeProvider>
        </DarkModeProvider>
      </TranslationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
