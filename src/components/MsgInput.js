import React, { Component } from 'react';
import { Button, Input, Form, Icon } from 'antd';

const { TextArea } = Input;
class MsgInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
        if (this.props.onChange) {
            this.props.onChange()
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({
            message: ' '
        })
    }

    render() {
        return (

            <div className="msgDiv">
                <Form onSubmit={this.handleSubmit} className="input-field">
                    <Form.Item>
                        <TextArea rows={1}
                            type="text"
                            prefix={<Icon type="message" />}
                            placeholder="Type a message here and press ENTER to send!"
                            onChange={this.handleChange}
                            onPressEnter={this.handleSubmit}
                            value={this.state.message}
                            autoSize={{ minRows: 1, maxRows: 6 }}
                        />
                    </Form.Item>

                </Form>
            </div>
        )
    }
}

const WrappedInput = Form.create({ name: 'horizontal_login' })(MsgInput);

export default WrappedInput;