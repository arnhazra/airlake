export type UserState = {
    userid: string,
    name: string,
}

export type DatasetRequestState = {
    searchQuery: string,
    selectedFilter: string,
    selectedSortOption: string
}

export type LivePriceState = {
    inr: number,
    usd: number,
    eur: number,
    isLoaded: boolean
}

export type UseDatasetLibrary = {
    searchQuery: string,
    selectedFilter: string,
    selectedSortOption: string
}

export type GenericIdType = {
    id: string | undefined | string[]
}

export type UseIsSubscribed = {
    id: any,
    hasClickedSubscribed: boolean
}