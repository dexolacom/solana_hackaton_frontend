import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/common/Header/Header.tsx';
import { Footer } from '@/components/common/Footer/Footer.tsx';
import { Toaster } from '@/components/ui/Toaster.tsx';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main className='content'>
        <AppRouter/>
      </main>
      <Toaster/>
      <Footer/>
    </div>
  )
}

export default App
