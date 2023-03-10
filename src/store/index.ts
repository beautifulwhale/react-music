import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  AnyAction
} from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import reducerCombine from './reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducerCombine,
  composeEnhancers(applyMiddleware(thunk))
)

export type AppDispatch = typeof store.dispatch
export type ReduxState = ReturnType<typeof reducerCombine>
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector
export default store
