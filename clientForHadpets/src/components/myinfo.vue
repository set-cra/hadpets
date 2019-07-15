<template>
    <section class="myinfo-detail-container">
        <div class="item">
            <my-user-img></my-user-img>
            <div class="label">
                <span>昵称</span>
                <span>{{userinfo.nick?userinfo.nickname:'未设置'}}</span>
            </div>
            <div class="label">
                <span>用户编号</span>
                <span>{{uid}}</span>
            </div>
            <div class="label">
                <span>性别</span>
                <span>{{userinfo.gender?userinfo.gender:'保密'}}</span>
            </div>
            <div class="label">
                <span>年龄</span>
                <span>{{userinfo.age?userinfo.age:'保密'}}</span>
            </div>
            <div class="label">
                <span>养宠时间</span>
                <span>{{userinfo.start?userinfo.start:'保密'}}</span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            uimageSRC:require('../assets/notlogin.png')
        }
    },
    computed:{
        userinfo(){
            return this.$store.state.userinfo;
        },
        uid(){
            return this.$store.state.userid;
        }
    },
    mounted(){
        this.$emit("title","个人资料");
    },
    components:{
        "my-user-img":()=>import('./userImg')
    }
}
</script>

<style lang="scss" scoped>
    .myinfo-detail-container{
        margin-top: 2rem;
        background: #ccc;
        .item{
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            .label{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                padding: 0.4rem;
                border-bottom:1px solid #ccc; 
                font-size: 0.8rem;
            }
            .uimg{
                border-radius: 50%;
                width: 2rem;
                height: 2rem;
            }
        }
    }
</style>

