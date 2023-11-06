import React, {Component, lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import { initializeApp } from './Redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './Redux/redux-store';
import Page404 from './components/Page404/Page404';
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
const Count = lazy(() => import('./components/Count/Count'));
const Modal = lazy(() => import('./components/Modal/Modal'));
const Quiz = lazy(() => import('./components/Quiz/Quiz'));
const Settings = lazy(() => import('./components/Settings/Settings'));
const AppImages = lazy(() => import('./components/Images/AppImages'));


class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
}
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Suspense fallback={<div><Preloader/></div>}>
              <Routes>
                <Route  path="/dialogs/*" element={ <DialogsContainer />}></Route>
                <Route  path="/profile/:userId" element={ <ProfileContainer  />}></Route>
                <Route  path='/profile/' element={<ProfileContainer />} />
                <Route  path="/users" element={<UsersContainer />}></Route>
                <Route  path="/login" element={<Login />}></Route>
                <Route  path="/count" element={<Count />}></Route>
                <Route  path="/modal" element={<Modal />}></Route>
                <Route  path="/quiz" element={<Quiz />}></Route>
                <Route  path="/settings" element={<Settings />}></Route>
                <Route  path="/images" element={<AppImages />}></Route>
                <Route path="*" element={<Page404 />}/>
              </Routes>
            </Suspense>
          </div>
        </div>
  );
  };
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized})
  
  
let AppContainer = connect(mapStateToProps, {initializeApp})(App);  

let SamuraiJSApp = (props) => {
          return  <BrowserRouter>
                    <Provider store={store}>
                        <AppContainer/>
                    </Provider>
                  </BrowserRouter>
}

export default SamuraiJSApp;