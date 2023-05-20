import { FC, ReactNode, createContext, useCallback, useMemo, useReducer } from 'react'
import { GlobalState, Actions, ActionsMap, GlobalReducer } from './globalReducer'

export type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type,
    ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type GlobalContextInterface = readonly [GlobalState, Dispatcher]

const initialState = {
    userState: {
        userid: '',
        name: '',
        privateKey: ''
    },

    datasetRequestState: {
        searchQuery: '',
        selectedFilter: 'All',
        selectedSortOption: 'name',
        offset: 0
    },
}

export const GlobalContext = createContext<GlobalContextInterface>([initialState, ((): void => undefined)])

interface GlobalStateProviderProps {
    children: ReactNode
}

const GlobalStateProvider: FC<GlobalStateProviderProps> = ({ children }) => {
    const [state, _dispatch] = useReducer(GlobalReducer, initialState)
    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as Actions)
    }, [])
    const values = useMemo(() => [state, dispatch] as GlobalContextInterface, [state])
    return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
}

export default GlobalStateProvider