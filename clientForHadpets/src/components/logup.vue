<template>
   <section class="section">
        <input class="item" ref="uname" :class="{error:booluname}"  @input ="check('uname')" type="text" placeholder="请输入8-12位数字、字母或下划线组成的账号">
        <span class="warning-text" :class="booluname?'warning-text-err':'warning-text-ok'">{{unameWarning}}</span>
        <input class="item" :class="{error:boolupwd}"   @input ="check('upwd')" type="password" placeholder="请输入8-16位数字、字母或下划线组成的密码">
        <input class="item" :class="{error:boolcheckupwd}"   @input ="check('checkupwd')" type="password" placeholder="请重复输入您设置的密码">
        <div class="check-container">
            <input class="check" :class="{error:boolcheck}"  ref="check"  @input ="check('check')" type="text" placeholder="点击右侧获取验证码">
            <canvas ref="canvas" style="width:40%;height:3rem;display:inline-block;border:1px solid #888;" @touchend="checkCanvas"></canvas>
        </div>
        <div class="nav">
            <span class="help gt" @touchstart.prevent="tologin">已经有账号了?点击前往登录</span>
            <button class="btn" @touchend="logup" :class="{disabled:uname==''||upwd==''||!checkv||!checkupwd}">注册</button>
        </div>
        <my-warning v-if="context!=''" :context="context"></my-warning>
    </section>
</template>

<script>
import { nextTick } from 'q';
import qs from 'qs';
import { setInterval, clearInterval } from 'timers';
export default {
     data() {
        return {
            value:'',
            uname:'',
            upwd:'',
            checkv:false,
            checkupwd:false,
            booluname:false,
            boolupwd:false,
            boolcheckupwd:false,
            boolcheck:false,
            context:'',
            unameWarning:''
        }
    },
    methods:{
        checkCanvas(){
            //当页面显示注册时.绘画验证码
            if(!this.log){
                //获取画布
                let {canvas} = this.$refs;
                //创建画笔
                let context = canvas.getContext("2d");
                //清空画布
                context.clearRect(0,0,1000,1000);
                //开始画画
                let width=278;
                let i=0;
                //获取数字验证码
                this.value=this.canvasValue();
                //随机生成数字样式
                for(let key of this.value){
                    context.fillStyle = `#${parseInt(Math.random()*16).toString(16)}${parseInt(Math.random()*16).toString(16)}${parseInt(Math.random()*16).toString(16)}`;
                    context.font = "bold "+(56+Math.random())+"px 宋体"; //字体样式
                    context.textAlign = "statr"; //对齐方式为左对齐
                    context.textBaseline = "top"; //基线
                    context.fillText(key, parseInt(Math.random()*(width/4)+width/4*i++), Math.random()*parseFloat( document.documentElement.style.fontSize)*2, 2000);
                }
                //验证码框值不为空时,验证码是否一致
                let target = this.$refs.check;
                if(target.value==''){return}
                if(target.value==this.value.join('')){
                    this.checkv=true;
                    target.removeAttribute("style");
                }else{
                    this.checkv=false;
                    target.style="outline:2px solid red;border:none;margin-top:4px;"
                }
            }else{
                return;
            }
        },
        canvasValue(){
            let arr=[];
            for(let key of new Array(4).keys())
                arr.push(Math.floor(Math.random()*10));
            return arr;
        },
        tologin(){
            this.$router.replace("/log/in")
        },
        logup(){
            let {uname,upwd,checkv,checkupwd} = this;
            let {target} = event;
            if(uname==''||upwd==''||!checkv||!checkupwd){
                return
            }
            if(target.innerText=="注册中..."){
                return;
            }
           target.innerText="注册中...";
            this.$axios.post('/user/logup',qs.stringify({
                uname,upwd
            })
            ).then(res=>{
                if(res.data.code==1){
                    target.innerText="注册";
                    this.context="注册成功";
                    this.$store.commit("login",res.data.uid);
                    console.log(res.data.uid)
                    let timer=setInterval(()=>{
                        this.context='';
                        this.$router.push('/afterlogup');
                        clearInterval(timer);
                    },1000);
                }
            }).catch(err=>console.log(err));
        },
        check(str){
            let {target} = event;
            let {value}=target;
            let re={
                "uname":new RegExp(/^[\w]{6,12}$/),
                "upwd":new RegExp(/^[\w]{8,16}$/)
            }
            if(str in re){
                if(re[str].test(value)){
                    if(str=="uname"){
                        this.unameWarning='';
                        this.$axios.post('/user/logcheck',qs.stringify({
                            str,value
                        })).then(res=>{
                            if(res.data.code==1){
                                this.unameWarning='用户名可用';
                                this[str]=value;
                                this.booluname=false;
                            }else{
                                this.unameWarning='用户名已存在'
                                this.booluname=true;
                            }
                        }).catch(err=>console.log(err));
                    }else{
                        this[str]=value;
                        this['bool'+str]=false;
                    }
                }else{
                    this['bool'+str]=true;
                }
            }else if(str=="checkupwd"){
                if(target.value==this.upwd){
                    this.checkupwd=true;
                    this['bool'+str]=false;
                }else{
                    this.checkupwd=false;
                    this['bool'+str]=true;
                }
            }else if(str == 'check'){
                if(target.value==this.value.join('')){
                    this.checkv=true;
                    this['bool'+str]=false;
                }else{
                    this.checkv=false;
                    this['bool'+str]=true;
                }
            }
        }
    },
    mounted(){
        nextTick(
            ()=>{
                this.$refs.uname.focus();
            }
        )
    },
    components:{
        "my-warning":()=>import('./warning')
    }
}
</script>

<style lang="scss" scoped>
    $background:#f20000;
    $word-color:#fff;
    .section{
        margin-top: 2rem;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .item{
            width: 90%;
            border:none;
            outline: none;
            border-bottom: 0.1rem solid #777;
            line-height: 2rem;
            font-size: 0.7rem;
            margin-bottom: 0.4rem;
            padding-left: 0.2rem;
            margin-top:4px;
        }
        .error{
            outline:2px solid red;
            border-color:transparent;
        }
        .check-container{
            width: 90%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.1rem solid #777;
            input{
                width: 50%;
                line-height: 2rem;
                font-size: 0.7rem;
            }
        }
        .nav{
            width: 100%;
            position: relative;
            height: 4rem;
            .help{
                line-height: 1rem;
                font-size: 0.6rem;
                position: absolute;
                margin: 0.4rem 0;
                background: #fff;
                &.gt{
                    right: 0;
                }
            }
            .btn{
                width: 100%;
                height: 2.5rem;
                outline: none;
                border: none;
                background: $background;
                color: $word-color;
                border-radius: 0.4rem;
                margin-top: 1.6rem;
                font-size: 0.8rem;
                &.disabled{
                    background: #777;
                }
            }
        }
        .warning-text{
            display: block;
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.4rem;
            align-self: flex-start;
            margin-left: 5%;
        }
        .warning-text-ok{
            color: green;
        }
        .warning-text-err{
            color: red;
        }
    }
</style>