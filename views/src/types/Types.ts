import { ReactNode } from 'react'

export type LayoutProps = {
    children: ReactNode
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

export type DatasetRequestState = {
    searchQuery: string,
    selectedFilter: string,
    selectedSortOption: string
    offset: number
}

export type UserState = {
    userid: string,
    name: string,
}

export type AccordionProps = {
    eventKey: string,
    header: string,
    body: ReactNode
}