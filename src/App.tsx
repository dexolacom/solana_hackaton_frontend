import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/widgets/Header/Header.tsx';
import { Footer } from '@/components/widgets/Footer/Footer.tsx';
import { Toaster } from '@/components/ui/Toaster.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { ModalsFactory } from '@/components/common/ModalFactory/ModalFactory.tsx';
import { SendTransaction } from './temp/SendTransaction';

function App() {
  const { modalName } = useModalsContext()

  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <SendTransaction />
        <AppRouter />
      </main>
      {modalName && <ModalsFactory />}
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
