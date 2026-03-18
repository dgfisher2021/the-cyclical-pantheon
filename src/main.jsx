import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PantheonCircle from './PantheonCircle'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantheonCircle />
  </StrictMode>,
)
