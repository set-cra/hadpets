<template>
    <section class="container" @touchend.prevent="pushTo">
        <my-popup v-if="popup" @result="close" :textcontent="'确定要退出吗'"></my-popup>
        <div class="item">
            <span class="item-child" :data-path="'/setinfo/myinfo'">个人资料</span>
        </div>
        <div class="item">
            <span class="item-child quit" @touchend="logout">退出登录</span>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            popup:false
        }
    },
    methods:{
        logout(){
            this.popup=true;
        },
        pushTo(e){
            let {target} = e;
            let path=target.getAttribute("data-path");
            let title = target.getAttribute("data-title");
           if(path!=undefined){
               this.$router.push(path);
           }
        },
        close(res){
            if(res==1){
                this.$axios.post('/user/logout').then(res=>{
                    this.$store.commit("logout");
                    this.$router.push('/index');
                }).catch(err=>{
                    console.log(err);
                })
            }
                this.popup=false;
        }
    },
    mounted(){
        this.$emit("title","设置")
    },
    components:{
        "my-popup":()=>import('../components/popup')
    },
}
</script>
<style lang="scss" scoped>
    .container{
        margin-top: 2rem;
        background:#eee;
        .item{
            width: 100%;
            padding-bottom: 1rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: stretch;
            .item-child{
                padding: 0.3rem;
                width: 100%;
                background: #fff;
                margin-bottom: 1px;
                line-height: 1rem;
                font-size: 0.8rem;
                box-sizing: border-box;
            }
            &:not(:last-child) .item-child{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
            }
            &:not(:last-child) .item-child:after{
                content: ">";
                color: #ddd;
            }
            .quit{
                text-align: center;
            }
        }
    }
</style>
