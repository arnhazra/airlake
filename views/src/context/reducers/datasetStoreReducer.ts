export type DatasetStoreState = {
    datasetCount: number
}

export type ActionsMap = {
    setDatasetCount: number | undefined
}

export type Actions = {
    [Key in keyof ActionsMap]: {
        type: Key
        payload: ActionsMap[Key]
    }
}[keyof ActionsMap]

export const DatasetReducer = (state: DatasetStoreState, action: Actions): DatasetStoreState => {
    switch (action.type) {
        case 'setDatasetCount':
            return { ...state, datasetCount: action.payload ? action.payload : 0 }
        default:
            return state
    }
}
