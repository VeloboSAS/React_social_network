import {FC} from "react"
import {Link} from 'react-router-dom'
import { Avatar, Col, Menu, Row, Layout, Button } from "antd"
import { UserOutlined } from '@ant-design/icons'
import { AppDispatch} from "../../Redux/redux-store"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserLogin, selectIsAuth } from "../../Redux/usersSelectors"
import { logout } from "../../Redux/Reducers/authReducer"

export const HEADER = '#2A1B3D'
export const TEXT = '#A4B3B6'


export const Header: FC = () => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }
    const { Header } = Layout
    return (
            <Header style={{backgroundColor: HEADER, color: TEXT, width: '100%', height: 'auto'}}>
                <Row>
                    <Col  span={5}>
                        <Menu style={{backgroundColor: HEADER, color: 'white'}} mode="horizontal" defaultSelectedKeys={['1']} >
                            <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item> 
                        </Menu>
                    </Col>
                    <Col span={6} offset={13} style={{ paddingLeft: '50px'}}>
                    { isAuth?  <>
                
                    <Avatar style={{marginRight: '20px'}} icon={<UserOutlined />} />
                                {login}<Button style={{marginLeft: '10px'}} type="primary" onClick={logoutCallBack}>Log Out</Button>
                                </>
                         :  
                                    <Button style={{ marginLeft: '120px'}} type="primary">
                                        <Link to={'/login'}>Login</Link>
                                    </Button>}
                    </Col>

                 </Row>
            </Header>

    )  }
