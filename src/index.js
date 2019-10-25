
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
      <Header style={{ background: '#222629', padding: 0, marginLeft: 'auto', marginRight: 'auto' }}><img style={{ height: '4rem', width: '20rem', class: 'center' }} src={logo} /></Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2019 Created by Nicholas and Corey <div>
        <p>{"<All That's Left>"}</p>
      </div></Footer>
    </Layout>,
  document.getElementById('container'),
);