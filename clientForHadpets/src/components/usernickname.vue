<template>
    <div class="uname-container" @touchend='goInfoInput'>
        <span>昵称</span>
        <span>
            <span>{{uname}}</span>
            <span>&gt;</span>
        </span>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        uname(){
            return this.$store.state.userinfo.nickname?this.$store.state.userinfo.nickname:'';
        }
    },
    methods:{
        goInfoInput(){
            this.$router.push('/inputinfo/nickname')
        }
    }
}
</script>

<style lang="scss" scoped>
    .uname-container{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem;
        border-bottom:1px solid #ccc; 
        font-size: 0.8rem;
        height:2rem;
    }
</style>
