import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PantheonCodex from './PantheonCircle'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantheonCodex />
  </StrictMode>,
)
