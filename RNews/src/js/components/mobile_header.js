import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Row, Col, Menu, Icon, Tabs, message, Form, Input, CheackBox, Button, Modal } from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: "",
			userid: 0
		};
	};
	setModalVisible(value) {
		this.setState({
			modalVisible: value
		});
	};
	handleClick(e) {
		if(e.key == "register") {
			this.setState({
				current: 'register'
			});
			this.setModalVisible(true);
		} else {
			{
				this.setState({
					current: e.key
				});
			}
		}
	};
	login() {
		this.setModalVisible(true);
	};
	handleSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
   		var formData=this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword,myFetchOptions).
		then(response=>response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
			localStorage.userId= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if(this.state.action=="login"){
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
  }
	callBack(key) {
		if(key == 1) {
			this.setState({
				action: 'login'
			});
		} else if(key == 2) {
			this.setState({
				action: 'register'
			});
		}
	};

	render() {
		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched,
			getFieldProps
		} = this.props.form;
		const userShow = this.state.hasLogined ?
			<Router>
				<
				Link to={`/usercenter`}>
				<
				Icon type = "inbox" / >
				<
				/Link>
			</Router>
			:
			<
			Icon type = "setting"
		onClick = {
			this.login.bind(this)
		}
		/>
		return(
			<div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>R News</span>
					{userShow}
        </header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
					<Tabs type="card" onChange={this.callBack.bind(this)}>
					<TabPane tab="登录" key="1">
						<Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="账户">
								{getFieldDecorator('userName')(
									<Input placeholder="请输入您的账号"/>
								)}
							</FormItem>
							<FormItem  label="密码">
								{getFieldDecorator('password')(
									<Input type="password" placeholder="请输入您的密码" />
								)}
							</FormItem>
							<Button type="primary" htmlType="submit" >登录</Button>
						</Form>
					</TabPane>
						<TabPane tab="注册" key="2">
							<Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('r_userName')(
										<Input placeholder="请输入您的账号"/>
									)}
								</FormItem>
								<FormItem  label="密码">
									{getFieldDecorator('r_password')(
										<Input type="password" placeholder="请输入您的密码" />
									)}
								</FormItem>
								<FormItem label="确认密码">
									{getFieldDecorator('r_confirmPassword')(
										<Input type="password" placeholder="请输入您的密码" />
									)}
								</FormItem>
								<Button type="primary" htmlType="submit" >注册</Button>
							</Form>
						</TabPane>
					</Tabs>
			</Modal>
      </div>
		);
	};
}
export default MobileHeader = Form.create()(MobileHeader)
