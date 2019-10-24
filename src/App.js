import React, { Component } from 'react';
import ChatMessage from './components/ChatMessage';
import Signup from './components/Signup';
import ChatApp from './components/ChatApp';
import './index.css';

//Chatkit
import { default as Chatkit } from '@pusher/chatkit-server';
const chatkit = new Chatkit ({
  instanceLocator: "v1:us1:88f9c290-214e-48d1-b9b6-ac34bd67a7d3",
  key: "46507efb-3875-4fa3-aae9-aefe74cf7434:G07c65AqeHC4ceKyDJ2kgANr80iIZNTAjHb+xef/kpY="
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser(username) {
    chatkit.createUser({
      id: username,
      name: username,
    })
    .then((currentUser) => {
      this.setState ({
        currentUsername: username,
        currentId: username,
        currentView: 'chatApp'
      })
    }).catch((err) => {
      if(err.status === 400) {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      } else {
        console.log(err.status);
      }
    })
  }

  changeView(view) {
    this.setState({
      currentView: view
    })
  }

  render() {
    let view = '';
    if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage changeView={this.changeView} />
    } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser}/>
    } else if (this.state.currentView === "chatApp") {
      view = <ChatApp currentId={this.state.currentId} />
    }
    return (
      <div className="App">
        {view}
      </div>
    );
  }
}
export default App;