import { ReactNode } from 'react'

export type CardProps = {
    header: ReactNode,
    body: ReactNode,
    footer: ReactNode
}

export type ReactIfProps = {
    condition: boolean,
    children: ReactNode
}

export type ProtectedRouteProps = {
    child: ReactNode
}

export type ErrorComponentProps = {
    customMessage?: string
}

export type NavProps = {
    sendSearchInput?: (input: string) => void
}