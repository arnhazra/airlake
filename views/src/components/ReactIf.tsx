import { FC } from 'react'
import { ReactIfProps } from '../types/Props'

const ReactIfComponent: FC<ReactIfProps> = ({ condition, children }) => {
    return condition === undefined || !condition ? <></> : <>{children}</>
}

export default ReactIfComponent