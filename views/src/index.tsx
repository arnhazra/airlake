import { createRoot } from 'react-dom/client'
import AppRouter from './AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'node-snackbar/dist/snackbar.min.css'
import './styles/main.sass'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppRouter />)