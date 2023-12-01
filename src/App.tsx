import {FC, lazy, memo, Suspense, useEffect } from 'react'

import {Route, Routes, Navigate, BrowserRouter, NavLink} from 'react-router-dom'
import {LoginPage} from './components/Login/Login'
import Page404 from './components/Page404/Page404';import {Provider, useDispatch, useSelector} from 'react-redux'
import { initializeApp } from './Redux/Reducers/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppDispatch, AppStateType } from './Redux/redux-store'

import { Layout, Menu, theme } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { Header } from './components/Header/Header';
// import HeaderContainer from './components/Header/HeaderContainer';

const {Content, Footer, Sider } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfilePage = lazy(() => import('./components/Profile/ProfileContainer'))
const UsersPage = lazy(() => import('./components/Users/UsersContainer'))
const Count = lazy(() => import('./components/Count/Count'))
const Modal = lazy(() => import('./components/Modal/Modal'))
const Settings = lazy(() => import('./components/Settings/Settings'))
const AppImages = lazy(() => import('./components/Images/AppImages'))



const App: FC = memo(() => {

  const {
    token: { colorBgContainer },
  } = theme.useToken()

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
        <Layout>
          <Header/>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu 
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                // items={items2}
                >
              <SubMenu key="sub1" title="MyProfile"> 
                <Menu.Item key="1"><NavLink to='/profile' >Profile</NavLink></Menu.Item> 
                <Menu.Item key="2"><NavLink to='/dialogs' >Messages</NavLink></Menu.Item> 
              </SubMenu>    

              <SubMenu key="sub2" title="Developers"> 
                <Menu.Item key="1"><NavLink to='/developers'>Users</NavLink></Menu.Item> 
              </SubMenu> 
              <SubMenu key="sub3" title="Settings"> 
                <Menu.Item key="1"><NavLink to='/settings'>Settings</NavLink></Menu.Item> 
              </SubMenu>
              <SubMenu key="sub4" title="other"> 
                <Menu.Item key="1"><NavLink to='/count'>Count</NavLink></Menu.Item> 
                <Menu.Item key="2"><NavLink to='/modal' >Modal</NavLink></Menu.Item> 
                <Menu.Item key="3"><NavLink to='/images'>Images</NavLink></Menu.Item> 
              </SubMenu> 


              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Suspense fallback={<div><Preloader isFetching={false}/></div>}>
                    <Routes>
                        <Route  path="/" element={<Navigate to={'/profile'} /> } />
                        <Route  path="/dialogs/*" element={ <DialogsContainer />}/>
                        <Route  path="/profile/:userId" element={ <ProfilePage  />}/>
                        <Route  path='/profile' element={<ProfilePage />}/>
                        <Route  path="/developers" element={<UsersPage pageTitle={'Samurais'}/>}/>
                        <Route  path="/login" element={<LoginPage />}/>
                        <Route  path="/count" element={<Count />}/>
                        <Route  path="/modal" element={<Modal />}/>
                        <Route  path="/settings" element={<Settings />}/>
                       <Route  path="/images" element={<AppImages />}/>
                       <Route  path="/*" element={<Page404 />}/>

                   </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2023 Created by IT-Kamasutra</Footer>
      </Layout>
      )
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