import React, {createContext, useContext, useReducer} from 'react'
import StateReducer, {initialState} from './StateReducer'

export const StateContext = createContext()

const StateContextProvider = ({children}) => (
    <StateContext.Provider value={useReducer(StateReducer, initialState)}>
       {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

export default StateContextProvider