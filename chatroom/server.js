const http=require('http');
const fs=require('fs');
const mysql=require('mysql');
const io=require('socket.io');
const url=require('url');

//数据库连接 池
let db=mysql.createPool({host:'localhost',user:'root',password:'18696188160',database:'20180101'});

//1.http服务
const httpServer=http.createServer((req,res)=>{
	let {pathname,query}=url.parse(req.url,true);
	
	if(pathname=='/reg'){
		//注册接口
		let  {username,password}=query;
		//1.校验数据
		if(!/^\w{6,32}$/.test(username)){
			res.write(JSON.stringify({code:1,msg:'用户名不符合规范'}));
			res.end();
		}else if(!/^.{6,32}$/.test(password)){
			res.write(JSON.stringify({code:1,msg:'密码不符合规范'}));
			res.end();
		}else{
			db.query(`select * from user_table where username='${username}'`,(err,data)=>{
				if(err){
					res.write(JSON.stringify({code:1,msg:'数据库出现错误'}));
					res.end();
				}else if(data.length>0){
					res.write(JSON.stringify({code:1,msg:'此用户名已存在'}));
					res.end();
				}else{
					//插入
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
		//2.校验用户名是否重复
		//3.插入数据
	}
	else if(req.url=='/login'){
		//登陆接口
	}else{
		fs.readFile(`www${req.url}`,(err,data)=>{
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
 