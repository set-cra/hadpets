<template>
    <div>
        <my-child-header :needback="false" :title="'基本个人信息'"></my-child-header>
        <section class="container">
            <my-user-img></my-user-img>
            <my-user-name></my-user-name>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    components:{
        'my-child-header':()=>import('../components/childHeader'),
        "my-user-img":()=>import('../components/userImg'),
        "my-user-name":()=>import('../components/usernickname'),
    },
    beforeCreate(){
        if(this.$store.state.userid==undefined){
            this.$router.replace('/log/in')
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        margin-top:2rem;
    }
</style>
