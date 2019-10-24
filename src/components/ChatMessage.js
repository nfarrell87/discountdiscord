import React, { Component } from 'react';
import { Button } from 'antd';

class  ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }
    changeView() {
        this.props.changeView('signup')
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.changeView}>Send a message</Button>
            </div>
        )
    }
}
export default ChatMessage;