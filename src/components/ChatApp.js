import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { List, message, Avatar, Spin, Layout } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import WhosOnlineList from './OnlineListener'
import WrappedInput from './MsgInput';
import logo from '../images/DiscountDiscordLogo.png'
import '../index.css'
import App from '../App'

const { Header, Content, Footer, Sider } = Layout;

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      users: [],
      loading: false,
      hasMore: true,
    };
    this.addMessage = this.addMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  };
  addMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
      .catch(error => console.error('error', error));
  };
  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.scrollToBottom();
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:88f9c290-214e-48d1-b9b6-ac34bd67a7d3",
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/88f9c290-214e-48d1-b9b6-ac34bd67a7d3/token"
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId: "d08e7e34-8532-43b2-8991-c9919f23977d",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          }
        })
      })
      .then(currentRoom => {
        this.setState({
          currentRoom,
          users: currentRoom.userIds
        })
      })
      .catch(error => console.log(error))
  };

  handleInfiniteOnLoad = () => {
    let { messages } = this.state;
    this.setState({
      loading: true,
    });
    if (messages.length > 14) {
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      messages = messages.concat(res.results);
      this.setState({
        messages,
        loading: false,
      });
    });
  };
  render() {
    return (
      <div>
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
          <h1 style={{ textAlign: 'center'}} >Chilln Members</h1><hr></hr>
          <WhosOnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </Sider>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="demo-infinite-container">
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}>
                <List
                  dataSource={this.state.messages}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar icon="user" />}
                        title={<a href="https://ant.design">{item.senderId}</a>}
                        description={item.text} />
                      <div>sent on 10/20/2019 at 00:00</div>
                    </List.Item>
                  )}>
                </List>
            <div style={{ float: "left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
              </InfiniteScroll>
            </div>
            <WrappedInput className="input-field" onSubmit={this.addMessage} />
            </Content>
            </Layout>
            </div>
        )
      }
    }
export default ChatApp;