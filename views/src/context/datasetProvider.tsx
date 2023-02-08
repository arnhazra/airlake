import { FC, ReactNode, createContext, useCallback, useMemo, useReducer } from 'react'
import { DatasetStoreState, DatasetReducer, Actions, ActionsMap, } from './reducers/datasetStoreReducer'

export type Dispatcher = <Type extends Actions['type'], Payload extends ActionsMap[Type]>(type: Type,
    ...payload: Payload extends undefined ? [undefined?] : [Payload]) => void

type DatasetStoreContextInterface = readonly [DatasetStoreState, Dispatcher]

const initialState = {
    datasetCount: 0
}

export const DatasetStoreContext = createContext<DatasetStoreContextInterface>([initialState, ((): void => undefined)])

interface DatasetStoreProviderProps {
    children: ReactNode
}

const DatasetStoreProvider: FC<DatasetStoreProviderProps> = ({ children }) => {
    const [state, _dispatch] = useReducer(DatasetReducer, initialState)
    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as Actions)
    }, [])
    const values = useMemo(() => [state, dispatch] as DatasetStoreContextInterface, [state])
    return <DatasetStoreContext.Provider value={values}>{children}</DatasetStoreContext.Provider>
}

export default DatasetStoreProvider