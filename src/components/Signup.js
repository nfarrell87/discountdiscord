import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button } from 'antd';
import '../index.css'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Signup extends Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ username: e.target.value });
    }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        return (
            <div style={{ textAlign: 'center', marginTop: '4rem'}}>
                <h1>You must chose a username to join the chat!</h1>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" />}
                                name="username"
                                placeholder="Username"
                                onChange={this.handleChange}
                                className="input"
                            />,
                        )}
                    </Form.Item>
                    <br></br>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="submit" disabled={hasErrors(getFieldsError())}>
                            Start Chatting!
              </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedSignup = Form.create({ name: 'horizontal_login' })(Signup);

ReactDOM.render(<WrappedSignup />, document.getElementById('container'));

export default WrappedSignup;