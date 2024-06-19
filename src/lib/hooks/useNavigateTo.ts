import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateTo = (path: string) => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!publicKey) {
      navigate(path);
    }
  }, [publicKey]);
};
