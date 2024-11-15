import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import TrustifyLayout from './TrustifyLayout.tsx'
import TrustifyLogin from './TrustifyLogin.tsx'
// import TrustifyLogin from './TrustifyLogin.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrustifyLayout />
    {/* <TrustifyLogin /> */}
  </StrictMode>,
)
