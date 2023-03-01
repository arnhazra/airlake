import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.sass'
import AppRouter from './routes/AppRouter'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppRouter />)