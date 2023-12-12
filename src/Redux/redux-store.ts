import  { Action, applyMiddleware, combineReducers, compose,  legacy_createStore as createStore } from 'redux';
import  profileReducer  from './Reducers/profileReducer'
import  dialogsReducer  from './Reducers/dialogsReducer'
import  sidebarReducer from './Reducers/sidebarReducer'
import usersReducer from './Reducers/usersReducer'
import authReducer from './Reducers/authReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './Reducers/appReducer'
import chatReducer from './Reducers/chatReducer';

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidedbar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>

export type AppDispatch = typeof store.dispatch

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ))
//@ts-ignore
window.store = store
  
export default store
