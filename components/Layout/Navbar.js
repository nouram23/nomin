import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined 
} from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

export default function Navbar(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => { setCollapsed(collapsed => !collapsed) }

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Home page', '1', <PieChartOutlined />),
    getItem('Vendor page', '2', <DesktopOutlined />),
    getItem('User page', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];
  return (<>
    <Layout
      style={{
        minHeight: '79vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo'></div>
        {/* <Menu theme="" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={()=>{alert(event.target.value)}} /> */}
        <Menu defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item key="1">
            <Link href="/">
              {collapsed ? <HomeOutlined /> : <a>Нүүр хуудас</a>}
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/first-order" ellipsis={true} >
              {collapsed ? <PieChartOutlined /> : <a > Анхны захиалга</a>}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 8,
            paddingLeft: 24
          }}
        >
          <Image src='/nomin-logo.png' height={30} width={172} />
        </Header>
        <Content
          // style={{
          //   margin: '0 8px',
          // }}
          >
          <Breadcrumb className='m-4'
            // style={{
            //   margin: '16px 0',
            // }}
          >
            <Breadcrumb.Item>Нүүр</Breadcrumb.Item>
            <Breadcrumb.Item>Анхны захиалгын жагсаалт</Breadcrumb.Item>
          </Breadcrumb>
          <Row justify="center" style={{ minHeight: '79vh' }}>
            <Col className="content" span={23}>{props.children}</Col>
          </Row>

        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          ©2022 Created by Nomin
        </Footer>
      </Layout>
    </Layout>
  </>)
}
