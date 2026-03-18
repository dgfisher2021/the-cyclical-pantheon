import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PantheonCodex from './PantheonCodex'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantheonCodex />
  </StrictMode>,
)
