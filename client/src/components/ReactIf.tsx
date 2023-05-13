import { ReactIfProps } from '@/types/Types'
import { FC, Fragment } from 'react'

const ReactIf: FC<ReactIfProps> = ({ condition, children }) => {
    return condition === undefined || !condition ? <Fragment></Fragment> : <Fragment>{children}</Fragment>
}

export default ReactIf