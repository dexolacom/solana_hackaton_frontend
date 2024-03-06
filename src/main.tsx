import ReactDOM from 'react-dom/client'
import App from '@/App.tsx';
import './styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { SolanaWalletProvider } from '@/providers/WalletProvider/config.tsx';
import { ToastProvider } from '@/components/ui/Toast.tsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SolanaWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </SolanaWalletProvider>
  </BrowserRouter>
)
