import { FC } from 'react'
import { ReactIfProps } from '../interfaces/Props'

const ReactIfComponent: FC<ReactIfProps> = ({ condition, children }: ReactIfProps) => {
    return condition === undefined || !condition ? <></> : <>{children}</>
}

export default ReactIfComponent