import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { Footer } from '@/components/Footer/Footer.tsx';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main className='content'>
        <AppRouter/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
