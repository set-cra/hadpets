#编译脚本时的编码
SET NAMES UTF8;

DROP DATABASE hadpets;

#创建数据库
CREATE DATABASE hadpets CHARSET=UTF8;

#使用该数据库
use hadpets;

DROP TABLE IF EXISTS userlog ;
#创建用户账号密码编号表
CREATE TABLE userlog(
    uid INT PRIMARY KEY AUTO_INCREMENT,#用户编号,自增
    uname VARCHAR(12) NOT NULL,#用户账号,不为空
    upwd VARCHAR(16) NOT NULL#用户密码,不为空
)
