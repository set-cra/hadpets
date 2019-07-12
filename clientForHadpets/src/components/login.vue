<template>
    <section class="section">
        <input  class="item"  ref="uname" v-model="unameValue" type="text" placeholder="请输入您的用户名">
        <input  class="item" type="password" v-model="upwdValue" placeholder="请输入您的密码">
        <div class="nav">
            <label>
                <span class="help">忘记密码?</span>
                <span class="help gt" @touchend.prevent="tologup">还没有账号?点击前往注册</span>
            </label>
            <button class="btn" @touchend="login">{{btnText}}</button>
        </div>
        <my-warning v-if="context!=''" :context="context"></my-warning>
    </section>
</template>

<script>
import { nextTick } from 'q';
import { setInterval, setTimeout } from 'timers';
import qs from 'qs';
export default {
    data() {
        return {
            unameValue:'',
            upwdValue:'',
            context:'',
            btnText:"登录"
        }
    },
    methods:{
        tologup(){
            this.$router.replace('/log/up')
        },
        login(){
            let {unameValue:uname,upwdValue:upwd} = this;
            if(uname.length==0||upwd.length==0){
                this.context="用户名或密码不能为空";
                let timer = setTimeout(()=>{
                    this.context='';
                    clearTimeout(timer);
                },500);
            }else{
                this.btnText="登录中";
                this.$axios.post('/user/login',qs.stringify({
                    uname,upwd
                })).then(res=>{
                    let {code} =res.data;
                    if(code==1){
                        let {uid} = res.data.data;
                        this.$store.commit("login",uid);
                        this.context="登录成功"
                        let timer=setTimeout(()=>{
                            this.context="";
                            clearTimeout(timer);
                            this.$router.push("/myInfo");
                        },500)
                    }else{
                        this.context="用户名或密码错误";
                        let timer=setTimeout(()=>{
                            this.context="";
                            clearTimeout(timer);
                        },500)
                    }
                    this.btnText="登录";
                }).catch(err=>{
                        this.context="登录错误,请稍后尝试";
                        let timer=setTimeout(()=>{
                            this.context="";
                            clearTimeout(timer);
                        },500)
                    this.btnText="登录";
                });
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
    }
</style>