export type AuthState = {
    userid: string,
    name: string,
    isLoaded: boolean
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
    sortOption: string
}

export type GenericIdType = {
    id: string | undefined
}

export type UseIsSubscribed = {
    id: any,
    hasClickedSubscribed: boolean
}