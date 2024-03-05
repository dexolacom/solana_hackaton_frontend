import './styles/app.css'
import { AppRouter } from '@/providers/router/AppRouter.tsx';
import { Header } from '@/components/Header/Header.tsx';

function App() {
  return (
    <div className='wrapper'>
      <Header/>
      <main className='content'>
        <AppRouter/>
      </main>
    </div>
  )
}

export default App
