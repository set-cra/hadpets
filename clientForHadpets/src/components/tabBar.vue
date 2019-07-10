<template>
    <footer class="contianer" @touchend="LinkTo" v-if="selectedIndex in tabBar">
        <div v-for="(elem,i) of tabBar" :key="i" class="item" :data-url="elem.url">
            <img :src="i==selectedIndex?elem.selectedImg:elem.img" class="img">
            <span class="font" :style="i==selectedIndex?'color:red':'color:black'">{{elem.font}}</span>
        </div>
    </footer>
</template>

<script>
import { deflate } from 'zlib';
export default {
    data() {
        return {
            tabBar:[
                {
                    font:"首页",
                    img:require("../assets/home.png"),
                    selectedImg:require("../assets/homeSelected.png"),
                    url:"/"
                },
                {
                    font:"我的",
                    img:require("../assets/myIcon.png"),
                    selectedImg:require("../assets/myIconSelected.png"),
                    url:"/myInfo"
                }
            ]
        }
    },
    methods:{
        LinkTo(e){
            let url = e.target.getAttribute("data-url")||e.target.parentNode.getAttribute("data-url");
            if(url){
                this.$router.push(url);
            }
        }
    },
    computed:{
        selectedIndex(){
            switch(this.$route.fullPath){
                case '/' : return 0;break;
                case '/myInfo' : return 1;break;
                default:return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .contianer{
        width: 100%;
        height: 2rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        border-top: 2px solid #ccc;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        padding-bottom: 0.1rem;
        z-index: 999;
        .item{
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            .img{
                width: 1.2rem;
                height: 1.2rem;
            }
            .font{
                font-size: 0.6rem;
            }
        }
    }
</style>
