const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const io = require('socket.io');
const url = require('url');
const logins = require('./libs/logins');
//数据库连接 池
let db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '18696188160',
	database: '20180101'
});

//1.http服务
let httpServer = http.createServer((req, res) => {
	fs.readFile(`www${req.url}`, (err, data) => {
		if(err) {
			res.writeHeader(404);
			res.write('NOT FUOND');
		} else {
			res.write(data);
		}
		res.end();
	})
});
httpServer.listen(8080);

//ws服务
let aSock = [];
let wsServer = io.listen(httpServer);
wsServer.on('connection', sock => {
	aSock.push(sock);
	let cur_username = '';
	let cur_userId = 0;
	//注册
	sock.on('reg', (username, password) => {
		//1.校验数据
		if(!logins.username.test(username)) {
			sock.emit('reg_ret', 1, '用户名不符合规范')
		} else if(!logins.password.test(password)) {
			sock.emit('reg_ret', 1, '用户密码不符合规范')
		} else {
			//判断用户名是否存在
			db.query(`select ID from user_table where username='${username}'`, (err, data) => {
				if(err) {
					sock.emit('reg_ret', 1, '数据库操作错误')
				} else if(data.length > 0) {
					sock.emit('reg_ret', 1, '用户名已存在')
				} else {
					////3.插入数据
					db.query(`INSERT INTO user_table(username,password,online) VALUES('${username}','${password}',0)`, err => {
						if(err) {
							sock.emit('reg_ret', 1, '数据库操作失败')
						} else {
							sock.emit('reg_ret', 0, '注册成功')
						}
					});

				}
			})

		}
	});
	sock.on('login', (username, password) => {
		//1.校验数据
		if(!logins.username.test(username)) {
			sock.emit('login_ret', 1, '用户名不符合规范')
		} else if(!logins.password.test(password)) {
			sock.emit('login_ret', 1, '用户密码不符合规范')
		} else {
			//判断用户名是否存在
			db.query(`select * from user_table where username='${username}'`, (err, data) => {
				if(err) {
					sock.emit('login_ret', 1, '数据库操作错误')
				} else if(data.length == 0) {
					sock.emit('login_ret', 1, '用户名不存在')
				} else if(data[0].password != password) {

					sock.emit('login_ret', 1, '用户名或密码错误')
				} else {
					////3.更新状态
					db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`, err => {
						if(err) {
							sock.emit('login_ret', 1, '数据库操作失败')
						} else {
							sock.emit('login_ret', 0, '登录成功');
							cur_username = username;
							cur_userId = data[0].ID;
						}
					});

				}
			})

		}
	});
	//发言
	sock.on('msg', txt => {
		if(!txt) {
			sock.emit('msg_ret', 1, '消息文本不能为空');
		} else {
			//广播给所有人
			aSock.forEach(item => {
				if(item == sock) {return};
				item.emit('msg_radio',cur_username, txt);
			});
			sock.emit('msg_ret',0,'发送成功');
		}
	})
	sock.on('disconnect', () => {
		db.query(`UPDATE user_table SET online=0 WHERE ID=${cur_userId}`, err => {
			if(err) {
				console.log('数据库有错', err);
			}

			cur_username = '';
			cur_userId = 0;
			aSock.filter(item => item != sock);
		})
	});

})