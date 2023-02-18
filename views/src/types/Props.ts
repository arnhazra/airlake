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

export type ErrorProps = {
    customMessage?: string
}

export type DatasetStoreHeaderProps = {
    datasetCount: number
}