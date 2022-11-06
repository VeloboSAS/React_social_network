import  { combineReducers, legacy_createStore as createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
import  profileReducer  from './profileReducer';
import  dialogsReducer  from './dialogsReducer';
import  sidebarReducer from './sidebarReducer';


let reducers = combineReducers({
    profilePages: profileReducer,
    dialogsPages: dialogsReducer,
    sidedbar: sidebarReducer,
});

let store = createStore(reducers);

  
export default store;
