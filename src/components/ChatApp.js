import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import WrappedInput from './MsgInput';
import '../index.css'

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentRoom: { users: [] },
      messages: [],
      users: [],
      loading: false,
      hasMore: true,
    };
    this.addMessage = this.addMessage.bind(this);
  };
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
        this.setState({ currentUser: currentUser })
        return currentUser.subscribeToRoom({
          roomId: "d08e7e34-8532-43b2-8991-c9919f23977d",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
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
  addMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
      .catch(error => console.error('error', error));
  };
  handleInfiniteOnLoad = () => {
    let { messages } = this.state;
    this.setState({
      loading: true,
    });
    if (messages.length > 14) {
      message.warning('Infinite List loaded all');
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
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.messages}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.senderId}</a>}
                    description={item.text}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>

          <div style={{ float: "left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <WrappedInput className="input-field" onSubmit={this.addMessage} /></div>
    )
  }
}
export default ChatApp;