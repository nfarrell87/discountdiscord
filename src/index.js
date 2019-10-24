
import React from 'react';
import ReactDOM from 'react-dom';
import './chrome.scrollbar.css';
import './dark.min.css';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
import logo from './images/DiscountDiscordLogo.png'
//Components
import MsgInput from './components/MsgInput'
import App from './App'

const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">Chat Room 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">Chat Room 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">Chat Room 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text">Chat Room 4</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#222629', padding: 0, marginLeft: 'auto', marginRight: 'auto' }}><img style={{ height: '4rem', width: '20rem', class: 'center' }} src={logo} /></Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2019 Created by Nicholas and Corey <div>
        <p>{"<All That's Left>"}</p>
      </div></Footer>
    </Layout>
  </Layout>,
  document.getElementById('container'),
);