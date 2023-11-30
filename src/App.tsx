import {FC, lazy, memo, Suspense, useEffect } from 'react'
import s from './App.module.css'
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar'
import {LoginPage} from './components/Login/Login'
import Page404 from './components/Page404/Page404';import {Provider, useDispatch, useSelector} from 'react-redux'
import { initializeApp } from './Redux/Reducers/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppDispatch, AppStateType } from './Redux/redux-store'
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfilePage = lazy(() => import('./components/Profile/ProfileContainer'))
const UsersPage = lazy(() => import('./components/Users/UsersContainer'))
const Count = lazy(() => import('./components/Count/Count'))
const Modal = lazy(() => import('./components/Modal/Modal'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const AppImages = lazy(() => import('./components/Images/AppImages'))


const App: FC = memo(() => {
  //useSelector Hook
      const isInitialized = useSelector((state: AppStateType) => state.app.initialized)
  
  //useDispatch Hook
      const dispatch: AppDispatch = useDispatch()
      const initialize = () => dispatch(initializeApp())
  
  //useEffect Hooks
      useEffect(() => {
          initialize()
      }, [])

  
      if (!isInitialized) {
              return <Preloader isFetching={false}/>
            }
      return (
          <div className={s.appWrapper}>
            <HeaderContainer />
            <Navbar />
            <div className={s.appWrapperContent}>
              <Suspense fallback={<div><Preloader isFetching={false}/></div>}>
                    <Routes>
                        <Route  path="/" element={<Navigate to={'/profile'} /> } />
                        <Route  path="/dialogs/*" element={ <DialogsContainer />}/>
                        <Route  path="/profile/:userId" element={ <ProfilePage  />}/>
                        <Route  path='/profile' element={<ProfilePage />}/>
                        <Route  path="/users" element={<UsersPage pageTitle={'Samurais'}/>}/>
                        <Route  path="/login" element={<LoginPage />}/>
                        <Route  path="/count" element={<Count />}/>
                        <Route  path="/modal" element={<Modal />}/>
                        <Route  path="/settings" element={<Settings />}/>
                        <Route  path="/images" element={<AppImages />}/>
                        <Route  path="/*" element={<Page404/>}/>
                    </Routes>
              </Suspense>
            </div>
          </div>)
  })

  const MainApp = () => {
    return (
      <BrowserRouter>
      <Provider store={store}>
           <App/>
       </Provider>
     </BrowserRouter>
    )
}
export default MainApp