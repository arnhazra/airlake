import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.sass'
import AppRouter from './routes/AppRouter'
import axios from 'axios'

axios.interceptors.request.use(
    (request) => {
        request.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return request
    }
)

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<AppRouter />)