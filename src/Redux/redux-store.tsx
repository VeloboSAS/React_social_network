import  { applyMiddleware, combineReducers, compose,  legacy_createStore as createStore } from 'redux';
import  profileReducer  from './profileReducer.tsx'
import  dialogsReducer  from './dialogsReducer.tsx'
import  sidebarReducer from './sidebarReducer.tsx'
import usersReducer from './usersReducer.tsx'
import authReducer from './authReducer.tsx'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer.tsx'

let rootReducers = combineReducers({
    profilePages: profileReducer,
    dialogsPages: dialogsReducer,
    sidedbar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ))
//@ts-ignore
window.store = store
  
export default store
