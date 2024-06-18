import './styles/app.css';
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/widgets/Header/Header.tsx';
import { Footer } from '@/components/widgets/Footer/Footer.tsx';
import { Toaster } from '@/components/ui/Toaster.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { ModalsFactory } from '@/components/common/ModalFactory/ModalFactory.tsx';
import { useBuyNftByToken } from './lib/blockchain/hooks/useBuyNftByToken copy';

function App() {
  const { modalName } = useModalsContext();
  const { buyNftByToken } = useBuyNftByToken();

  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <button
          onClick={() =>
            buyNftByToken({
              inputValue: 100,
              portfolioId: 2,
              collectionId: 1
            })
          }
        >
          TEST
        </button>
        <AppRouter />
      </main>
      {modalName && <ModalsFactory />}
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
