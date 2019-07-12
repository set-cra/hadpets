<template>
    <div class="container" v-if="headerType=='/'">
        <ul class="ul-item">
            <li class="item" v-for="(elem,i) of title" :key="i"  @touchend="changeIndex(i)">{{elem.title}}</li>
        </ul>
        <img v-if="iscamera" :src="require('../assets/camera.png')" class="camera" @touchend="chooseImg">
        <div class="bottom-line" :style="`transition:0.2s;left:${20*(index+1)}%;`"></div>
    </div>
    <div v-else-if="headerType=='/myInfo'" class="container">
        <span class="font">个人中心</span>
        <span class="setting" @touchend="toInfo"></span>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props:{
        title:{
            type:Array,
            default:[]
        }
    },
    computed:{
        index(){
            return this.$store.state.pageindex
        },
        iscamera(){
            if(this.index>=0&&this.index<=1){
                return true;
            }else{
                return false;
            }
        },
        headerType(){
            return this.$route.fullPath
        }
    },
    methods:{
        changeIndex(i){
            this.$store.commit("setpageindex",i)
        },
        chooseImg(){
            let phone=navigator.userAgent.toString();
            //判断机身是苹果还是安卓系统
            if(phone.indexOf("iPhone")!=-1||phone.indexOf("iPad")!=-1){
                console.log('iphone')
            }
        },
        toInfo(){
            this.$router.push('/setinfo/infomenu');
        }
    }
}
</script>

<style lang="scss" scoped>
    $header-background:#f20000;
    $word-color:#fff;
    .container{
        width: 100%;
        height: 2rem;
        background-color:$header-background;
        position: fixed;
        top: 0;
        color: #fff;
        font-size: 0.8rem;
        z-index: 999;
        .ul-item{
            width: 60%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            .item{
                width: 100%;
                color: $word-color;
                text-align: center;
            }
        }
        .bottom-line{
            width: 20%;
            border-bottom: 0.1rem solid #fff;
            position: absolute;
            bottom: 0;
            left: 20%;
        }
        .camera{
            width: 1rem;
            position: absolute;
            top: 50%;
            right: 5%;
            margin-top:-0.5rem;
        }
        .upImg{
            width: 100%;
            position:fixed;
            bottom: 0;
            background:#ccc;
            height: 2rem;
        }
        .font{
            display: block;
            width: 100%;
            text-align: center;
            line-height: 2rem;
        }
        .setting{
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            background: url('../assets/setting.png') no-repeat;
            background-size: 100%;
            position: absolute;
            top: 50%;
            margin-top: -0.75rem;
            right: 0;
        }
    }
</style>
