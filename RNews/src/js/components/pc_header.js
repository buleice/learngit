// JavaScript Document
import React from 'react';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, CheackBox, Button, Modal, Avatar, Badge } from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
//var PCHeaderCss =require("../../css/pc_header.css")
class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible:false,
			action:'login',
			hasLogined:false,
			userNickName:"默认用户名",
			userid: 0
		};
	};
	componentWillMount(){
		console.log('WillMount');
		if(localStorage.userId=!''){
		    console.log(1);
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userId})
		}
	};
	setModalVisible(value){
		this.setState({modalVisible:value});
	};
	handleClick(e){
		if(e.key=="register"){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}else{
				this.setState({current:e.key});
		}
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
			console.log(json)
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
	callBack(key){
		if(key==1){
			this.setState({action:'login'})
		}else if(key==2){
			this.setState({action:'register'})
		}
	};
	logOut(){
		localStorage.userId='';
		localStorage.userNickName='';
		this.setState({hasLogined:false});
	};
	render() {
	 const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,getFieldProps } = this.props.form;
	 const userShow = this.state.hasLogined
		?   <Menu.Item key="logout" class="register">
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
				<Link target="_blank" to={`/usercenter`}>
					<span style={{ marginRight: 24 }}>
				      <Badge count={0}><Avatar shape="square" icon="user" /></Badge>
				   </span>
				</Link>
				&nbsp;&nbsp;
				<Button type="ghost" htmlType="button" onClick={this.logOut.bind(this)}>退出</Button>
			</Menu.Item>
		: <Menu.Item key="register" class="register">
			<Icon type="appstore"/>注册/登录
		</Menu.Item>;

		return(
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={3}>
						<a href="/" className="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>RNews</span>
						</a>
					</Col>
					<Col  span={18}>
							<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							   <Menu.Item key="top">
								 		<Icon type="appstore"/> 头条
								 </Menu.Item>
								 <Menu.Item key="shehui">
										<Icon type="appstore"/> 社会
								 </Menu.Item>
								 <Menu.Item key="guonei">
										<Icon type="appstore"/> 国内
								 </Menu.Item>
								 <Menu.Item key="guoji">
										<Icon type="appstore"/> 国际
								 </Menu.Item>
								 <Menu.Item key="yule">
										<Icon type="appstore"/> 娱乐
								 </Menu.Item>
								 <Menu.Item key="tiyu">
										<Icon type="appstore"/> 体育
								 </Menu.Item>
								 <Menu.Item key="keji">
										<Icon type="appstore"/> 科技
								 </Menu.Item>
								 <Menu.Item key="shishang">
										<Icon type="appstore"/> 时尚
								 </Menu.Item>
								   {userShow}
							</Menu>
							<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
								<Tabs type="card"  onChange={this.callBack.bind(this)}>
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
					</Col>
					<Col span={1}></Col>
				</Row>
			</header>
		)
	}
}
export default PCHeader=Form.create()(PCHeader)//使用Form需要进行二次封装
