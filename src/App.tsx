import {FC, lazy, memo, Suspense, useEffect } from 'react'
import {Route, Routes, Navigate, BrowserRouter, NavLink} from 'react-router-dom'
import {LoginPage} from './components/Login/Login'
import Page404 from './components/Page404/Page404';import {Provider, useDispatch, useSelector} from 'react-redux'
import { initializeApp } from './Redux/Reducers/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppDispatch, AppStateType } from './Redux/redux-store'

import { Layout, Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { Header } from './components/Header/Header'

const {Content, Footer, Sider } = Layout

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfilePage = lazy(() => import('./components/Profile/ProfileContainer'))
const UsersPage = lazy(() => import('./components/Users/UsersContainer'))
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const Settings = lazy(() => import('./components/Settings/Settings'))


const App: FC = memo(() => {

const HEADER = '#2A1B3D'
const TEXT = '#A4B3B6'
// const TEXT2 = '#D83F87'
const CONTENT = '#00FFFF'
const SIDEBAR = '#44318D'


  //useSelector Hook
      const isInitialized = useSelector((state: AppStateType) => state.app.initialized)
  
  //useDispatch Hook
      const dispatch: AppDispatch = useDispatch()
      const initialize = () => dispatch(initializeApp())
  
  //useEffect Hook
      useEffect(() => {
          initialize()
      }, [])

  
      if (!isInitialized) {
              return <Preloader isFetching={false}/>
            }
      return (
        <Layout style={{minHeight: '100vh'}} >
          <Header/>
          <Content >
            <Layout style={{ background: CONTENT }}>
              <Sider  width={'18vw'}>
                <Menu 
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{minHeight: '100%' , background: SIDEBAR , color: TEXT}}

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
                  <SubMenu key="sub4" title="Chat"> 
                    <Menu.Item key="1"><NavLink to='/chat'>ChatPage</NavLink></Menu.Item> 
                  </SubMenu> 
                </Menu>
              </Sider>
              <Content style={{ minHeight: '85vh', background: CONTENT }}>
                  <Suspense fallback={<div><Preloader isFetching={false}/></div>}>
                      <Routes>
                          <Route  path="/" element={<Navigate to={'/profile'} /> } />
                          <Route  path="/dialogs/*" element={ <DialogsContainer />}/>
                          <Route  path="/profile/:userId" element={ <ProfilePage  />}/>
                          <Route  path='/profile' element={<ProfilePage />}/>
                          <Route  path="/developers" element={<UsersPage pageTitle={'Samurais'}/>}/>
                          <Route  path="/login" element={<LoginPage />}/>
                          <Route  path="/chat" element={<ChatPage />}/>
                          <Route  path="/settings" element={<Settings />}/>
                          <Route  path="/*" element={<Page404 />}/>

                    </Routes>
                </Suspense>
              </Content>
            </Layout>
          </Content>
        <Footer style={{ display: 'flex', background: HEADER,
                        color: TEXT, alignItems: 'center',height: '40px',
                        justifyContent: 'center' }}>
            Samurai Social Network ©2023 Created by IT-Kamasutra</Footer>
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