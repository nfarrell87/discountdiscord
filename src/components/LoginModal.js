// import React, {Component} from 'react';
// import { Modal, Button } from 'antd';

// class LoginModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleChange(e) {
//         this.setState({ username: e.target.value });
//     }
//     handleSubmit(e) {
//         e.preventDefault()
//         this.props.onSubmit(this.state.username);
//     }
//     state = { visible: false };

//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };

//     handleOk = e => {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     };

//     handleCancel = e => {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     };

//     render() {
//         return (
//             <div>

//                 <Button type="primary" onClick={this.showModal}>
//                     Login
//         </Button>
//                 <Modal
//                     title="Basic Modal"
//                     visible={this.state.visible}
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                 >
//                     <Form onSubmit={this.handleSubmit} className="login-form">
//                         <Form.Item>
//                             {getFieldDecorator('username', {
//                                 rules: [{ required: true, message: 'Please input your username!' }],
//                             })(
//                                 <Input
//                                     prefix={<Icon type="user" name="username" onChange={this.handleChange} className="input" />}
//                                     placeholder="Username" />,
//                             )}
//                         </Form.Item>
//                         <Form.Item>
//                             {getFieldDecorator('remember', {
//                                 valuePropName: 'checked',
//                                 initialValue: true,
//                             })(<Checkbox>Remember me</Checkbox>)}
//                             <a className="login-form-forgot" href="">
//                                 Forgot password</a>
//                             <Button type="primary" htmlType="submit" className="login-form-button submit">
//                                 Log in</Button>
//                             Or <a href="">register now!</a>
//                         </Form.Item>
//                     </Form>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export default LoginModal;