//引入express模块,并创建
const express = require('express')();
//引入body-parse解析请求主体
const bp = require('body-parser');

express.listen(8153);
express.use(bp.urlencoded({
    extended:false
}))
//引入sors模块
const cors = require('cors');
//跨域资源共享
express.use(cors({
    credentials:true,
    origin:["http://localhost:8080"]
}))

//调用session模块保存用户登录
const session = require('express-session');
//使用session存储用户信息
express.use(session({
    resave:true,
    saveUninitialized:false,
    secret:'hadpets',
    cookie:{
        maxAge:null
    }
}))

//调用用户模块
express.use('/user',require('./routes/user'));

