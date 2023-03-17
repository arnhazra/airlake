import { useLayoutEffect } from 'react'

const useReload = () => {
    useLayoutEffect(() => {
        if (!sessionStorage.hasOwnProperty('hasReloaded')) {
            window.location.reload()
            location.reload()
            sessionStorage.setItem('hasReloaded', 'yes')
        }
    }, [])
}

export default useReload