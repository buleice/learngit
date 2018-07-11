const mysql =require('mysql');

//连接池
let db=mysql.createPool({host:'localhost',user:'root',password:'18696188160',database:'20180101'});
//let db=mysql.createConnection({host:'localhost',user:'root',password:'18696188160',database:'20180101'});

// JavaScript Document