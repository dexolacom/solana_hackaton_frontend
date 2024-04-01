import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx'
import { Header } from '@/components/widgets/Header/Header.tsx'
import { Footer } from '@/components/widgets/Footer/Footer.tsx'
import { Toaster } from '@/components/ui/Toaster.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { ModalsFactory } from '@/components/common/ModalFactory/ModalFactory.tsx'
import { useBuyNftByNative } from './lib/blockchain/hooks/useBuyNftByNative'

function App() {
  const { modalName } = useModalsContext()
 const {buyNftByNative} = useBuyNftByNative();
  return (
    <div className='wrapper'>
      <Header />
      <main className='content'>
        <AppRouter />
      </main>
      {modalName && <ModalsFactory />}
      <Toaster />
      <button onClick={()=> buyNftByNative({inputValue: 2, nftId: 5})}>TEST</button>
      <Footer />
    </div>
  )
}

export default App
