import { ShowProps } from '@/types/Types'
import { FC, Fragment } from 'react'

const Show: FC<ShowProps> = ({ when, children }) => {
    return when === undefined || !when ? <Fragment></Fragment> : <Fragment>{children}</Fragment>
}

export default Show