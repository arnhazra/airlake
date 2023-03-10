export type UserState = {
    userid: string,
    name: string,
    isLoaded: boolean,
}

export type DatasetRequestState = {
    searchInput: string,
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
    searchInput: string,
    selectedFilter: string,
    selectedSortOption: string
}

export type GenericIdType = {
    id: string | undefined
}

export type UseIsSubscribed = {
    id: any,
    hasClickedSubscribed: boolean
}