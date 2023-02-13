export type UserState = {
    userid: string,
    name: string,
    isAuthorized: boolean,
}

export type LivePriceState = {
    inr: number,
    usd: number,
    eur: number,
    isLoaded: boolean
}

export type UseDataSetStore = {
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