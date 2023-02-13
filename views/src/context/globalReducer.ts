export type GlobalState = {
    userState: {
        userid: string,
        name: string,
        isLoaded: boolean,
        isAuthorized: boolean
    }
}

export type ActionsMap = {
    setUserState: { [key: string]: string | boolean }
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
        default:
            return state
    }
}