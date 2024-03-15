import { ReactNode, useEffect } from 'react'
import { Card } from '@/components/ui/Card.tsx'

interface CommonModalProps {
  children: ReactNode
  handleClose: () => void
}

const CommonModal = ({ children, handleClose }: CommonModalProps) => {
  useEffect(() => {
    window.addEventListener('keyup', keyUpClose)
    return () => window.removeEventListener('keyup', keyUpClose)
  }, [])

  const keyUpClose = (event: { key: string }) => {
    if (event.key === 'Escape') {
      return handleClose()
    }
  }

  return (
    <div
      className={`flex items-center justify-center fixed top-0 left-0 h-screen w-screen pointer z-[100] bg-slate-600/50 animate-dialog`}
      onClick={() => handleClose()}
    >
      <Card className={'relative max-w-[556px] w-full'} onClick={(event) => event.stopPropagation()}>
        {children}
      </Card>
    </div>
  )
}

export default CommonModal
