//引入express模块,并创建
const express = require('express')();
//引入body-parse解析请求主体
const bp = require('body-parser');

express.listen(8153);
express.use(bp({
    extended:false
}))
//引入sors模块
const cors = require('cors');
//跨域资源共享
express.use(cors({
    credentials:true,
    origin:["http://176.18.8.111:8080"]
}))

//调用用户模块
express.use('/user',require('./routes/user'));

