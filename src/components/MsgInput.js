import React, { Component } from 'react';
import { Button, Input, Form, Icon } from 'antd';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
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
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const msginputError = isFieldTouched('msginput') && getFieldError('msginput');
        return (
            <div className="msgDiv">
            <Form onSubmit={this.handleSubmit} className="input-field">
                <Form.Item validateStatus={msginputError ? 'error' : ''} help={msginputError || ''}>
                    {getFieldDecorator('msginput', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="message" />}
                            placeholder="Type here to send a message to the current chat room!"
                            name="msginput"
                            onChange={this.handleChange}
                            value={this.state.message}
                            suffix={<Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Send</Button>}
                        />,
                        )}
                </Form.Item>
            </Form>
            </div>
        )
    }
}

const WrappedInput = Form.create({ name: 'horizontal_login' })(MsgInput);

export default WrappedInput;