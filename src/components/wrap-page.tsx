import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import './index.css'
const { Header, Content, Footer } = Layout

const WrapPage = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => {
  const listMenu = [{ label: 'Home', url: '/' }]
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          {listMenu.map((el, idx) => (
            <Menu.Item key={idx + 1}>
              <span>{el.label}</span>
              <Link to={el.url} />
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default WrapPage
