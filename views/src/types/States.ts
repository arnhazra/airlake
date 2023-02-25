export type UserState = {
    userid: string,
    name: string,
    isLoaded: boolean,
    isAuthorized: boolean,
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