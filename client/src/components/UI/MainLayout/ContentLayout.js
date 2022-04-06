import { Layout } from 'antd';
const { Content, Footer } = Layout;

const ContentLayout = (props) => {
    return(
        <Layout className=''>
    
            <Content  className='main-layout__content'>
                {props.children}

            </Content>
            <Footer className='main-layout__footer'>Terminal Trends ©2022 Created by Jay Kaneriya</Footer>
        </Layout>
    )
}

export default ContentLayout;