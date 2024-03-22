import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

interface WalletButtonProps {
  children?: ReactNode
}

export const WalletButton = ({ children }: WalletButtonProps) => {
  const { setVisible: setModalVisible } = useWalletModal()
  const { buttonState, onConnect, onDisconnect, publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true)
    },
  })
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current

      if (!node || node.contains(event.target as Node)) return

      setMenuOpen(false)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [])

  return (
    <div className='relative'>
      <button
        className='wallet-adapter-button-trigger'
        aria-expanded={menuOpen}
        style={{ pointerEvents: menuOpen ? 'none' : 'auto' }}
        onClick={() => {
          switch (buttonState) {
            case 'no-wallet':
              setModalVisible(true)
              break
            case 'has-wallet':
              if (onConnect) {
                onConnect()
              }
              break
            case 'connected':
              console.log('Connected')
              setMenuOpen(true)
              break
          }
        }}
      >
        {children}
      </button>
      <ul
        aria-label='dropdown-list'
        className={`wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`}
        role='menu'
        ref={ref}
      >
        {publicKey ? (
          <li
            className='wallet-adapter-dropdown-list-item'
            onClick={async () => {
              await navigator.clipboard.writeText(publicKey.toBase58())
              setCopied(true)
              setTimeout(() => setCopied(false), 400)
            }}
            role='menuitem'
          >
            {copied ? 'copied' : 'copy address'}
          </li>
        ) : null}
        <li
          className='wallet-adapter-dropdown-list-item'
          onClick={() => {
            setModalVisible(true)
            setMenuOpen(false)
          }}
          role='menuitem'
        >
          {'change wallet'}
        </li>
        {onDisconnect ? (
          <li
            className='wallet-adapter-dropdown-list-item'
            onClick={() => {
              onDisconnect()
              setMenuOpen(false)
            }}
            role='menuitem'
          >
            {'disconnect'}
          </li>
        ) : null}
      </ul>
    </div>
  )
}
