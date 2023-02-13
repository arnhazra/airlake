import { Dataset, UserState } from '../types/States'

export type GlobalState = {
    userState: UserState
    datasetRequestState: {
        searchInput: string,
        selectedFilter: string,
        selectedSortOption: string
    }

    datasetResponseState: {
        datasets: Dataset[]
    }
}

export type ActionsMap = {
    setUserState: { [key: string]: string | boolean }
    setDatasetRequestState: { [key: string]: string }
    setDatasetResponseState: { [key: string]: Dataset[] }
}

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key
        payload: ActionsMap[Key]
    }
}[keyof ActionsMap]

export const GlobalReducer = (state: GlobalState, action: Actions): GlobalState => {
    switch (action.type) {
        case 'setUserState':
            return {
                ...state, userState: { ...state.userState, ...action.payload }
            }

        case 'setDatasetRequestState':
            return {
                ...state, datasetRequestState: { ...state.datasetRequestState, ...action.payload }
            }

        case 'setDatasetResponseState':
            return {
                ...state, datasetResponseState: { ...state.datasetResponseState, ...action.payload }
            }

        default:
            return state
    }
}