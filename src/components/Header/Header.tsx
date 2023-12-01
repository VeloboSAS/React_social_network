import {FC} from "react"
import {Link} from 'react-router-dom'
import { Avatar, Col, Menu, Row, Layout, Button } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { AppDispatch, AppStateType } from "../../Redux/redux-store";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserLogin, selectIsAuth } from "../../Redux/usersSelectors";
import { logout } from "../../Redux/Reducers/authReducer";


export type MapPropsType = {
    // isAuth: boolean
    // login: string | null
}

// export type DispatchPropsType = {
//     logout: () => void
// }
export const Header: FC<MapPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }


    const { Header } = Layout
    return (
            <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Row>
                <Col span={6}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                    <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item> 
                </Menu>
                </Col>
                { isAuth
                ? <>   <Col span={1} ><Avatar icon={<UserOutlined />} /></Col>
                        <Col span={5} ><Button  
                        onClick={logoutCallBack}>Log Out</Button></Col>
                    </>
                        :   <Col span={6} >
                                <Button>
                                    <Link to={'/login'}>Login</Link>
                                </Button>
                            </Col>
                            }
            </Row>
            </Header>

    )  }
