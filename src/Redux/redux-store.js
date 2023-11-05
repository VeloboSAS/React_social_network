import  { applyMiddleware, combineReducers, compose,  legacy_createStore as createStore } from 'redux';
import  profileReducer  from './profileReducer';
import  dialogsReducer  from './dialogsReducer';
import  sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer';

let reducers = combineReducers({
    profilePages: profileReducer,
    dialogsPages: dialogsReducer,
    sidedbar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ));

window.store = store;
  
export default store;
