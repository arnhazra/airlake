import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'node-snackbar/dist/snackbar.min.css'
import './styles/main.sass'
import App from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)