import React, {Component, ComponentType, FC, lazy, Suspense} from 'react'
import s from './App.module.css'
import {BrowserRouter, Route, Routes, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Page404 from './components/Page404/Page404';import {connect} from 'react-redux'
import { initializeApp } from './Redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import { Provider } from 'react-redux'
import store, { AppStateType } from './Redux/redux-store'
import { compose } from "redux"
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const Count = lazy(() => import('./components/Count/Count'))
const Modal = lazy(() => import('./components/Modal/Modal'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const AppImages = lazy(() => import('./components/Images/AppImages'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType>{

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured")
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors) 
    }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors) 
  }  

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
        <div className={s.appWrapper}>
          <HeaderContainer />
          <Navbar />
          <div className={s.appWrapperContent}>
            <Suspense fallback={<div><Preloader/></div>}>
                  <Routes>
                      <Route  path="/" element={<Navigate to={'/profile'} /> } />
                      <Route  path="/dialogs/*" element={ <DialogsContainer />}/>
                      <Route  path="/profile/:userId" element={ <ProfileContainer  />}/>
                      <Route  path='/profile' element={<ProfileContainer />}/>
                      <Route  path="/users" element={<UsersContainer/>}/>
                      <Route  path="/login" element={<Login />}/>
                      <Route  path="/count" element={<Count />}/>
                      <Route  path="/modal" element={<Modal />}/>
                      <Route  path="/settings" element={<Settings />}/>
                      <Route  path="/images" element={<AppImages />}/>
                      <Route  path="/*" element={<Page404/>}/>
                  </Routes>
            </Suspense>
          </div>
        </div>
  );
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized})
  
let AppContainer = compose<ComponentType>(connect(mapStateToProps, {initializeApp}))(App)

let SamuraiJSApp: FC = (props) => {
          return  <BrowserRouter>
                    <Provider store={store}>
                        <AppContainer/>
                    </Provider>
                  </BrowserRouter>
}

export default SamuraiJSApp
