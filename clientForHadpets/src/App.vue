<template>
  <div id="app">
    <myHeader :title="[{title:'精选',id:0},{title:'动态',id:1},{title:'频道',id:2}]"></myHeader>
    <router-view/>
    <tabBar></tabBar>
  </div>
</template>

<style lang="scss">
 #app{
   min-height: 100vh;
 }
</style>

<script>
export default {
  created(){
    //向后台服务请求用户信息,检测是否登录
    this.$axios.post('/user/islogin').then(res=>{
      this.$store.commit('login',res.data.uid);
    }).catch(err=>this.$store.commit('login',undefined));
  }
}
</script>
