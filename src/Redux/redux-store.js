import  { combineReducers, legacy_createStore as createStore } from 'redux';
import  profileReducer  from './profileReducer';
import  dialogsReducer  from './dialogsReducer';
import  sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';


let reducers = combineReducers({
    profilePages: profileReducer,
    dialogsPages: dialogsReducer,
    sidedbar: sidebarReducer,
    usersPage: usersReducer,
});

let store = createStore (reducers);

// window.store = store;
  
export default store;
