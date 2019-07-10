<template>
    <header class="container">
        <span class="back" @touchend="back">&lt;</span>
        <span class="title">{{title}}</span>
    </header>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:["title"],
    methods:{
        back(){
            if(this.userid===undefined){
                this.$router.push('/')
            }else{
                this.$router.go(-1);
            }
        }
    },
    computed:{
        userid(){
            return this.$store.state.userid
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
        font-size: 1.2rem;
        z-index: 999;
        text-align: center;
        line-height: 2rem;
        .back{
            position: absolute;
            left: 0.4rem;
        }
        .title{
            font-size: 0.8rem;
        }
    }
</style>
