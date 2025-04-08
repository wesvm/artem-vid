import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Button } from '@/components/ui/button'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>woaaaaaaaaaaat</Button>
    </div>
  </StrictMode>,
)
