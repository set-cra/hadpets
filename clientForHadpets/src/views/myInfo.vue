<template>
    <div id="header" class="container" @touchstart="addY" @touchmove="pull" @touchend="addfc">
        <header class="header" :style="'height:'+bkHeight+'rem;'">
            <img class="bk" :src="bk" alt="背景">
            <img class="tx" :src="tx" alt="头像">
            <span class="user-name">{{text}}</span>
        </header>
        <nav class="nav">
            <div class="item">
                <span>{{laud}}</span>
                <span>赞</span>
            </div>
            <div class="item">
                <span>{{attention}}</span>
                <span>关注</span>
            </div>
            <div class="item">
                <span>{{attentioned}}</span>
                <span>粉丝</span>
            </div>
        </nav>
        <section>
            <div class="addpet">
                <span class="font">宠物</span>
                <div class="info">
                    <div class="info-item">

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bk:require("../assets/userBK.jpg"),
            tx:require("../assets/notlogin.png"),
            text:"测试号",
            oldY:0,
            newY:0,
            canPull:true,
            bkHeight:6
        }
    },
    methods:{
        pull(e){
            this.newY=e.changedTouches[0].screenY;
            if(this.newY<this.oldY){
                this.canPull=false;
            }
            if(!this.canPull){
                return
            }
            this.bkHeight=this.comBKHeight
        },
        addfc(){
            this.canPull=true;
            this.bkHeight=6;
        },
        addY(e){
            this.oldY=e.changedTouches[0].screenY;
        }
    },
    computed:{
        userid(){
            return this.$store.state.userid
        },
        comBKHeight(){
            let subtract=this.newY - this.oldY;
            return 6+subtract/parseFloat(document.documentElement.style.fontSize)/4;
        },
        laud(){
            return 0;
        },
        attention(){
            return 0;
        },
        attentioned(){
            return 0;
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            if(vm.userid==null){
                vm.$router.replace('/log/in')
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .container{
        margin-top: 2rem;
        margin-bottom: 2rem;
        background: #ddd;
        .header{
            min-height: 6rem;
            position: relative;
            .bk{
                width: 100%;
                height: 100%;
            }
            .tx{
                width: 2rem;
                height: 2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -1rem;
                margin-top: -1rem;
                background: #fff;
                border-radius: 50%;
            }
            .user-name{
                display: block;
                width: 100%;
                font-size: 0.6rem;
                position: absolute;
                bottom: 0.4rem;
                top: 50%;
                margin-top:1.3rem;
                text-align: center;
            }
        }
        .nav{
            width: 90%;
            height: 2.2rem;
            display: flex;
            flex-flow: row nowrap;
            background:#fff;
            margin: 0 auto;
            position: relative;
            top: -1rem;
            border-radius: 0.3rem;
            justify-content: space-around;
            align-items: center;
            .item{
                width: 25%;
                text-align: center;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-between;
                align-items: center;
                font-size: 0.8rem;
            }
        }
        .addpet{
            background: #fff;
            padding: 2%;
            overflow: hidden;
            .font{
                font-size: 0.8rem;
                color: #555;
            }
            .info{
                margin-top: 0.4rem;
                height: 4rem;
                display: flex;
                flex-flow: row nowrap;
                .info-item{
                    width: 45%;
                    margin-right: 5%;
                    border: #aaa solid 1px;
                }
            }
        }
    }
</style>
