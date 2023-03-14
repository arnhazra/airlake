import { FC, Fragment } from 'react'
import { ReactIfProps } from '../types/Props'

const ReactIf: FC<ReactIfProps> = ({ condition, children }) => {
    return condition === undefined || !condition ? <Fragment></Fragment> : <Fragment>{children}</Fragment>
}

export default ReactIf