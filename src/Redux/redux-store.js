import  { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import  profileReducer  from './profileReducer';
import  dialogsReducer  from './dialogsReducer';
import  sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
 

let reducers = combineReducers({
    profilePages: profileReducer,
    dialogsPages: dialogsReducer,
    sidedbar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore (reducers, applyMiddleware(thunkMiddleware));

window.store = store;
  
export default store;
