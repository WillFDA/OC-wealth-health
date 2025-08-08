import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
  open,
  onClose,
  children,
  closeIcon,
  closePosition = 'top-right',
  customPosition,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  closeIcon?: React.ReactNode
  closePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  customPosition?: string
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const getIconPosition = (position: string) => {
    switch (position) {
      case 'top-right':
        return 'top-2 right-2'
      case 'top-left':
        return 'top-2 left-2'
      case 'bottom-right':
        return 'bottom-2 right-2'
      case 'bottom-left':
        return 'bottom-2 left-2'
      default:
        return 'top-2 right-2'
    }
  }

  useEffect(() => {
    if (!dialogRef.current) return
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  if (typeof document === 'undefined') return null
  return createPortal(
    <dialog
      ref={dialogRef}
      className='w-2xl max-w-2xl mx-auto my-auto min-h-lg bg-white p-6 rounded-lg'
    >
      <form
        method='dialog'
        autoFocus
        onClick={onClose}
        className={`absolute cursor-pointer ${getIconPosition(closePosition) || customPosition}`}
      >
        {closeIcon || <X className='size-6' />}
      </form>
      {children}
    </dialog>,
    document.body,
  )
}
