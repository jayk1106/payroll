import { useContext } from 'react';
import { WalletOutlined, UserOutlined, TeamOutlined, LoginOutlined , DashboardOutlined, LineChartOutlined, StockOutlined, SwapOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import authContext from '../../../context/auth/authContext';
import Icon from '../../UI/Icon/Icon';
const { Sider } = Layout;
const SideMenu = () => {
    const { logout } = useContext(authContext);

    const confirm = () => {
        Modal.confirm({
          title: 'Log Out',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure, you want to logout?',
          okText: 'Log Out',
          cancelText: 'Cancel',
          onOk() {
            Modal.destroyAll();
            logout();
          }
        });
    }

    const currPath =  window.location.pathname;
    return(
        <Sider
            className='main-layout__aside'
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            width='300'
            >
            <div className="logo">Terminal Trends</div>
            <Menu mode="inline" defaultSelectedKeys={['4']} style={{width:'300px' , paddingLeft : '30px', fontSize:'17px'}} className='main-layout__menu'>
                <Menu.Item key="1" icon={<Icon active={ currPath === '/dashboard' ? true : false}><DashboardOutlined style={{fontSize:'18px'}} /></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Dashboard
                </Menu.Item>
                <Menu.Item key="2" icon={<Icon active={currPath === '/employees' ? true : false}><TeamOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Employees
                </Menu.Item>
                <Menu.Item key="3" icon={<Icon active={false}><WalletOutlined style={{fontSize:'18px'}} /></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Salary
                </Menu.Item>
                <Menu.Item key="5" icon={<Icon active={false}><SwapOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Requests 
                </Menu.Item>
                <Menu.Item key="6" icon={<Icon active={false}><StockOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Loan
                </Menu.Item>
                <Menu.Item key="7" icon={<Icon active={false}><StockOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Credits
                </Menu.Item>
                <div className="sub-heading">Account Pages</div>
                <Menu.Item key="8" icon={<Icon active={false}><UserOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Profile
                </Menu.Item>
                <Menu.Item key="9" icon={<Icon active={false}><LineChartOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Activity
                </Menu.Item>
                <Menu.Item key="10" onClick={confirm} icon={<Icon active={false}><LoginOutlined style={{fontSize:'18px'}}/></Icon>} className='main-layout__menu-item' style={{width:'200px' , height:'50px'}}>
                Log Out
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideMenu;