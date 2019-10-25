
import React from 'react';
import ReactDOM from 'react-dom';
import './chrome.scrollbar.css';
import './dark.min.css';
import './index.css';
import { Layout, Menu, Icon } from 'antd';
import logo from './images/DiscountDiscordLogo.png'
import App from './App'

const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  
    <Layout>
      <Header style={{ background: '#222629', padding: 0, marginLeft: 'auto', marginRight: 'auto', height: '6rem'}}><img style={{ class: 'center' }} src={logo} /></Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2019 Created by Nicholas Farrell<div>
      <Icon href="https://github.com/nfarrell87" type="github" /> <a href="https://github.com/nfarrell87">Github</a>
      </div></Footer>
    </Layout>,
  document.getElementById('container'),
);