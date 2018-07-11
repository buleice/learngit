const http=require('http');
const fs=require('fs');
const mysql=require('mysql');
const io=require('socket.io');
const url=require('url');
const regs=require('./libs/regs'); 
//数据库连接 池
let db=mysql.createPool({host:'localhost',user:'root',password:'18696188160',database:'20180101'});

//1.http服务
const httpServer=http.createServer((req,res)=>{
	let {pathname,query}=url.parse(req.url,true);
	
	if(pathname=='/reg'){
		//注册接口
		let  {username,password}=query;
		//1.校验数据
		if(!regs.username.test(username)){
			res.write(JSON.stringify({code:1,msg:'用户名不符合规范'}));
			res.end();
		}else if(!regs.password.test(password)){
			res.write(JSON.stringify({code:1,msg:'密码不符合规范'}));
			res.end();
		}else{//2.校验用户名是否重复
			db.query(`select ID from user_table where username='${username}'`,(err,data)=>{
				if(err){
					res.write(JSON.stringify({code:1,msg:'数据库出现错误'}));
					res.end();
				}else if(data.length>0){
					res.write(JSON.stringify({code:1,msg:'此用户名已存在'}));
					res.end();
				}else{
					////3.插入数据
					db.query(`INSERT INTO user_table(username,password,online) VALUES('${username}','${password}',0)`,err=>{
						if(err){
							res.write(JSON.stringify({code:1,msg:"数据库有错"}));
							res.end();
						}else{
							res.write(JSON.stringify({code:0,msg:"注册成功"}));
							res.end();
						}
					});
					
				}
			})
		}
		
		
	}
	else if(pathname=='/login'){
		//登陆接口
		let {username,password}=query;
		//1.校验数据
		if(!regs.username.test(username)){
			res.write(JSON.stringify({code:1,msg:'用户名不符合规范'}));
			res.end();
		}else if(!regs.password.test(password)){
			res.write(JSON.stringify({code:1,msg:'用户密码不符合规范'}));
			res.end();
		}else{
		//2.读取数据
			db.query(`SELECT ID,password FROM user_table where username='${username}'`,(err,data)=>{
				if(err){
					res.write(JSON.stringify({code:1,msg:'数据库错误'}));
					res.end();
				}else if(data.length==0){
					res.write(JSON.stringify({code:1,msg:'此用户名不存在'}));
					res.end();
				}else if(data[0].password!=password){
					res.write(JSON.stringify({code:1,msg:'用户名或密码错误'}));
					res.end();
				}else{
					db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`,err=>{
						if(err){
							res.write(JSON.stringify({code:1,msg:"数据库有错"}));
							res.end();
						}else{
							res.write(JSON.stringify({code:0,msg:"登录成功"}));
							res.end();
						}
					})
				}
			})
		}
	}else{
		fs.readFile(`www${pathname}`,(err,data)=>{
		if(err){
			res.writeHeader(404);
			res.write("NOT FOUND");
		}else{
			res.write(data);
		}
		res.end();
	});
	}
	
});
httpServer.listen(8080);

//2.ws服务
const wsServer=io.listen(httpServer);
wsServer.on('connection',sock=>{
	sock.on('a',function(n1,n2,n3,n4,n5){
		console.log(n1,n2);
	})
})
 