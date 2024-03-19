import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx'
import { Header } from '@/components/widgets/Header/Header.tsx'
import { Footer } from '@/components/widgets/Footer/Footer.tsx'
import { Toaster } from '@/components/ui/Toaster.tsx'
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx'
import { ModalsFactory } from '@/components/common/ModalFactory/ModalFactory.tsx'
import { Stake } from './temp/marinade/Stake'

// import NativeStaking from './temp/marinade-native/NativeStake'

function App() {
  const { modalName } = useModalsContext()

  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <AppRouter />
      </main>
      {modalName && <ModalsFactory />}
      <Toaster />
      <Footer />
      <Stake />
    </div>
  )
}

export default App
