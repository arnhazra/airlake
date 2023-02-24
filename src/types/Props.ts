import { ReactNode } from 'react'

export type CardProps = {
    header: ReactNode,
    body: ReactNode,
    footer: ReactNode
}

export type DatasetCardProps = {
    id: string
    category: string,
    name: string,
    price: number,
}

export type ReactIfProps = {
    condition: boolean,
    children: ReactNode
}

export type ErrorProps = {
    customMessage?: string
}

export type DatasetLibraryHeaderProps = {
    datasetCount: number
}