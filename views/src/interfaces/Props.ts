import { ReactNode } from 'react'
import { AuthState, LivePriceState } from './States'

export interface CardProps {
    header: ReactNode,
    body: ReactNode,
    footer: ReactNode
}

export interface ReactIfProps {
    condition: boolean,
    children: ReactNode
}

export interface DashboardStackProps {
    auth: AuthState
    liveprice: LivePriceState
}
