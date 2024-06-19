import './styles/app.css';
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/widgets/Header/Header.tsx';
import { Footer } from '@/components/widgets/Footer/Footer.tsx';
import { Toaster } from '@/components/ui/Toaster.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { ModalsFactory } from '@/components/common/ModalFactory/ModalFactory.tsx';
import { useMintPortfolio } from './lib/blockchain/hooks/useMintPortfolio';

function App() {
  const { modalName, setModalName } = useModalsContext();
  const { mintPortfolio } = useMintPortfolio(5);

  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <button onClick={()=> setModalName('INVEST')}>Invest</button>
        <button
          onClick={() =>
            mintPortfolio({
              inputValue: 10,
              portfolioId: 2,
              collectionId: 2
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
