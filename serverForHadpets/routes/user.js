const express= require('express');

const router = express.Router();

router.post('/logup',(req,res)=>{
    let {uname,upwd} = req.body;
    console.log(uname,upwd);
    res.send({code:1});
})

module.exports=router;