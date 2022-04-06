import { Layout } from 'antd';

import SideMenu from './SideMenu';
import ContentLayout from './ContentLayout';

const MainLayout = (props) => {
    return(
        <Layout className='main-layout'>
            <SideMenu/>
            <ContentLayout>{props.children}</ContentLayout>
        </Layout>
    )
}

export default MainLayout;