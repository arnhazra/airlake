export type UserState = {
    userid: string,
    name: string,
}

export type DatasetRequestState = {
    searchQuery: string,
    selectedFilter: string,
    selectedSortOption: string
    offset: number
}

export type LivePriceState = {
    inr: number,
    usd: number,
    eur: number,
    isLoaded: boolean
}

export type GenericIdType = {
    id: string | undefined | string[]
}

export type UseIsSubscribed = {
    id: any,
    hasClickedSubscribed: boolean
}