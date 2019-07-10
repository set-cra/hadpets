<template>
  <div id="app">
    <myHeader :title="[{title:'精选',id:0},{title:'动态',id:1},{title:'频道',id:2}]"></myHeader>
    <router-view/>
    <tabBar></tabBar>
  </div>
</template>

<style lang="scss">

</style>
