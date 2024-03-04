import { AppRouter } from '@/providers/router/AppRouter.tsx';
import './styles/app.css'

function App() {
  return (
    <div className='wrapper'>
      <main className='content'>
        <AppRouter/>
      </main>
    </div>
  )
}

export default App
