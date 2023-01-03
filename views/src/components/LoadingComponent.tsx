//Import Statements
import NavComponent from './NavComponent'

//Loading Component Component
const LoadingComponent = () => {
    return (
        <>
            <NavComponent />
            <div className='cover text-center'>
                <i className='fa-solid fa-circle-notch fa-spin fa-6x'></i>
            </div>
        </>
    )
}

//Export Statement
export default LoadingComponent