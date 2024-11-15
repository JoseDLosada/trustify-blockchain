import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import TrustifyLayout from './TrustifyLayout.tsx'
import TrustifyLogin from './TrustifyLogin.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// import TrustifyLogin from './TrustifyLogin.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App></App>
    </BrowserRouter>
  
  </StrictMode>,
)
