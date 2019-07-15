const express= require('express');
const pool = require('../pool');
const router = express.Router();


router.post('/logup',(req,res)=>{
    let {uname,upwd} = req.body;
    if(!(uname&&upwd)){
        res.send({code:-1,message:"不能存在空值"});
        return;
    }
    if(uname.length<8&&uname.length>12){
        res.send({code:-1,message:"用户名格式不正确"});
        return;
    }
    if(upwd.length<8&&upwd.length>16){
        res.send({code:-1,message:"密码格式不正确"});
        return;
    }
    pool.query('INSERT INTO userlog SET ?',[req.body],(err,result)=>{
        if(err) console.log(err);
        pool.query('SELECT uid FROM userlog WHERE uname=? AND upwd=?',[uname,upwd],(err,result)=>{
            console.log(result.uid);
        })
        res.send({code:1,message:"注册成功"});
    })
});
router.post('/logcheck',(req,res)=>{
    let {str,value} = req.body;
    if(!(str&&value)){
        res.send({code:-1,message:"不能存在空值"})
        return;
    }
    try{
        pool.query(`SELECT uid FROM userlog WHERE ${str}='${value}'`,(err,result)=>{
            if(err) console.error(err);
            if(result.length==0){
                res.send({code:1,message:"可用"});
            }else{
                res.send({code:-1,message:"已存在"})
            }
        })
    }catch(err){
        res.send({code:-1,message:"参数错误"});
    }
});
router.post('/login',(req,res)=>{
    let {uname,upwd} = req.body;
    if(!(uname&&upwd)){
        res.send({code:-1,message:"不能存在空值"});
        return;
    }
    pool.query("SELECT uid from userlog WHERE uname=? AND upwd=?",[uname,upwd],(err,result)=>{
        if(err) console.log (err);
        if(result.length==0){
            res.send({code:-1,message:"用户名或密码错误"})
        }else{
            let uid = result[0].uid;
            req.session.uid=uid;
            req.session.cookie.maxAge=null;
            res.send({
                code:1,
                message:"登陆成功",
                data:{
                    uid
                }
            })
        }
    })
});
router.post('/islogin',(req,res)=>{
    let uid = req.session.uid;
    if(uid){
        res.send({code:1,message:'用户已登录',uid});
    }else{
        res.send({code:-1,message:'用户未登录'});
    }
})
router.post('/logout',(req,res)=>{
    req.session.cookie.maxAge=0;
    res.send({code:1,message:"已退出"})
})



module.exports=router;